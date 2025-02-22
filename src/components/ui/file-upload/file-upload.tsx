"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

// Components
import { Button } from "../button";
import { Progress } from "../progress";

// Actions
import { upload } from "@/lib/actions/upload.action";

// Constants
import {
  TOAST_ERROR_STYLE,
  TOAST_SUCCESS_STYLE,
} from "@/lib/constants/toast-defaults";

import { UploadFileResponseDto } from "@/modules/s3/dto/upload-file.dto";

interface FileWithPreview extends File {
  preview?: string;
}

interface Props {
  onUploadComplete?: (urls: string[]) => void;
  maxFiles?: number;
  accept?: Record<string, string[]>;
}

const FileUpload = ({
  onUploadComplete,
  maxFiles = 5,
  accept = {
    "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    "application/pdf": [".pdf"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
    "application/vnd.ms-excel": [".xls"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
      ".xlsx",
    ],
    "video/mp4": [".mp4"],
    "video/quicktime": [".mov"],
  },
}: Props) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (files.length + acceptedFiles.length > maxFiles) {
        toast.error(
          `No puedes subir más de ${maxFiles} archivos`,
          TOAST_ERROR_STYLE
        );
        return;
      }

      setFiles((prev) => [
        ...prev,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: file.type.startsWith("image/")
              ? URL.createObjectURL(file)
              : undefined,
          })
        ),
      ]);
    },
    [files.length, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
  });

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);

        const response = await upload<UploadFileResponseDto>(
          undefined,
          formData
        );

        if (!response) {
          throw new Error("Error al subir el archivo: respuesta vacía");
        }

        if (response.errors) {
          throw new Error(response.errors.file?.[0]);
        }

        if (response.data?.url) {
          uploadedUrls.push(response.data.url);
        }

        setProgress(((i + 1) / files.length) * 100);
      }

      toast.success("Archivos subidos correctamente", TOAST_SUCCESS_STYLE);
      onUploadComplete?.(uploadedUrls);
      setFiles([]);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error al subir los archivos",
        TOAST_ERROR_STYLE
      );
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-primary bg-primary/10"
            : "border-gray-300 hover:border-primary"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        {isDragActive ? (
          <p className="mt-2 text-sm text-gray-600">Suelta los archivos aquí</p>
        ) : (
          <p className="mt-2 text-sm text-gray-600">
            Arrastra y suelta archivos aquí, o haz clic para seleccionar
            archivos
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Máximo {maxFiles} archivos. Tipos permitidos: imágenes, PDF, Word,
          Excel y videos
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.name}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  {file.preview ? (
                    <Image
                      src={file.preview}
                      alt={file.name}
                      className="h-10 w-10 object-cover rounded"
                    />
                  ) : (
                    <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs">
                        {file.name.split(".").pop()?.toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(file.name)}
                  disabled={uploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {uploading && <Progress value={progress} className="h-2" />}

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleUpload}
              disabled={uploading}
              className="w-full sm:w-auto"
            >
              {uploading ? "Subiendo..." : "Subir archivos"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export { FileUpload };
