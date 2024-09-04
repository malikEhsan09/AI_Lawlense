"use client";
import Image from "next/image";
import logo from "../../../public/logo.png"; // Replace with your logo
import wavy from "../../../public/wavy.svg"; // Import your wavy SVG
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative bg-[#121212] text-white py-4">
      <div className="container mx-auto flex justify-between items-center relative z-10">
        <div className="flex items-center">
          <Image
            src={logo}
            alt="Logo"
            width={50}
            height={50}
            className="filter invert bg-[#121212] rounded-full -ml-20"
          />
          <span className="font-bold text-2xl text-[#ffff] ml-[1rem]">LawLense AI</span>
        </div>

        {/* Large screens */}
        <ul className="hidden md:flex space-x-8">
          <li className="hover:text-[#16945bd2] text-xl">
            <a href="#">Home</a>
          </li>
          <li className="hover:text-[#16945bd2] text-xl">
            <a href="#">About</a>
          </li>
          <li className="hover:text-[#16945bd2] text-xl">
            <a href="#">Contact us</a>
          </li>
        </ul>

        {/* Small screens */}
        <div className="md:hidden">
          <button
            className="focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Sign in and Sign up buttons */}
        <div className="hidden md:flex space-x-4">
          <Link href={"/login"} className="mt-2">
            <button className="text-white">Sign in</button>
          </Link>
          <Link href={"/signup"}>
            <button className="bg-[#0a7947d2] text-white py-2 px-4 rounded hover:bg-[#267451aa]">
              Sign up
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#121212] py-4">
          <ul className="flex flex-col space-y-4 text-center">
            <li className="hover:text-[#16945bd2] text-xl">
              <a href="#">Home</a>
            </li>
            <li className="hover:text-[#16945bd2] text-xl">
              <a href="#">About</a>
            </li>
            <li className="hover:text-[#16945bd2] text-xl">
              <a href="#">Contact us</a>
            </li>
            <li className="mt-4">
              <Link href={"/login"}>
                <button className="text-white">Sign in</button>
              </Link>
            </li>
            <li>
              <Link href={"/signup"}>
                <button className="bg-[#0a7947d2] text-white py-2 px-4 rounded hover:bg-[#267451aa]">
                  Sign up
                </button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;