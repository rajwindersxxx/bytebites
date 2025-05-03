import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecipeFilter } from "../_context/RecipeFilterContext";
import { makeARecipe } from "../_actions/recipesActions";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { getSessionStorage } from "../_helper/clientheper";
import { useSession } from "next-auth/react";

function useGenerateRecipe() {
  const [generatedRecipe, setGeneratedRecipe] = useState();
  const { selectedIngredients } = useRecipeFilter();
  const queryClient = useQueryClient();
  const session =  useSession();
  const ingredientArray = [...new Set(selectedIngredients)];
  const { mutate: generateRecipe, status } = useMutation({
    mutationFn: async () => {
      if(!session.data?.user) throw new Error("You need to Login ")
      if (ingredientArray.length < 3)
        throw new Error("At Least 3 Ingredient required  ");
      return await makeARecipe({
        ingredient: ingredientArray.map((value) => ({ value })),
      });
    },
    onSuccess: (output) => {
      toast.success("Your AI recipe is ready to view");
      sessionStorage.setItem("generatedRecipe", JSON.stringify(output));
      queryClient.invalidateQueries({queryKey: ['userData']})
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    const data = getSessionStorage("generatedRecipe");
    setGeneratedRecipe(data);
  }, [status]);
  return { generateRecipe, status, generatedRecipe };
}

export { useGenerateRecipe };
