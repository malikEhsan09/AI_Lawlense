import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Copyright Section */}
        <div className="text-sm text-center md:text-left">
          © Lawlense AI.com. All rights reserved.
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          {/* Facebook Icon */}
          <a href="https://www.facebook.com/profile.php?id=61564138724685" target='_blank' className="relative group text-[#1e9e64d2] hover:text-[#2eb87ad2]">
            <FaFacebook className="w-6 h-6" />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 rounded text-sm text-white bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Facebook
            </span>
          </a>

          {/* Instagram Icon */}
          <a href="https://www.instagram.com/dev_hawks?igsh=MWp3dzRucm1ieTdxbQ==" target='_blank' className="relative group text-[#1e9e64d2] hover:text-[#2eb87ad2]">
            <FaInstagram className="w-6 h-6" />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 rounded text-sm text-white bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Instagram
            </span>
          </a>

          {/* LinkedIn Icon */}
          <a href="https://www.linkedin.com/company/devhawks/" target='_blank' className="relative group text-[#1e9e64d2] hover:text-[#2eb87ad2]">
            <FaLinkedin className="w-6 h-6" />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 rounded text-sm text-white bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              LinkedIn
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
