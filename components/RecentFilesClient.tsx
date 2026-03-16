"use client";

import { useState } from "react";
import { Models } from "node-appwrite";
import { Thumbnail } from "@/components/Thumbnail";
import { FormattedDateTime } from "@/components/FormattedDateTime";
import ActionDropdown from "@/components/ActionDropdown";
import { FilePreview } from "@/components/FilePreview";

export const RecentFilesClient = ({ files }: { files: Models.Document[] }) => {
  const [selectedFile, setSelectedFile] = useState<Models.Document | null>(
    null,
  );
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleFileClick = (file: Models.Document) => {
    setSelectedFile(file);
    setIsPreviewOpen(true);
  };

  return (
    <>
      {files.length > 0 ? (
        <ul className="mt-5 flex flex-col gap-5">
          {files.map((file: Models.Document) => (
            <div
              key={file.$id}
              className="flex items-center gap-3 cursor-pointer hover:bg-light-900 dark:hover:bg-dark-200 p-3 rounded transition-colors"
              onClick={() => handleFileClick(file)}
            >
              <Thumbnail
                type={file.type}
                extension={file.extension}
                url={file.url}
              />

              <div className="recent-file-details flex-1">
                <div className="flex flex-col gap-1">
                  <p className="recent-file-name">{file.name}</p>
                  <FormattedDateTime
                    date={file.$createdAt}
                    className="caption"
                  />
                </div>
              </div>
              <ActionDropdown file={file} />
            </div>
          ))}
        </ul>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}

      <FilePreview
        file={selectedFile}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </>
  );
};
