import React from "react";
import Main from "../components/Main";
import Sidebar from "@/components/Sidebar";

const page = () => {
  return (
    <div className="flex h-screen w-screen">
      {/* sidebar_component
     main_page_component */}
      <div className="side-bar flex-none w-1/10">
        <Sidebar />
      </div>
      <div className="main flex-grow w-9/10">
        <Main />
      </div>
    </div>
  );
};

export default page;
