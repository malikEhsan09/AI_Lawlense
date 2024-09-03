"use client";
import React, { useState } from "react";
import Main from "../components/Main";
import Sidebar from "@/components/Sidebar";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full ${sidebarOpen ? "block" : "hidden"} md:block side-bar flex-none w-1/10 z-20 bg-white`}>
        <Sidebar />
      </div>
      
      {/* Hamburger Icon - Visible on small screens */}
      <div className="absolute top-4 left-4 md:hidden z-30">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-foreground focus:outline-none"
        >
          {sidebarOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {/* Main content */}
      <div className={`main flex-grow w-full md:w-9/10 ${sidebarOpen ? "ml-1/10" : ""}`}>
        <Main />
      </div>
    </div>
  );
};

export default UserDashboard;
