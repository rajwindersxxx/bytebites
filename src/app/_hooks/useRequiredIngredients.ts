import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUpcomingIngredients,
  removeUpcomingIngredientItem,
} from "../_servers/supabase/mealPlanning";
import { useSession } from "next-auth/react";
import { ExtendedIngredients, RecipeObject } from "../_types/RecipeTypes";

function useRequiredIngredients() {
  const queryclient = useQueryClient();
  const session = useSession();
  const userId = session.data?.user?.id;
  const { data: IngredientData } = useQuery({
    queryFn: () => getUpcomingIngredients(Number(userId)),
    queryKey: ["upComingIngredients"],
    staleTime: Infinity,
  });
  const requiredIngredientsList = groupRecipesById(
    IngredientData || [],
    Number(userId),
  );

  const { mutate: removeUpcomingIngredient } = useMutation({
    mutationFn: (id: number) => {
      if (!userId) throw new Error("userId undefined ");
      return removeUpcomingIngredientItem(id, Number(userId));
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["upComingIngredients"] });
    },
  });
  return { removeUpcomingIngredient, requiredIngredientsList, IngredientData };
}

export default useRequiredIngredients;

function groupRecipesById(
  data: {
    id: number;
    recipeId: number;
    bitebytesRecipes: RecipeObject;
    extendedIngredients: ExtendedIngredients;
  }[],
  userId: number,
) {
  return Object.values(
    data.reduce(
      (
        acc: {
          [key: number]: {
            recipeId: number;
            title: string;
            id: number;
            extendedIngredients: ExtendedIngredients[];
          };
        },
        item,
      ) => {
        const { recipeId, bitebytesRecipes, extendedIngredients, id } = item;

        if (!acc[recipeId]) {
          acc[recipeId] = {
            recipeId,
            id,
            title: bitebytesRecipes.title,
            extendedIngredients: [],
          };
        }
        acc[recipeId].extendedIngredients.push({
          ...extendedIngredients,
          uniqueIngredientId: id,
          userId: Number(userId),
        });
        return acc;
      },
      {},
    ),
  );
}
