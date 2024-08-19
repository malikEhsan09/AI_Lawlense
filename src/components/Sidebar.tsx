/* this is the sidebar of main page */
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import SidebarButton from "./SidebarButton";
import { Separator } from "@/components/ui/separator";
import { ExitIcon } from "@radix-ui/react-icons";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import ThemeToggle from "./ThemeToggle";

const Sidebar = () => {
  const handleclickUpdate = () => {
    alert("im clicked");
  };
  const handleclickLogout = () => {
    alert("im clicked");
  };
  const handleclickNew = () => {
    alert("im clicked");
  };
  return (
    <div className="sidebar main flex items-center justify-between h-screen flex-col bg-custom-dark-gray">
      <div className="new-chat-button m-4 w-full">
        <Button
          onClick={handleclickNew}
          variant="outline"
          className="bg-custom-dark-gray text-white w-full justify-start "
        >
          <p className="p-3">+ New Chat</p>
        </Button>
      </div>
      <div className="options flex flex-col items-start justify-end text-white mb-3 ">
        <Separator className="mb-4" />
        <ThemeToggle />
        {/* updates button */}
        <SidebarButton
          name="Updates & FAQ"
          children={<ExternalLinkIcon />}
          handleClick={() => handleclickUpdate}
        />
        {/* logout button */}
        <SidebarButton
          name="Logout"
          children={<ExitIcon />}
          handleClick={() => handleclickLogout}
        />
      </div>
    </div>
  );
};

export default Sidebar;
