"use client";
import { useGUIState } from "@/app/context/GUIStateProvider";
import { HiMenu } from "react-icons/hi";

function ToggleMenu() {
  const { toggleSearchPanel, searchPanelHidden } = useGUIState();
  return (
    <button onClick={toggleSearchPanel}>
      <HiMenu
        className={`h-6 w-6 transition-all ${searchPanelHidden || "rotate-90"} `}
      />
    </button>
  );
}

export default ToggleMenu;
