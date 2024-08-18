// pages/page.tsx (HomePage
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { FileHandling } from "@/components/FileUpload";
import FloatingDockDemo from "@/components/FloatingDock";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const AdminPage = () => {
  const router = useRouter();
  const [documents, setDocuments] = useState<string[]>([]);
  const [successDialogVisible, setSuccessDialogVisible] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    // Redirect to login if the user is not authenticated
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  // Handle file upload logic
  const handleFileUpload = async (selectedFiles: File[]) => {
    try {
      setLoading(true); // Start loading
      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append("file", file));

      const response = await axios.post(`${apiUrl}/upload/`, formData);
      const uploadedFile = response.data.filename;

      setUploadedFileName(uploadedFile); // Set the uploaded file name
      setSuccessDialogVisible(true); // Show the modal on success
      setDocuments((prevDocs) => [...prevDocs, uploadedFile]);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "There was an error processing the file. Please try again.",
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="h-[50rem] w-full dark:bg-gray-900 bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      <div className="w-full flex flex-col items-center mt-4">
        <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg from-neutral-200 to-neutral-500">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            </div>
          ) : (
            <FileHandling onUpload={handleFileUpload} />
          )}
        </div>

        {/* Modal should be visible if successDialogVisible is true */}
        {successDialogVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md text-center">
              <svg
                className="h-16 w-16 text-green-500 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-black text-xl font-semibold mt-4">
                File '{uploadedFileName}' has been uploaded successfully!
              </p>
              <button
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
                onClick={() => setSuccessDialogVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div className="mt-7">
          <FloatingDockDemo />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
