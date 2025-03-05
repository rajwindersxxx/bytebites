import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { getRecipeByIngredientsData } from "../_actions/action";
import { ExtendedIngredients, RecipeObject } from "../types/RecipeTypes";

interface props {
  extendedIngredients: ExtendedIngredients[];
}
function IngredientBasedRecipes({ extendedIngredients }: props) {
  const [similarRecipes, setSimilarRecipes] = useState<RecipeObject[] | null>(
    null,
  );
  useEffect(() => {
    async function getRecipes() {
      const output = await getRecipeByIngredientsData(extendedIngredients);
      setSimilarRecipes(output);
    }
    getRecipes();
  }, [extendedIngredients]);
  return (
    <div>
      <h2 className="mb-8 text-2xl"> 📝 Similar Recipes </h2>
      <div className="flex flex-col gap-4">
        {similarRecipes?.map((item) => (
          <RecipeCard data={item} key={item.id + item.title} />
        ))}
      </div>
    </div>
  );
}

export default IngredientBasedRecipes;
