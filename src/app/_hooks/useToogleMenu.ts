import { useState, useEffect, useRef } from "react";

export const useToggleMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
        setIsMenuOpen((prev) => !prev);
      } else if (menuRef.current && !menuRef.current.contains(event.target as Node) && !buttonRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return { isMenuOpen, menuRef, buttonRef };
};
