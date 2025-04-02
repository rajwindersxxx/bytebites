import { useMutation } from "@tanstack/react-query";
import { useRecipeFilter } from "../context/RecipeFilterContext";
import { makeARecipe } from "../_actions/recipesActions";
import toast from "react-hot-toast";

function useGenerateRecipe() {
  const { selectedIngredients } = useRecipeFilter();
  const ingredientArray = [...new Set(selectedIngredients)];

  const { mutate: generateRecipe, status } = useMutation({
    mutationFn: async () => {
      if (ingredientArray.length < 3)
        throw new Error("At Least 3 Ingredient required  ");
      return await makeARecipe({
        ingredient: ingredientArray.map((value) => ({ value })),
      });
    },
    onSuccess: (output) => {
      toast.success("Your AI recipe is ready to view");
      sessionStorage.setItem("generatedRecipe", JSON.stringify(output));
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      toast.success('Ai recipe take a while... ')
    }
  });
  return { generateRecipe, status };
}

export default useGenerateRecipe;
