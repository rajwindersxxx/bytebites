import { useQuery } from "@tanstack/react-query";
import { getMealPlannings } from "../_actions/action";

function useSavedMeals(userId: number) {
  const {
    data: savedMeals = [],
    isLoading,
    error,
  } = useQuery({
    queryFn:() =>  getMealPlannings(userId),
    queryKey: ["mealPlannings"],
    staleTime: 1000 * 60 * 5,
  });
  return { savedMeals, isLoading, error };
}

export default useSavedMeals;
