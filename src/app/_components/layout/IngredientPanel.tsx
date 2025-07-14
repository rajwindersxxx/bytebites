"use client";
// todo: add search ingredient filter later
import { useGUIState } from "../../_context/GUIStateProvider";
import { IngredientListTags } from "../../_types/RecipeTypes";
import { PrimaryButton, SecondaryButton } from "../ui/Buttons";
import IngredientFilter from "../ui/IngredientFilter";
import Link from "next/link";
// import MiniSpinner from "../ui/MiniSpinner"
import { useRecipeData } from "@/app/_context/RecipeDataContext";
import { IoDiamondOutline } from "react-icons/io5";
import { recipeCost } from "@/app/_config/aiConfig";
import { useEffect, useState } from "react";
interface props {
  ingredientList: IngredientListTags[];
}
function IngredientPanel({ ingredientList }: props) {
  const { searchPanelHidden } = useGUIState();
  const { generateRecipe, status } = useRecipeData();
  const [clickStatus, setClickStatus] = useState(false);
  useEffect(() => {
    if (status === "success") setClickStatus(true);
  }, [status]);
  return (
    <div
      className={`absolute bottom-0 right-0 top-[3rem] bg-natural-cream md:relative md:top-0 ${searchPanelHidden || "border-l-2 border-accent"}`}
    >
      <div className="h-[calc(100vh-7.5rem)] overflow-y-scroll md:h-[calc(100vh-7.7rem)]">
        {searchPanelHidden || (
          <div className={`w-96 p-4`}>
            <h2 className="pb-0 text-center text-2xl">Filter by Ingredients</h2>

            {/* <Input placeHolder="add Ingredient" className="w-full p-2" /> */}
            <IngredientFilter ingredientList={ingredientList} />
          </div>
        )}
      </div>
      {searchPanelHidden || (
        <div className="p-4 text-center">
          {clickStatus ? (
            <Link href={"/generateRecipe/generatedRecipe"}>
              <PrimaryButton onClick={() => setClickStatus(false)}>
                View AI recipe
              </PrimaryButton>
            </Link>
          ) : (
            <SecondaryButton
              onClick={generateRecipe}
              className="w-48"
              disabled={status === "pending"}
            >
              {status === "pending" ? (
                "take a while..."
              ) : (
                <span className="flex items-center justify-center gap-1">
                  Make A.I recipe <IoDiamondOutline /> {recipeCost}
                </span>
              )}
            </SecondaryButton>
          )}
        </div>
      )}
    </div>
  );
}

export default IngredientPanel;
