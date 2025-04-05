import RecipeCard from "./RecipeCard";
import Spinner from "../../ui/Spinner";
import { RecipeObject } from "../../../types/RecipeTypes";
import { useRecipeFilter } from "@/app/context/RecipeFilterContext";
import useSearchRecipe from "@/app/_hooks/useSearchRecipe";

export default function RecipeList() {
  const { filterParameters } = useRecipeFilter();
  const { recipeData, isLoadingRecipes , apiError} = useSearchRecipe(filterParameters);

  if (isLoadingRecipes) return <Spinner className="absolute p-4 top-[40%] " />;
  if (recipeData.length < 1)
    return <p className=" p-4 text-2xl absolute top-1/2">🍽️ No recipe found , try AI </p>;
  if (apiError)
    return <p className=" p-4 text-2xl absolute top-1/2">😔 {apiError} </p>;
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
