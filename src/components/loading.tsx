import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen"> {/* Background color for better visibility */}
      <div className="animate-spin rounded-full h-32 w-32 border-t-8 border-blue-600 border-solid "></div>
    </div>
  );
}
