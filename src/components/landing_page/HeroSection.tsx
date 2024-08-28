"use client"

import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="bg-[#121212] text-white py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4  bg-clip-text bg-gradient-to-b from-foreground to-foreground-light">Welcome to 
            <span className="text-5xl text-transparent bg-clip-text bg-gradient-to-br from-[#3ECF8E] via-[#3ECF8E] to-[#3ecfb2]  md:ml-0 font-bold"> LawLense AI</span>
        </h1>
        <p className="text-lg mb-8 block  bg-clip-text bg-gradient-to-b from-foreground to-foreground-light">
         Experience a new era of legal support where AI meets human expertise, simplifying your journey to justice.
        </p>
        <div className="space-x-4">
      <Link href={'/login'}>
        <button className="font-regular ease-out duration-200 py-2 px-6 rounded transition-all  border bg-[#0a7947d2] 
          hover:bg-[#087f4abf]  text-md h-[38px] text-white">
  Get Started
</button>
      </Link>

          <button className="bg-gray-700 text-white py-2 px-6 rounded hover:bg-gray-800">
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
