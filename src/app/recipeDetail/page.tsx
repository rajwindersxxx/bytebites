import React from "react";
import Image from "next/image.js";
import RecipeSummary from "@/app/_components/RecipeSummary";
import RecipeDetail from "@/app/_components/RecipeDetail";
import Ingredients from "@/app/_components/Ingredients";
import RecipeInstructions from "@/app/_components/RecipeInstructions";
import SimilarRecipes from "@/app/_components/SimilarRecipes";
import { getRecipeDetails } from "@/app/_servers/foodApi";
import { ImageElement } from "../_components/ImageElement";
interface props {
  searchParams: { recipeId: string };
}
export default async function page({ searchParams }: props) {
  const { recipeId } = await searchParams;
  const data = await getRecipeDetails(Number(recipeId));
  const {
    id,
    image,
    summary,
    extendedIngredients,
    analyzedInstructions,
    ...otherDetails
  } = data;
  return (
    <div className="container mx-auto p-12 m-8 border grid grid-cols-[1fr_1fr_1fr] gap-12  ">
      <div className=" overflow-hidden relative rounded-lg border border-natural-green">
        <ImageElement
          src={image}
          alt="title"
          className=" object-cover"
        />
      </div>
      <RecipeDetail detail={otherDetails} />
      <RecipeSummary summary={summary} />
      <Ingredients extendedIngredients={extendedIngredients} />
      <RecipeInstructions analyzedInstructions={analyzedInstructions} />
      <SimilarRecipes id={id} />
    </div>
  );
}
