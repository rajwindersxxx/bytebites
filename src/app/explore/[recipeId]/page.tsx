import React from 'react';
import { recipeDetails } from '../../data/recipeDetails.js';
import Image from 'next/image.js';
import RecipeSummary from '@/app/components/RecipeSummary';
import RecipeDetail from '@/app/components/RecipeDetail';
import Ingredients from '@/app/components/Ingredients';
import RecipeInstructions from '@/app/components/RecipeInstructions';
interface props {
  params: { recipeId: string };
}
export default function page({ params }: props) {
  // const { recipeId } = await params;
  // console.log(recipeId);
  const {
    // id,
    image,
    summary,
    extendedIngredients,
    analyzedInstructions,
    ...otherDetails
  } = recipeDetails[0];
  return (
    <div className="container mx-auto p-12 m-8 border grid grid-cols-[1fr_1fr_1fr] gap-12  ">
      <div className=" min-h-[22rem] my-4 overflow-hidden relative rounded-md border border-natural-green">
        <Image src={image} alt="title" fill className=" object-cover" />
      </div>
      <RecipeDetail detail={otherDetails} />
      <RecipeSummary summary={summary} />
      <Ingredients extendedIngredients={extendedIngredients} />
      <RecipeInstructions analyzedInstructions={analyzedInstructions}/>
      <div className="bg-natural-cream h-32 ">extra data</div>
    </div>
  );
}
