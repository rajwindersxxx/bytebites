import React from 'react';
import RecipeCard from './RecipeCard';
import { getSimilarRecipes } from '../api/foodApi';
interface props {
  id: number;
}
interface similarRecipe{
  image: string;
  title: string;
  readyInMinutes: number;
  id: number;
  servings: number;
}
export default async function SimilarRecipes({ id }: props) {
  const baseUrlImage = 'https://img.spoonacular.com/recipes';
  const data :similarRecipe[] = await getSimilarRecipes(id)
  return (
    <div>
      <h2 className="text-2xl mb-8"> 📝 Similar Recipes</h2>
      <div className='flex flex-col gap-4'>
        {data.map((item) => (
          <RecipeCard data={item} baseUrlImage={baseUrlImage} key={item.id + item.title} />
        ))}
      </div>
    </div>
  );
}
