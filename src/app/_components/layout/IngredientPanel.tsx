"use client";
// todo: add search ingredient filter later
import { useGUIState } from "../../context/GUIStateProvider";
import { IngredientListTags } from "../../types/RecipeTypes";
import { SecondaryButton } from "../ui/Buttons";
import IngredientFilter from "../ui/IngredientFilter";
import useGenerateRecipe from "@/app/_hooks/useGenerateRecipe";
import Link from "next/link";
interface props {
  ingredientList: IngredientListTags[];
}
function IngredientPanel({ ingredientList }: props) {
  const { searchPanelHidden } = useGUIState();
  const { generateRecipe, status } = useGenerateRecipe();
  return (
    <div>
      <div className="absolute right-0 h-[calc(100vh-7.7rem)] overflow-y-scroll bg-natural-cream md:relative">
        {searchPanelHidden || (
          <div className={`w-96 border-l-2 border-accent p-4 transition-all`}>
            <h2 className="pb-0 text-center text-2xl">Filter by Ingredients</h2>

            {/* <Input placeHolder="add Ingredient" className="w-full p-2" /> */}
            <IngredientFilter ingredientList={ingredientList} />
          </div>
        )}
      </div>
      {searchPanelHidden || (
        <div className="p-4 text-center">
          {status === "success" ? (
            <Link href={"/generateRecipe/generatedRecipe"}>
              <SecondaryButton>View AI recipe</SecondaryButton>
            </Link>
          ) : (
            <SecondaryButton
              onClick={generateRecipe}
              className="w-36"
              disabled={status === "pending"}
            >
              {status === "pending"
                ? "This will take while"
                : "Make A.I recipe"}
            </SecondaryButton>
          )}
        </div>
      )}
    </div>
  );
}

export default IngredientPanel;
