"use client";

import { useSearchParams } from "next/navigation";
import { useRecipeData } from "../../../context/RecipeDataContext";
import RecipeSummary from "../../ui/RecipeSummary";
import Ingredients from "../../ui/Ingredients";
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
      <div className="flex items-center justify-center">
        <h2 className="text-xl">No Recipe is Selected</h2>
      </div>
    );
  return (
    <div className="flex flex-col justify-between">
      <div className=" flex max-h-[calc(100vh-150px)] gap-4 flex-grow flex-col overflow-y-auto [&_.IngredientCard]:w-56 [&_.IngredientCard]:p-2 [&_.IngredientImage]:h-12 [&_.IngredientImage]:w-12 [&_.ingredientsList]:grid-cols-responsiveGrid2Small [&_h2]:mb-4 [&_h4]:text-sm">
        {selectedRecipe && (
            <h2 className="text-4xl pb-3 border-b border-accent">{selectedRecipe.title} </h2>
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
