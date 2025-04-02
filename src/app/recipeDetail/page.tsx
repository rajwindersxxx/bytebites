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
    <div className="container mx-auto my-16 md:p-0 pl-8 overflow-hidden rounded-lg border bg-natural-cream dark:border-natural-beige">
      <div className="lg:grid grid-cols-[30rem_2fr] gap-8 p-8">
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
        <div className="grid gap-8 lg:grid-cols-[auto_1fr]">
          <RecipeInstructions analyzedInstructions={analyzedInstructions} />
          <SimilarRecipes id={otherDetails.id} />
        </div>
      </div>
    </div>
  );
}
