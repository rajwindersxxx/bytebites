import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addRemoveSavedRecipe, getSavedRecipes } from "../_actions/action";
import { useState } from "react";
import { RecipeObject } from "../types/RecipeTypes";
import toast from "react-hot-toast";
import { getSessionStorage } from "../_helper/clientheper";
export function useSavedRecipes(userId: number) {
  const queryClient = useQueryClient();
  const [savedRecipes, setSavedRecipes] = useState<number[]>([]);
  const {
    data: savedRecipeData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["savedRecipes"],
    queryFn: async () => {
      const result = await getSavedRecipes(Number(userId));
      const recipesIdList = result.map((item) => item.recipeId);
      setSavedRecipes(recipesIdList);
      return result.map((item) => item.bitebytesRecipes);
    },
    enabled: Boolean(userId),
    staleTime: 1000 * 60 * 5,
  });
  const { mutate: toggleSave, isPending } = useMutation({
    mutationFn: async (recipeId: number) => {
      const isSaved = savedRecipes.includes(recipeId);
      if (userId) {
        let aiRecipe;
        if (!recipeId) {
          aiRecipe = getSessionStorage("generatedRecipe") as RecipeObject;
          delete aiRecipe.review;
        }
        await addRemoveSavedRecipe(recipeId, Number(userId), isSaved, aiRecipe);
      } else {
        throw new Error("You need to Login");
      }
      return { isSaved };
    },
    onSuccess: ({ isSaved }) => {
      if (isSaved) toast.success("Recipe Bookmarked removed  Successfully");
      else toast.success("Recipe Bookmarked  Successfully");
      queryClient.invalidateQueries({
        queryKey: ["savedRecipes"],
      });
    },
    onError: (error) => toast.error(error.message),
  });
  return {
    savedRecipes,
    savedRecipeData,
    toggleSave,
    isLoading,
    isPending,
    error,
  };
}
