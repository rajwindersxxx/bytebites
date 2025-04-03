import { useQuery } from "@tanstack/react-query";
import { getSavedRecipeIngredients } from "../_actions/userDataActions";
import { useSearchParams } from "next/navigation";

export function useSavedIngredients() {
  const params = useSearchParams();
  const recipeId = params.get("recipeId");
  const {
    data: savedIngredients,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`ingredientList${recipeId}`],
    queryFn: () => getSavedRecipeIngredients(Number(recipeId)),
    staleTime: Infinity,
  });
  return { savedIngredients, isLoading, error };
}
