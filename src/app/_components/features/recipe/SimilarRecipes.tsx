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
  if (data[0].error)
    return <p className=" p-4 text-2xl absolute top-1/2">😔 {data[0].error} </p>;
  return (
    <div>
      <h2 className="mb-8 text-2xl"> 📝 Similar Recipes</h2>
      <div className="mx-auto grid grid-cols-responsiveGrid gap-4">
        {data.map((item) => (
          <RecipeCard
            data={item}
            baseUrlImage={RECIPE_IMAGE_URL}
            key={item.id}
            visibleButtons={["like", "saved"]}
          />
        ))}
      </div>
    </div>
  );
}
