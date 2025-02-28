import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  addRemoveSavedRecipe, getSavedRecipes } from "../_actions/action";
import { useState } from "react";

export function useSavedRecipes(userId: number) {
  const queryClient = useQueryClient();
  const [savedRecipes, setSavedRecipes] = useState<number[]>([]);
  const { isLoading, error } = useQuery({
    queryKey: ["savedRecipes"],
    queryFn: async () => {
      const result = await getSavedRecipes(Number(userId));
      const recipesIdList = result.map((item) => item.recipeId);
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
  return { savedRecipes, toggleSave, isLoading, error };
}
