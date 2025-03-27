"use client";

import { useGUIState } from "../context/GUIStateProvider";

function IngredientPanel() {
  const { searchPanelHidden } = useGUIState();
  return (
    <>
     { searchPanelHidden || <div
        className={`w-72 bg-blue-600 transition-all p-4`}
      >
        search , ai , ingredient suggestions etc
      </div>}
    </>
  );
}

export default IngredientPanel;
