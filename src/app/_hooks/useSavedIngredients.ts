import {  useQuery } from "@tanstack/react-query";
import { getSavedRecipeIngredients } from "../_actions/action";
import { useSearchParams } from "next/navigation";

export function useSavedIngredients() {
  const params = useSearchParams();
  const recipeId = params.get("recipeId");
  const {data: savedIngredients, isLoading, error } = useQuery({
    queryKey: [`ingredientList${recipeId}`],
    queryFn: () =>  getSavedRecipeIngredients(Number(recipeId)),
    staleTime: 1000 * 60 * 5,
  });
  return { savedIngredients, isLoading, error };
}

