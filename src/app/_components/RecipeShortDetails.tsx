"use client";

import { useSearchParams } from "next/navigation";
import { useRecipeData } from "../context/RecipeDataContext";
import RecipeSummary from "./RecipeSummary";
import Ingredients from "./Ingredients";
import Link from "next/link";

function RecipeShortDetails() {
  const searchParams = useSearchParams();
  const recipeId = searchParams.get("recipeId");
  const { savedRecipeData } = useRecipeData();

  const selectedRecipe = savedRecipeData?.filter(
    (item) => item.id === Number(recipeId),
  )[0];
  if (!selectedRecipe)
    return (
      <div className="flex justify-center  items-center">
        <h2 className="text-xl">No Recipe is Selected</h2>
      </div>
    );
  return (
    <div className="flex flex-col justify-between">
      <div className="image max-h-[calc(100vh-250px)] overflow-y-auto [&_.IngredientCard]:w-56 [&_.IngredientCard]:p-2 [&_.IngredientImage]:h-12 [&_.IngredientImage]:w-12 [&_.ingredientsList]:grid-cols-responsiveGrid2Small [&_h2]:mb-4 [&_h2]:text-[18px] [&_h4]:text-sm [&_p]:text-sm">
        {selectedRecipe && (
          <div className="flex justify-between">
            <h2 className="text-4xl underline">{selectedRecipe.title} </h2>
          </div>
        )}
        {selectedRecipe?.extendedIngredients && (
          <Ingredients
            extendedIngredients={selectedRecipe.extendedIngredients}
          />
        )}
        {selectedRecipe?.summary && (
          <RecipeSummary summary={selectedRecipe.summary} />
        )}
      </div>
      <Link
        href={`/recipeDetail?recipeId=${recipeId}`}
        className="text-center text-xl underline"
      >
        Show full recipe
      </Link>
    </div>
  );
}

export default RecipeShortDetails;
