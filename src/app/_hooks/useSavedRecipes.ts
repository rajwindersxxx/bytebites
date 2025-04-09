import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addRemoveSavedRecipe,
  getSavedRecipes,
} from "../_actions/userDataActions";
import { useState } from "react";
import { RecipeObject } from "../_types/RecipeTypes";
import toast from "react-hot-toast";
import { getSessionStorage, setLocalStorage } from "../_helper/clientheper";
import { useSession } from "next-auth/react";
export function useSavedRecipes() {
  const session =  useSession();
  const userId = session.data?.user?.id
  const queryClient = useQueryClient();
  const [savedRecipes, setSavedRecipes] = useState<number[]>([]);
  const {
    data: savedRecipeData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["savedRecipes"],
    queryFn: async () => {
      const result = await getSavedRecipes();
      const recipesIdList = result.map((item) => item.recipeId);
      setSavedRecipes(recipesIdList);
      return result.map((item) => item.bitebytesRecipes);
    },
    enabled: Boolean(userId),
    staleTime: Infinity,
  });
  const { mutate: toggleSave, isPending } = useMutation({
    mutationFn: async (recipeId: number) => {
      const isSaved = savedRecipes.includes(recipeId);
      let aiRecipe = null;
      if (userId) {
        aiRecipe = getSessionStorage("generatedRecipe") as RecipeObject;
        await addRemoveSavedRecipe(recipeId, isSaved, aiRecipe);
      } else {
        throw new Error("You need to Login");
      }
      return { isSaved, aiRecipe };
    },
    onSuccess: ({ isSaved, aiRecipe }) => {
      setLocalStorage("generatedRecipe", {
        ...aiRecipe,
        sourceUrl: "AI recipe",
      });
      if (isSaved) toast.success("Recipe Bookmarked removed  Successfully");
      else toast.success("Recipe Bookmarked  Successfully");
      queryClient.invalidateQueries({
        queryKey: ["savedRecipes"],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });
  return {
    savedRecipes,
    savedRecipeData,
    setSavedRecipes,
    toggleSave,
    isLoading,
    isPending,
    error,
  };
}
