"use client";
import { createContext, useContext, useState } from "react";
interface GUIStateContextType {
  searchPanelHidden: boolean;
  toggleSearchPanel: () => void;
}

const GUIStateContext = createContext<GUIStateContextType | undefined>(
  undefined,
);

export const GUIStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchPanelHidden, setSearchPanelHidden] = useState(true);

  const toggleSearchPanel = () => {
    setSearchPanelHidden((prev) => !prev);
  };

  return (
    <GUIStateContext.Provider value={{ searchPanelHidden, toggleSearchPanel }}>
      {children}
    </GUIStateContext.Provider>
  );
};

export const useGUIState = () => {
  const context = useContext(GUIStateContext);
  if (!context) {
    throw new Error("useGUIState must be used within a GUIStateProvider");
  }
  return context;
};
