import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addMealPlanning,
  getMealPlannings,
  removeMealPlanning,
} from "../_actions/mealPlanning";
import toast from "react-hot-toast";
import { useModal } from "../_components/ui/Modal";
import { MealPlanning } from "../_types/FormData";
type RemoveMeal = {
  mealType: string;
  date: Date;
};
function useSavedMeals() {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  const {
    data: savedMeals = [],
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getMealPlannings(),
    queryKey: ["mealPlannings"],
    staleTime: Infinity,
  });
  const { mutate: removeMeal } = useMutation({
    mutationFn: ({ mealType, date }: RemoveMeal) =>
      removeMealPlanning( mealType, date),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mealPlannings"] });
      toast.success("meal has been removed ");
    },
  });
  const { mutate: handleMealPlanning, isPending: isPendingMeal } = useMutation({
    mutationFn: (mealObject: MealPlanning) => addMealPlanning(mealObject),
    onSuccess: () => {
      toast.success("Meal Added Successfully ");
      closeModal();
      queryClient.invalidateQueries({
        queryKey: ["mealPlannings"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return {
    removeMeal,
    handleMealPlanning,
    savedMeals,
    isLoading,
    error,
    isPendingMeal,
  };
}

export default useSavedMeals;
