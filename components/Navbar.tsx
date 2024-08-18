'use client';

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "../lib/utils";
import Link from "next/link";
import { IconSun, IconMoon, IconLogout } from "@tabler/icons-react";

function Navbar({ className }: { className?: string }) {
    const router = useRouter();


  const [active, setActive] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };


   const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Clear authentication state
    router.push('/login'); // Redirect to login page
  };

  return (
    <>
      <div className={cn("fixed top-0 inset-x-0 max-w-2xl mx-auto z-50 mt-2", className)}>
        <Menu setActive={setActive}>
          <Link href={"/"} className="relative group">
            <MenuItem setActive={setActive} active={active} item="Home" />
            <span className="absolute left-0 bottom-[-2px] w-full h-0.5 bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center dark:bg-white hover:cursor-pointer hover:font-bold"></span>
          </Link>
          <Link href={'/about'} className="relative group">
            <MenuItem setActive={setActive} active={active} item="About us" />
            <span className="absolute left-0 bottom-[-2px] w-full h-0.5 bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center dark:bg-white hover:cursor-pointer hover:font-bold"></span>
          </Link>
          <Link href={"/contact"} className="relative group">
            <MenuItem setActive={setActive} active={active} item="Contact Us" />
            <span className="absolute left-0 bottom-[-2px] w-full h-0.5 bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center dark:bg-white hover:cursor-pointer hover:font-bold"></span>
          </Link>
        </Menu>
      </div>

      <div className="fixed top-4 right-4 flex items-center space-x-4 z-50 mt-2">
        <button onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
          {darkMode ? (
            <IconSun className="w-6 h-6 text-yellow-500" />
          ) : (
            <IconMoon className="w-6 h-6 text-gray-800 dark:text-white" />
          )}
        </button>
        <button onClick={handleLogout} aria-label="Logout">
          <IconLogout className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
      </div>
    </>
  );
}

export default Navbar;
