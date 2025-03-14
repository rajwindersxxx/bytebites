import { getSimilarRecipesData } from "@/app/_actions/recipesActions";
import { RecipeObject } from "@/app/types/RecipeTypes";
import React from "react";
import RecipeCard from "./RecipeCard";
import { RECIPE_IMAGE_URL } from "@/app/_config/foodApiConfig";

interface props {
  id: number;
}

export default async function SimilarRecipes({ id }: props) {
  const data: RecipeObject[] = await getSimilarRecipesData(id);
  return (
    <div>
      <h2 className="mb-8 text-2xl"> 📝 Similar Recipes</h2>
      <div className="flex flex-col gap-4">
        {data.map((item) => (
          <RecipeCard
            data={item}
            baseUrlImage={RECIPE_IMAGE_URL}
            key={item.id}
            visibleButtons={["like", "saved", "cart"]}
          />
        ))}
      </div>
    </div>
  );
}
