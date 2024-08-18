"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";

export function FileHandling({ onUpload }) {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileSelection = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  const handleFileUpload = () => {
    if (files.length > 0) {
      onUpload(files);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileSelection} />
      {files.length > 0 && (
        <button
          onClick={handleFileUpload}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Upload File
        </button>
      )}
    </div>
  );
}
