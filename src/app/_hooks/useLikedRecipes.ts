import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addRemoveLikedRecipe, getLikedRecipes } from "../_actions/action";
import { useState } from "react";
import toast from "react-hot-toast";
import { RecipeObject } from "../types/RecipeTypes";
import { getSessionStorage } from "../_helper/clientheper";

export function useLikedRecipes(userId: number) {
  const queryClient = useQueryClient();
  const [likedRecipes, setLikedRecipes] = useState<number[]>([]);

  const {data: likedRecipesData, isLoading, error } = useQuery({
    queryKey: ["likedRecipes"],
    queryFn: async () => {
      const result = await getLikedRecipes(userId);
      const recipesIdList = result.map((item) => item.id);
      setLikedRecipes(recipesIdList);
      return result;
    },
    enabled: Boolean(userId),
    staleTime: 1000 * 60 * 5,
  });
  const { mutate: toggleLike, isPending: isLikePending } = useMutation({
    mutationFn: async (recipeId: number) => {
      const isLiked = likedRecipes.includes(recipeId);
      if (userId) {
        let aiRecipe;
        if (!recipeId) {
          aiRecipe = getSessionStorage("generatedRecipe") as RecipeObject;
          delete aiRecipe.review;
        }
        await addRemoveLikedRecipe(recipeId, Number(userId), isLiked, aiRecipe);
      } else {
        throw new Error("You need to Login");
      }
      return { recipeId, isLiked };
    },
    onSuccess: ({ isLiked }) => {
      if (isLiked) toast.success("Recipe removed Successfully");
      else toast.success("Recipe Liked Successfully");
      queryClient.invalidateQueries({
        queryKey: ["likedRecipes"],
      });
    },
    onError: (error) => toast.error(error.message),
  });
  return {
    likedRecipesData,
    likedRecipes,
    toggleLike,
    isLoading,
    isLikePending,
    error,
  };
}
