import RecipeCard from "./RecipeCard";
import Spinner from "../../ui/Spinner";
import { RecipeObject } from "../../../types/RecipeTypes";
import { useRecipeFilter } from "@/app/context/RecipeFilterContext";
import useSearchRecipe from "@/app/_hooks/useSearchRecipe";

export default function RecipeList() {
  const { filterParameters } = useRecipeFilter();
  const { recipeData, isLoadingRecipes } = useSearchRecipe(filterParameters);

  if (isLoadingRecipes) return <Spinner />;
  if (recipeData.length < 1)
    return <p className="h-96 p-4 text-2xl absolute top-1/2">🍽️ No recipe found , try AI </p>;
  return (
    <>
      {recipeData.length > 0 &&
        recipeData?.map((recipe: RecipeObject) => (
          <RecipeCard
            data={recipe}
            key={recipe.id}
            visibleButtons={["like", "saved"]}
            totalResults={recipeData.length}
          />
        ))}
    </>
  );
}
