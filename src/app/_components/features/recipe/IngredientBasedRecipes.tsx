import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { getRecipeByIngredientsData } from "@/app/_actions/recipesActions";
import { ExtendedIngredients, RecipeObject } from "../../../types/RecipeTypes";

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
