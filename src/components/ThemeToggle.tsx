// "use client"

import { useEffect, useState } from "react";
import SidebarButton from "./SidebarButton";
import { ToggleLeft, ToggleRight } from "lucide-react";
const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  useEffect(() => {
    //update the theme-class (the one which was added in global.css)
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    /* if(theme===light)
        theme=dark;
    else
        theme=light */
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <SidebarButton
      name={(theme === "light" ? "Dark" : "Light") + " Mode"}
      children={<ToggleLeft />}
      handleClick={toggleTheme}
    />
  );
};

export default ThemeToggle;
