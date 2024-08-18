import React from "react";

export function DotBackgroundDemo() {
  return (
    <div className="h-[50rem] w-full dark:bg-gray-400 bg-gray-50 dark:bg-grid-gray-700/[0.2] bg-grid-gray-200/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-gray-400 bg-gray-50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        Backgrounds
      </p>
    </div>
  );
}
