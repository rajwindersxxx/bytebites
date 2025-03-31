"use client";
import { useGUIState } from "../../context/GUIStateProvider";
import { IngredientListTags } from "../../types/RecipeTypes";
import IngredientFilter from "../ui/IngredientFilter";
import Input from "../ui/Input";
interface props {
  ingredientList: IngredientListTags[];
}
function IngredientPanel({ ingredientList }: props) {
  const { searchPanelHidden } = useGUIState();
  return (
    <div className="h-[calc(100vh-3rem)] overflow-y-scroll">
      {searchPanelHidden || (
        <div className={`w-96 border-l-2 border-accent p-4 transition-all`}>
          <h2 className="pb-4 text-center text-2xl">Search by Ingredients </h2>
          <Input placeHolder="add Ingredient" className="w-full p-2" />
          <IngredientFilter ingredientList={ingredientList} />
        </div>
      )}
    </div>
  );
}

export default IngredientPanel;
