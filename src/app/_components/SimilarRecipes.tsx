import React from "react";
import RecipeCard from "./RecipeCard";
import { RECIPE_IMAGE_URL } from "../_config/foodApiConfig";
import { getSimilarRecipesData } from "../_actions/action";
interface props {
  id: number;
}
interface similarRecipe {
  image: string;
  title: string;
  readyInMinutes: number;
  id: number;
  servings: number;
}
export default async function SimilarRecipes({ id }: props) {
  const data: similarRecipe[] = await getSimilarRecipesData(id);
  return (
    <div>
      <h2 className="text-2xl mb-8"> 📝 Similar Recipes</h2>
      <div className="flex flex-col gap-4">
        {data.map((item) => (
          <RecipeCard
            data={item}
            baseUrlImage={RECIPE_IMAGE_URL}
            key={item.id + item.title}
            visibleButtons={['like', 'saved', 'cart']}
          />
        ))}
      </div>
    </div>
  );
}
