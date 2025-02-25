import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { getRandomRecipeData } from "../_actions/action";

// Define the correct interface for a single recipe
interface Recipe {
  id: number;
  image: string;
  title: string;
  readyInMinutes: number;
  servings: number;
  vegetarian?: boolean;
  pricePerServing?: number;
  veryPopular?: boolean;
  extendedIngredients?: unknown[];
  baseUrlImage?: string;
  searchParams: { search: string };
}

export default function RandomRecipes() {
  const [recipeData, setRecipeData] = useState<Recipe[]>([]);
  useEffect(() => {
    async function getRecipe() {
      const data = await getRandomRecipeData() as [];
      setRecipeData(data);
    }
    getRecipe();
  }, []);

  return (
    <>
      {recipeData.map((recipe) => (
        <RecipeCard data={recipe} key={recipe.id} />
      ))}
    </>
  );
}
