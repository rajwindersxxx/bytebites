import { useState, useEffect } from "react";
import { setLocalStorage } from "../_helper/clientheper";

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setDarkMode(
        localStorage.getItem("theme") === "dark" ||
          window.matchMedia("(prefers-color-scheme: dark)").matches,
      );
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;

    if (darkMode) {
      html.classList.add("dark");
      setLocalStorage("theme", "dark");
    } else {
      html.classList.remove("dark");
      setLocalStorage("theme", "light");
    }
  }, [darkMode]);

  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  return { darkMode, toggleDarkMode };
}
