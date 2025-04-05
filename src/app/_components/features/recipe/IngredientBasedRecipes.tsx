import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { getRecipeByIngredientsData } from "@/app/_actions/recipesActions";
import { ExtendedIngredients, RecipeObject } from "../../../types/RecipeTypes";

interface props {
  extendedIngredients: ExtendedIngredients[];
}
function IngredientBasedRecipes({ extendedIngredients }: props) {
  const [similarRecipes, setSimilarRecipes] = useState<RecipeObject[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function getRecipes() {
      const output = await getRecipeByIngredientsData(extendedIngredients);
      if (output.error) setError(output.error);
      setSimilarRecipes(output);
    }
    getRecipes();
  }, [extendedIngredients]);
  if (similarRecipes.length < 1)
    return <p className="absolute top-1/2 p-4 text-2xl">No recipe found </p>;
  if (error)
    return (
      <div className="relative">
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2  p-4 text-xl text-center">😔 {error} </p>
      </div>
    );
  return (
    <div>
      <h2 className="mb-8 text-2xl"> 📝 Similar Recipes</h2>
      <div className="mx-auto grid grid-cols-responsiveGrid gap-4">
        {similarRecipes?.map((item) => (
          <RecipeCard
            data={item}
            //  baseUrlImage={RECIPE_IMAGE_URL}
            key={item.id}
            visibleButtons={["like", "saved"]}
          />
        ))}
      </div>
    </div>
  );
}

export default IngredientBasedRecipes;
