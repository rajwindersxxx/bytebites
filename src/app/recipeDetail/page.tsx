import React from "react";
import RecipeSummary from "@/app/_components/ui/RecipeSummary";
import RecipeDetail from "@/app/_components/features/recipe/RecipeDetail";
import Ingredients from "@/app/_components/ui/Ingredients";
import RecipeInstructions from "@/app/_components/features/recipe/RecipeInstructions";
import { ImageElement } from "../_components/ui/ImageElement";
import { getRecipeDetailsData } from "../_actions/recipesActions";
import SimilarRecipes from "../_components/features/recipe/SimilarRecipes";
interface props {
  searchParams: Promise<{ recipeId: string }>;
}
export default async function page({ searchParams }: props) {
  const { recipeId } = await searchParams;

  const data = await getRecipeDetailsData(Number(recipeId));
  const {
    image,
    summary,
    extendedIngredients,
    analyzedInstructions,
    ...otherDetails
  } = data;
  return (
    <div className="container m-8 mt-16 mx-auto grid grid-cols-[1fr_1fr_1fr] gap-12 border bg-natural-cream p-12 dark:border-natural-beige">
      <div className="relative overflow-hidden rounded-lg border border-natural-green">
        <ImageElement src={image} alt="title" className="object-cover" />
      </div>
      <RecipeDetail detail={otherDetails} />
      <RecipeSummary summary={summary} />
      <Ingredients extendedIngredients={extendedIngredients} />
      <RecipeInstructions analyzedInstructions={analyzedInstructions} />
      <SimilarRecipes id={otherDetails.id} />
    </div>
  );
}
