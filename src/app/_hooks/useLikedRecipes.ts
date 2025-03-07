import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addRemoveLikedRecipe, getLikedRecipes } from "../_actions/action";
import {  useState } from "react";
import toast from "react-hot-toast";
import { RecipeObject } from "../types/RecipeTypes";

export function useLikedRecipes(userId: number) {
  const queryClient = useQueryClient();
  const [likedRecipes, setLikedRecipes] = useState<number[]>([]);
  const [likedRecipesData, setLikedRecipeData] = useState<RecipeObject[]>([]);

  const { isLoading, error } = useQuery({
    queryKey: ["likedRecipes"],
    queryFn: async () => {
      const result = await getLikedRecipes(userId);
      const recipesIdList = result.map((item) => item.id);
      setLikedRecipes(recipesIdList);
      setLikedRecipeData(result)
      return likedRecipes;
    },
    enabled: Boolean(userId),
    staleTime: 1000 * 60 * 5,
  });
  const { mutate: toggleLike, isPending: isLikePending } = useMutation({
    mutationFn: async (recipeId: number) => {
      const isLiked = likedRecipes.includes(recipeId);
      if (userId) {
         await addRemoveLikedRecipe(
          recipeId,
          Number(userId),
          isLiked,
        );
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
  return {likedRecipesData, likedRecipes, toggleLike, isLoading, isLikePending, error };
}
