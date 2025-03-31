import RecipeCard from "./RecipeCard";
import Spinner from "../../ui/Spinner";
import { RecipeObject } from "../../../types/RecipeTypes";
import { useRecipeFilter } from "@/app/context/RecipeFilterContext";

// Define the correct interface for a single recipe


export default function RecipeList() {
  const {recipeData , isLoadingRecipes} = useRecipeFilter();
  if (isLoadingRecipes) return <Spinner />;
  return (
    <>
      {recipeData?.map((recipe: RecipeObject) => (
        <RecipeCard
          data={recipe}
          key={recipe.id}
          visibleButtons={["like", "saved", "cart"]}
        />
      ))}
    </>
  );
}
