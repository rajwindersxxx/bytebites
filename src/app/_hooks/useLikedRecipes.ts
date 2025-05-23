import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addRemoveLikedRecipe,
  getLikedRecipes,
} from "../_actions/userDataActions";
import { useState } from "react";
import toast from "react-hot-toast";
import { RecipeObject } from "../_types/RecipeTypes";
import { getSessionStorage, setLocalStorage } from "../_helper/clientheper";
import { useSession } from "next-auth/react";

export function useLikedRecipes() {
   const session =  useSession();
    const userId = session.data?.user?.id
  const queryClient = useQueryClient();
  const [likedRecipes, setLikedRecipes] = useState<number[]>([]);

  const {
    data: likedRecipesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["likedRecipes"],
    queryFn: async () => {
      const result = await getLikedRecipes();
      setLikedRecipes(result.map((item) => item.id));
      return result;
    },
    enabled: Boolean(userId),
    staleTime: Infinity,
  });

  const { mutate: toggleLike, isPending: isLikePending } = useMutation({
    mutationFn: async (recipeId: number) => {
      const isLiked = likedRecipes.includes(recipeId);
      const aiRecipe = getSessionStorage("generatedRecipe") as RecipeObject;
      await addRemoveLikedRecipe(recipeId, isLiked, aiRecipe);
      return { recipeId, isLiked, aiRecipe };
    },
    onSuccess: ({ isLiked, aiRecipe }) => {
      setLocalStorage("generatedRecipe", {
        ...aiRecipe,
        sourceUrl: "AI recipe",
      });
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
    setLikedRecipes,
    toggleLike,
    isLoading,
    isLikePending,
    error,
  };
}
