// "use client"
// import React, { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Main from "../components/Main";
// import Sidebar from "@/components/Sidebar";
// import { useAuth } from "./context/AuthContext";


// const HomePage = () => {

//  const { user } = useAuth();
//   const router = useRouter();

//  useEffect(() => {
//     if (!user) {
//       router.push("/login");
//     }
//   }, [user, router]);

//   if (!user) return null; 


//   if (!user) return null; 
//   return (
//     <div className="flex h-screen w-screen">
//       {/* sidebar_component
//      main_HomePage_component */}
//       <div className="side-bar flex-none w-1/10 fixed">
//         <Sidebar />
//       </div>
//       <div className="main flex-grow w-9/10">
//         <Main />
//       </div>
//     </div>
//   );
// };

// export default HomePage;






"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/landing_page/Navbar";
import VideoSection from "../components/landing_page/VideoSection";
import FeaturesSection from "../components/landing_page/FeaturesSection";
import TeamSection from "../components/landing_page/TeamSection";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";
import { useAuth } from "./context/AuthContext";
import HeroSection from "@/components/landing_page/HeroSection";
import Footer from "@/components/landing_page/Footer";

const HomePage = () => {
  // const { user } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (!user) {
  //     // router.push("/login");
  //   }
  // }, [user, router]);

  // if (!user) return null;

  return (
   <div className="bg-[#121212] min-h-screen">
      <Navbar />
      <HeroSection />
      <VideoSection />
      <FeaturesSection />
      <TeamSection/>
      <Footer/>
    </div>
  );
};

export default HomePage;
