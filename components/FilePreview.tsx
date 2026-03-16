"use client";

import { Models } from "node-appwrite";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { convertFileSize } from "@/lib/utils";
import { FormattedDateTime } from "@/components/FormattedDateTime";

interface FilePreviewProps {
  file: Models.Document | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FilePreview = ({ file, isOpen, onClose }: FilePreviewProps) => {
  if (!file) return null;

  const isImage = file.type === "image";
  const isVideo = file.type === "video";
  const isAudio = file.type === "audio";
  const isDocument = file.type === "document";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="file-preview-dialog max-w-2xl">
        <DialogHeader>
          <DialogTitle className="truncate">{file.name}</DialogTitle>
        </DialogHeader>

        <div className="file-preview-content space-y-6">
          {isImage && (
            <div className="relative w-full h-[400px] flex items-center justify-center">
              <Image
                src={file.url}
                alt={file.name}
                fill
                className="object-contain"
              />
            </div>
          )}

          {isVideo && (
            <video src={file.url} controls className="w-full max-h-[400px]" />
          )}

          {isAudio && <audio src={file.url} controls className="w-full" />}

          {isDocument && (
            <iframe
              src={file.url}
              title={file.name}
              className="w-full h-[400px]"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
