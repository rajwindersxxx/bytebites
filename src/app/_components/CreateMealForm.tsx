import { DayPicker } from "react-day-picker";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { useModal } from "./Modal";
import { Controller, useForm } from "react-hook-form";
import { RecipeObject } from "../types/RecipeTypes";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import useSavedMeals from "../_hooks/useSavedMeals";
import RadioButton from "./RadioButton";
interface props {
  recipeData: RecipeObject;
}
function CreateMealForm({ recipeData }: props) {
  const { id, title } = recipeData;
  const { closeModal } = useModal();
  const session = useSession();
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<{
    date: string;
    mealType: string;
  }>();
  const { date: selectedDate } = watch();

  const { savedMeals, handleMealPlanning } = useSavedMeals();
  const reservedMeals: string[] = reservedMealsData(selectedDate, savedMeals);

  function handleFromSubmit(data: { date: string; mealType: string }) {
    if (!session.data?.user) return toast.error("You need to LogIn");
    const MealData = {
      mealType: data.mealType,
      recipeId: id,
      date: new Date(data.date).toLocaleDateString("en-CA"),
      title,
      userId: Number(session.data?.user?.id),
    };
    handleMealPlanning(MealData, {
      onSuccess: () => {
        reset();
      },
    });
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
                <p className="text-center text-red-500">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </div>
      <div className="flex flex-col justify-between gap-4 p-4">
        <h3 className="text-center text-2xl capitalize">select one </h3>
        <div className="flex flex-col items-center gap-4 p-8">
          {reservedMeals?.includes("breakfast") || (
            <RadioButton
              id="mealType1"
              value="breakfast"
              {...register("mealType", {
                required: "Please choose attest one filed",
              })}
            >
              BreakFast
            </RadioButton>
          )}
          {reservedMeals?.includes("lunch") || (
            <RadioButton
              id="mealType2"
              value="lunch"
              {...register("mealType", {
                required: "Please choose attest one filed",
              })}
            >
              Lunch
            </RadioButton>
          )}
          {reservedMeals?.includes("dinner") || (
            <RadioButton
              id="mealType3"
              value="dinner"
              {...register("mealType", {
                required: "Please choose attest one filed",
              })}
            >
              Dinner
            </RadioButton>
          )}
          {errors.mealType && (
            <p className="text-center text-red-500">
              {errors.mealType.message}
            </p>
          )}
          {reservedMeals?.length >= 3 && (
            <p className="w-full text-center">Meal date reserved</p>
          )}
        </div>
        <div className="flex justify-end gap-4">
          <SecondaryButton type="button" onClick={closeModal}>
            Cancel
          </SecondaryButton>
          {reservedMeals?.length < 3 && (
            <PrimaryButton disabled={reservedMeals?.length < 3} type="submit">
              Submit
            </PrimaryButton>
          )}
        </div>
      </div>
    </form>
  );
}

export default CreateMealForm;
function reservedMealsData(
  selectedDate: string,
  savedMeals: { date: string; mealType: string }[],
): string[] {
  if (!selectedDate) return [];
  return savedMeals.reduce<string[]>((acc, item) => {
    if (
      new Date(item.date).toLocaleDateString("en-CA") ===
      new Date(selectedDate).toLocaleDateString("en-CA")
    ) {
      acc.push(item.mealType);
    }
    return acc;
  }, []);
}
