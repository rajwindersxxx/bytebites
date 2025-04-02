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
  if (!recipe) return null;
  const {
    image,
    summary,
    extendedIngredients,
    analyzedInstructions,
    ...otherDetails
  } = recipe;
  return (
    <div className="container mx-auto my-16 overflow-hidden rounded-lg border bg-natural-cream pl-8 dark:border-natural-beige md:p-0">
      <div className="grid-cols-[30rem_2fr] gap-8 p-8 lg:grid">
        <div className="relative h-96 overflow-hidden rounded-lg pb-4">
          <ImageElement
            src={image}
            alt="title"
            className="object-cover dark:brightness-75"
          />
        </div>
        <RecipeDetail detail={otherDetails} />
      </div>
      <div className="flex flex-col gap-8 px-8 pb-8">
        <Ingredients extendedIngredients={extendedIngredients} />
        <RecipeSummary summary={summary} />
        <div className="grid gap-8 lg:grid-cols-[4fr_1fr]">
          <RecipeInstructions analyzedInstructions={analyzedInstructions} />
          <IngredientBasedRecipes
            extendedIngredients={extendedIngredients}
          />
        </div>
      </div>
    </div>
  );
}
