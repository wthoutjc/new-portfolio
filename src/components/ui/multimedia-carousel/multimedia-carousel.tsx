"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

// Interfaces
import { MultimediaFile } from "@/lib/interfaces/multimedia";

// Icons
import { FileIcon, Download, Play } from "lucide-react";

interface Props {
  files: MultimediaFile[] | null;
}

const MultimediaCarousel = ({ files }: Props) => {
  const [signedUrls, setSignedUrls] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchSignedUrls = async () => {
      if (!files) return;

      const urlPromises = files.map(async (file) => {
        // Si es una URL temporal (blob o objecturl), no necesitamos firma
        if (file.url.startsWith("blob:") || file.url.includes("objecturl")) {
          return { key: file.key, url: file.url };
        }

        try {
          const response = await fetch(`/api/s3/signed-url?key=${file.key}`);
          const data = await response.json();
          return { key: file.key, url: data.url };
        } catch (error) {
          console.error("Error fetching signed URL:", error);
          return { key: file.key, url: file.url };
        }
      });

      const urls = await Promise.all(urlPromises);
      const urlMap = urls.reduce((acc, { key, url }) => {
        acc[key] = url;
        return acc;
      }, {} as { [key: string]: string });

      setSignedUrls(urlMap);
    };

    fetchSignedUrls();
  }, [files]);

  const getFileUrl = (file: MultimediaFile) => {
    // Si es una URL temporal, la usamos directamente
    if (file.url.startsWith("blob:") || file.url.includes("objecturl")) {
      return file.url;
    }
    // Si no, usamos la URL firmada de S3
    return signedUrls[file.key] || file.url;
  };

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return "PDF";
    if (type.includes("doc")) return "DOC";
    if (type.includes("xls")) return "XLS";
    return type.toUpperCase();
  };

  const isImage = (type: string) =>
    type.includes("image") || ["jpg", "jpeg", "png", "gif"].includes(type);

  const isVideo = (type: string) =>
    type.includes("video") || ["mp4", "mov"].includes(type);

  return (
    <Carousel className="w-full max-w-lg mx-auto">
      <CarouselContent>
        {files?.map((file, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <div className="flex aspect-square items-center justify-center p-6 relative">
                {isImage(file.type) ? (
                  <Image
                    src={getFileUrl(file)}
                    alt={file.name}
                    fill
                    className="object-contain rounded-lg"
                  />
                ) : isVideo(file.type) ? (
                  <div className="relative w-full h-full">
                    <video
                      src={getFileUrl(file)}
                      controls
                      className="w-full h-full object-contain rounded-lg"
                      poster={`${getFileUrl(file)}#t=0.1`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-16 h-16 text-white opacity-75" />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 bg-secondary rounded-lg flex items-center justify-center">
                      <FileIcon className="w-12 h-12" />
                      <span className="text-xs font-bold">
                        {getFileIcon(file.type)}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(getFileUrl(file), "_blank")}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                )}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-2">
                {file.name}
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export { MultimediaCarousel };
