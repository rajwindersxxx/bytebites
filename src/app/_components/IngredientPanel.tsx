"use client";
import { useGUIState } from "../context/GUIStateProvider";
import { IngredientListTags } from "../types/RecipeTypes";
import IngredientFilter from "./ui/IngredientFilter";
import Input from "./ui/Input";
interface props {
  ingredientList: IngredientListTags[];
}
function IngredientPanel({ingredientList}: props) {
  const { searchPanelHidden } = useGUIState();
  return (
    <div className="h-[calc(100vh-3rem)] overflow-y-scroll">
      {searchPanelHidden || (
        <div className={`w-96 border-l-2 border-accent p-4 transition-all`}>
          <Input placeHolder="add Ingredient" className="p-2 w-full" />
          <IngredientFilter ingredientList={ingredientList}/>
        </div>
      )}
    </div>
  );
}

export default IngredientPanel;
