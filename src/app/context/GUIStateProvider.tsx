"use client";
import { createContext, useContext, useState } from "react";
interface GUIStateContextType {
  searchPanelHidden: boolean;
  recipeShortDetailHidden: boolean;
  toggleSearchPanel: () => void;
  toggleRecipeShortDetails: () => void;
}

const GUIStateContext = createContext<GUIStateContextType | undefined>(
  undefined,
);

export const GUIStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchPanelHidden, setSearchPanelHidden] = useState(true);
  // todo : use to handle detail , still working on
  const [recipeShortDetailHidden, setRecipeDetailHidden] = useState(true);
  function toggleSearchPanel() {
    setSearchPanelHidden((prev) => !prev);
  }
  function toggleRecipeShortDetails() {
    setRecipeDetailHidden((prev) => !prev);
  }
  return (
    <GUIStateContext.Provider
      value={{
        searchPanelHidden,
        toggleSearchPanel,
        recipeShortDetailHidden,
        toggleRecipeShortDetails,
      }}
    >
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
