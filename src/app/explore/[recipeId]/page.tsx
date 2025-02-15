import React from 'react';
import Image from 'next/image.js';
import RecipeSummary from '@/app/components/RecipeSummary';
import RecipeDetail from '@/app/components/RecipeDetail';
import Ingredients from '@/app/components/Ingredients';
import RecipeInstructions from '@/app/components/RecipeInstructions';
import SimilarRecipes from '@/app/components/SimilarRecipes';
import { getRecipeDetails } from '@/app/api/foodApi';
interface props {
  params: { recipeId: string };
}
export default async function page({ params }: props) {
  const { recipeId } = await params;
  const data = await getRecipeDetails(Number(recipeId))
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
        <Image src={image} priority={true} alt="title" fill className=" object-cover" sizes='100%'/>
      </div>
      <RecipeDetail detail={otherDetails} />
      <RecipeSummary summary={summary} />
      <Ingredients extendedIngredients={extendedIngredients} />
      <RecipeInstructions analyzedInstructions={analyzedInstructions}/>
      <SimilarRecipes id={id}/> 
    </div>
  );
}
