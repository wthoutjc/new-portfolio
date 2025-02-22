"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

// Components
import { Button } from "../button";

// Constants
import { TOAST_ERROR_STYLE } from "@/lib/constants/toast-defaults";

// Interfaces
import { FileWithPreview } from "@/lib/interfaces/multimedia";

interface Props {
  onChange: (files: FileWithPreview[] | null) => void;
  maxFiles?: number;
  accept?: Record<string, string[]>;
  value?: FileWithPreview[] | null;
  disabled?: boolean;
}

const FileUpload = ({
  onChange,
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
  value = null,
  disabled = false,
}: Props) => {
  const [files, setFiles] = useState<FileWithPreview[]>(value || []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (files.length + acceptedFiles.length > maxFiles) {
        toast.error(
          `No puedes subir más de ${maxFiles} archivos`,
          TOAST_ERROR_STYLE
        );
        return;
      }

      const newFiles = acceptedFiles.map((file) => {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(7);
        const temporaryKey = `temp-${timestamp}-${randomString}-${file.name}`;
        const objectUrl = URL.createObjectURL(file);

        const fileWithPreview: FileWithPreview = {
          url: objectUrl,
          key: temporaryKey,
          name: file.name,
          type: file.type,
          size: file.size,
          preview: file.type.startsWith("image/") ? objectUrl : undefined,
        };

        return fileWithPreview;
      });

      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      onChange(updatedFiles);
    },
    [files, maxFiles, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    disabled,
  });

  const removeFile = (name: string) => {
    const updatedFiles = files.filter((file) => file.name !== name);
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  return (
    <div className="w-full space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/10" : "hover:border-primary"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12" />
        {isDragActive ? (
          <p className="mt-2 text-sm">Drop files here</p>
        ) : (
          <p className="mt-2 text-sm">
            Drag and drop files here, or click to select
          </p>
        )}
        <p className="mt-1 text-xs">
          Maximum {maxFiles} files. Allowed types: images, PDF, Word, Excel and
          videos
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.name}
              className="flex items-center justify-between p-2 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                {file.preview ? (
                  <Image
                    src={file.preview}
                    alt={file.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 object-cover rounded"
                  />
                ) : (
                  <div className="h-10 w-10 rounded flex items-center justify-center">
                    <span className="text-xs">
                      {file.name.split(".").pop()?.toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeFile(file.name)}
                disabled={disabled}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { FileUpload };
