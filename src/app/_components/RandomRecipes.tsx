import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { SITE_URL } from "../_config/siteConfig";

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
  // Use the Recipe interface for recipeData
  const [recipeData, setRecipeData] = useState<Recipe[]>([]);

  useEffect(() => {
    async function getRecipe() {
      const res = await fetch(`${SITE_URL}/api/recipe`);
      const data = await res.json();
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
