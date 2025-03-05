import { DayPicker } from "react-day-picker";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { useModal } from "./Modal";
import { Controller, useForm } from "react-hook-form";
import { RecipeObject } from "../types/RecipeTypes";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMealPlanning } from "../_actions/action";
import { MealPlanning } from "../types/FormData";
interface props {
  recipeData: RecipeObject;
}
function CreateMealForm({ recipeData }: props) {
  const { id, title } = recipeData;
  const { closeModal } = useModal();
  const session = useSession();
  const { register, handleSubmit, control, reset, formState: {errors} } = useForm<{
    date: string;
    mealType: string;
  }>();
  const queryClient = useQueryClient();
  const { mutate: handleMealPlanning } = useMutation({
    mutationFn: (mealObject: MealPlanning) => addMealPlanning(mealObject),
    onSuccess: () => {
      closeModal();
      reset();
      queryClient.invalidateQueries({
        queryKey: ["mealPlannings"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  function handleFromSubmit(data: { date: string; mealType: string }) {
    if (!session.data?.user) return;
    const MealData = {
      ...data,
      recipeId: id,
      title,
      userId: Number(session.data?.user?.id),
    };
    handleMealPlanning(MealData);
  }
  return (
    <form
      className="grid h-full grid-cols-2 gap-4"
      onSubmit={handleSubmit(handleFromSubmit)}
    >
      <div>
        <Controller
          name="date"
          control={control}
          rules={{ required: "Please select a date" }} // Add the required rule
          render={({ field, fieldState }) => (
            <>
              <DayPicker
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={field.onChange}
              />
              {fieldState.error && (
                <p className="text-red-500 text-center">{fieldState.error.message}</p>
              )}
            </>
          )}
        />
      </div>
      <div className="flex flex-col justify-between gap-4 p-4">
        <h3 className="text-2xl capitalize">select one </h3>
        <div className="flex flex-col items-start gap-4 p-8">
          <div className="flex items-center gap-1">
            <input
              type="radio"
              id="mealType1"
              value="breakfast"
              className="h-4 w-4"
              {...register("mealType", { required: 'Please choose attest one filed' , })}
            />
            <label htmlFor="mealType1" className="text-xl">
              Breakfast
            </label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="radio"
              id="mealType2"
              value="lunch"
              className="h-4 w-4"
              {...register("mealType", { required: 'Please choose attest one filed' , })}
            />
            <label htmlFor="mealType2" className="text-xl">
              Lunch
            </label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="radio"
              id="mealType3"
              value="dinner"
              className="h-4 w-4"
              {...register("mealType", { required: 'Please choose attest one filed' , })}
            />

            <label htmlFor="mealType3" className="text-xl">
              Dinner
            </label>
          </div>
          {errors.mealType && <p className="text-red-500 text-center">{errors.mealType.message}</p>}
        </div>
        <div className="flex justify-end gap-4">
          <SecondaryButton type="button" onClick={closeModal}>
            Cancel
          </SecondaryButton>
          <PrimaryButton type="submit">Submit</PrimaryButton>
        </div>
      </div>
    </form>
  );
}

export default CreateMealForm;
