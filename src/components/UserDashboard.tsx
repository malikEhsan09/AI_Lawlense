"use client"
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Main from "../components/Main";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "../app/context/AuthContext";


const UserDashboard = () => {

 const { user } = useAuth();
  const router = useRouter();

 useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) return null; // Render nothing until redirect happens


  if (!user) return null; // Render nothing until redirect happens
  return (
    <div className="flex h-screen w-screen">
      {/* sidebar_component
     main_UserDashboard_component */}
      <div className="side-bar flex-none w-1/10 fixed">
        <Sidebar />
      </div>
      <div className="main flex-grow w-9/10">
        <Main />
      </div>
    </div>
  );
};

export default UserDashboard;
