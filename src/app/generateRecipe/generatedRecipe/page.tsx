"use client";
import { ImageElement } from "@/app/_components/ui/ImageElement";
import IngredientBasedRecipes from "@/app/_components/features/recipe/IngredientBasedRecipes";
import Ingredients from "@/app/_components/ui/Ingredients";
import RecipeDetail from "@/app/_components/features/recipe/RecipeDetail";
import RecipeInstructions from "@/app/_components/features/recipe/RecipeInstructions";
import RecipeSummary from "@/app/_components/ui/RecipeSummary";
import { useEffect, useState } from "react";
type recipe = {
  id: number;
  summary: string;
  title: string;
  image: string;
  dishTypes: string[];
  readyInMinutes: number;
  servings: number;
  pricePerServing: number;
  vegetarian: boolean;
  cuisines: string[];
  winePairing: {
    pairedWines: string[];
  };
  veryPopular: boolean;
  extendedIngredients: [];
  analyzedInstructions: [];
};
export default function Page() {
  const [recipe, setRecipe] = useState<recipe | null>(null);
  useEffect(() => {
    const storedRecipe = sessionStorage.getItem("generatedRecipe");
    if (storedRecipe) {
      const recipe = JSON.parse(storedRecipe);
      setRecipe(recipe);
    }
  }, []);
  return (
    <div className="container m-8 mx-auto grid grid-cols-[1fr_1fr_1fr] gap-12 border p-12">
      <div className="relative overflow-hidden rounded-lg border border-natural-green">
        {recipe?.image && (
          <ImageElement
            src={recipe.image}
            alt="title"
            className="object-cover"
          />
        )}
      </div>
      {recipe && <RecipeDetail detail={recipe} />}
      {recipe?.summary && <RecipeSummary summary={recipe.summary} />}
      {recipe?.extendedIngredients && (
        <Ingredients extendedIngredients={recipe.extendedIngredients} />
      )}
      {recipe?.analyzedInstructions && (
        <RecipeInstructions
          analyzedInstructions={recipe.analyzedInstructions}
        />
      )}
      {recipe?.extendedIngredients && (
        <IngredientBasedRecipes
          extendedIngredients={recipe.extendedIngredients}
        />
      )}
    </div>
  );
}
