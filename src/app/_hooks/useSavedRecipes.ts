import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addRemoveSavedRecipe, getSavedRecipes } from "../_actions/action";
import { useState } from "react";
type data = {
  id: number;
  image: string;
  title: string;
  servings: number;
  readyInMinutes: number;
  summary: string;
  extendedIngredients: {
    id: number;
    name: string;
    amount: number;
    unit: string;
    image: string;
    consistency: string;
    measures: {
      metric: {
        unitShort: string;
      };
    };
  }[];
}[];
export function useSavedRecipes(userId: number) {
  const queryClient = useQueryClient();
  const [savedRecipes, setSavedRecipes] = useState<number[]>([]);
  const [savedRecipeData, setSavedREcipeData] = useState<data>([]);
  const { isLoading, error } = useQuery({
    queryKey: ["savedRecipes"],
    queryFn: async () => {
      const result = await getSavedRecipes(Number(userId));
      const recipesIdList = result.map((item) => item.recipeId);
      setSavedREcipeData(result.map((item) => item.bitebytesRecipes));
      setSavedRecipes(recipesIdList);
      return savedRecipes;
    },
    enabled: Boolean(userId),
    staleTime: 1000 * 60 * 5,
  });
  const { mutate: toggleSave } = useMutation({
    mutationFn: async (recipeId: number) => {
      const isSaved = savedRecipes.includes(recipeId);
      if (userId) {
        await addRemoveSavedRecipe(recipeId, Number(userId), isSaved);
      } else {
        throw new Error("User ID is undefined");
      }
      return recipeId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["savedRecipes"],
      });
    },
    onError: (error) => console.error(error),
  });
  return { savedRecipes, savedRecipeData, toggleSave, isLoading, error };
}
