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
      <div className="md:flex items-center justify-center hidden">
        <h2 className="text-xl">No Recipe is Selected</h2>
      </div>
    );
    return (
    // TODO : open details on top of list on small screen (currently hidden on small screen)
    <div className="absolute z-40 -ml-4 h-[calc(100vh-70px)] flex-col justify-between bg-natural-cream md:relative md:z-0 md:ml-0 md:flex md:h-[calc(100vh-80px)] hidden">
      <div className="flex max-h-[calc(100vh-150px)] flex-grow flex-col gap-4 overflow-y-auto [&_.IngredientCard]:w-56 [&_.IngredientCard]:p-2 [&_.IngredientImage]:h-12 [&_.IngredientImage]:w-12 [&_.ingredientsList]:grid-cols-responsiveGrid2Small [&_h2]:mb-4 [&_h4]:text-sm">
        {selectedRecipe && (
          <h2 className="border-b border-accent pb-3 text-center text-4xl md:text-start">
            {selectedRecipe.title}{" "}
          </h2>
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
        className="block p-4 text-center text-2xl underline"
      >
        Show full recipe
      </Link>
    </div>
  );
}

export default RecipeShortDetails;
