"use client";
import React from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import ehsan from "../../../public/team/ehsan1.jpg"
import haris from "../../../public/team/Haris.jpg"
import Bakar from "../../../public/team/abuBakar.jpg"
import khaula from "../../../public/team/Khaula.jpg"

const people = [
  {
    id: 1,
    name: "Ehsan Ahmed",
    designation: "Full Stack Developer",
    image:ehsan,
  },
  {
    id: 2,
    name: "Abu Bakar",
    designation: "AI Engineer",
    image:Bakar,
  },
  {
    id: 3,
    name: "Haris Ayyaz",
    designation: "Full Stack Developer",
    image:haris,
  },
  {
    id: 4,
    name: "Khaula Nauman",
    designation: "Frontend Developer",
    image:khaula,
  },
];

export function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mt-6 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
