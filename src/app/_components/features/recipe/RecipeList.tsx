import RecipeCard from "./RecipeCard";
import Spinner from "../../ui/Spinner";
import { RecipeObject } from "../../../_types/RecipeTypes";
import { useRecipeFilter } from "@/app/_context/RecipeFilterContext";
import useSearchRecipe from "@/app/_hooks/useSearchRecipe";

export default function RecipeList() {
  const { filterParameters } = useRecipeFilter();
  const { recipeData, isLoadingRecipes, apiError } =
    useSearchRecipe(filterParameters);

  if (isLoadingRecipes) return <Spinner className="absolute top-[40%] p-4" />;
  if (recipeData.length < 1)
    return (
      <p className="absolute top-1/2 p-4 text-2xl">
        🍽️ No recipe found , try AI{" "}
      </p>
    );
  if (apiError)
    return <p className="absolute top-1/2 p-4 text-2xl">😔 {apiError} </p>;
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
