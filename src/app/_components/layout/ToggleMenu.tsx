"use client";
import { useGUIState } from "@/app/_context/GUIStateProvider";
import { usePathname } from "next/navigation";
import { HiMenu } from "react-icons/hi";

function ToggleMenu() {
  const { toggleSearchPanel, searchPanelHidden } = useGUIState();
  const path = usePathname();
  if (path !== "/") return null;
  return (
    <button onClick={toggleSearchPanel}>
      <HiMenu
        className={`h-6 w-6 transition-all ${searchPanelHidden || "rotate-90"} `}
      />
    </button>
  );
}

export default ToggleMenu;
