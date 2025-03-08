import React from "react";
import RecipeCard from "./RecipeCard";
import { RECIPE_IMAGE_URL } from "../_config/foodApiConfig";
import { getSimilarRecipesData } from "../_actions/action";
import { RecipeObject } from "../types/RecipeTypes";
interface props {
  id: number;
}

export default async function SimilarRecipes({ id }: props) {
  const data: RecipeObject[] = await getSimilarRecipesData(id);
  return (
    <div>
      <h2 className="text-2xl mb-8"> 📝 Similar Recipes</h2>
      <div className="flex flex-col gap-4">
        {data.map((item) => (
          <RecipeCard
            data={item}
            baseUrlImage={RECIPE_IMAGE_URL}
            key={item.id}
            visibleButtons={['like', 'saved', 'cart']}
          />
        ))}
      </div>
    </div>
  );
}
