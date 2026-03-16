"use client";

import { useState } from "react";
import { Models } from "node-appwrite";
import Card from "@/components/Card";
import { FilePreview } from "@/components/FilePreview";

interface Props {
  files: Models.Document[];
}

export default function FilePreviewWrapper({ files }: Props) {
  const [selectedFile, setSelectedFile] = useState<Models.Document | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState(false);

  const openPreview = (file: Models.Document) => {
    setSelectedFile(file);
    setIsOpen(true);
  };

  const closePreview = () => {
    setIsOpen(false);
    setSelectedFile(null);
  };

  return (
    <>
      <section className="file-list">
        {files.map((file) => (
          <Card key={file.$id} file={file} onClick={() => openPreview(file)} />
        ))}
      </section>

      <FilePreview file={selectedFile} isOpen={isOpen} onClose={closePreview} />
    </>
  );
}
