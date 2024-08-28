"use client";
import Image from "next/image";
import logo from "../../../public/logo.png"; // Replace with your logo
import wavy from "../../../public/wavy.svg"; // Import your wavy SVG
import Link from "next/link";

const Navbar = () => {
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
          <span className=" font-bold text-2xl text-[#ffff]
          ">LawLense AI</span>
        
        </div>
        <ul className="flex space-x-8">
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
        <div className="flex space-x-4">
            <Link href={'/login'} className="mt-2">
             <button className="text-white">Sign in</button>
            </Link>
         
        <Link href={'/signup'}>
          <button className="bg-[#0a7947d2] text-white  py-2 px-4 rounded hover:bg-[#267451aa]">
            Sign up
          </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
