import RecipeCard from "./RecipeCard";
import Spinner from "../../ui/Spinner";
import { RecipeObject } from "../../../types/RecipeTypes";
import { useRecipeFilter } from "@/app/context/RecipeFilterContext";
import useSearchRecipe from "@/app/_hooks/useSearchRecipe";
import { useEffect } from "react";

interface props {
  offset: number;
}

export default function RecipeList({ offset }: props) {
  const { filterParameters } = useRecipeFilter();
  const {recipeData, isLoadingRecipes, setOffset}  =  useSearchRecipe(filterParameters);

  useEffect(() => {
    setOffset(offset);
  }, [offset, setOffset]);
  if (isLoadingRecipes) return <Spinner />;
  return (
    <>
      {recipeData?.map((recipe: RecipeObject) => (
        <RecipeCard
          data={recipe}
          key={recipe.id}
          visibleButtons={["like", "saved"]}
        />
      ))}
    </>
  );
}
