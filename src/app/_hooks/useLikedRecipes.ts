import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addRemoveLikedRecipe, getLikedRecipes } from "../_actions/action";
import { useState } from "react";

export function useLikedRecipes(userId: number) {
  const queryClient = useQueryClient();
  const [likedRecipes, setLikedRecipes] = useState<number[]>([]);
  const { isLoading, error } = useQuery({
    queryKey: ["likedRecipes"],
    queryFn: async () => {
      const result = await getLikedRecipes(userId);
      const recipesIdList = result.map((item) => item.recipeId);
      setLikedRecipes(recipesIdList);
      return likedRecipes;
    },
    enabled: Boolean(userId),
    staleTime: 1000 * 60 * 5,
  });
  const { mutate: toggleLike } = useMutation({
    mutationFn: async (recipeId: number) => {
      const isSaved = likedRecipes.includes(recipeId);
      if (userId) {
        await addRemoveLikedRecipe(recipeId, Number(userId), isSaved);
      } else {
        throw new Error("User ID is undefined");
      }
      return recipeId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["likedRecipes"],
      });
    },
    onError: (error) => console.error(error),
  });
  return { likedRecipes, toggleLike, isLoading, error };
}
