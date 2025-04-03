'use server'
import { MealPlanning } from "@/app/types/FormData";
import { supabase } from "./supabase";
import { getIngredientsIdsFormDB } from "./recipes";
import { addDays, formatISO } from "date-fns";

export async function getMealPlanningFromDB(userId: number) {
  const { data, error } = await supabase
    .from("mealPlanning")
    .select(
      "*, bitebytesRecipes(title, image ,readyInMinutes,servings,vegetarian )",
    )
    .eq("userId", userId);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
export async function AddMealPlanningToDB(mealObject: MealPlanning) {
  const mealDate = mealObject.date;
  const { data, error } = await supabase
    .from("mealPlanning")
    .insert([mealObject])
    .select();
  if (data) {
    const recipeId = data[0].recipeId;
    const ingredientUniqueIds = await getIngredientsIdsFormDB(recipeId);
    const newObject = ingredientUniqueIds.map((item) => {
      return {
        uniqueIngredientId: item.uniqueId,
        userId: mealObject.userId,
        recipeId: mealObject.recipeId,
        requiredDate: mealDate,
      };
    });
    const { error } = await supabase
      .from("requiredIngredients")
      .insert(newObject);
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
export async function removeMealPlanningFromDB(
  userId: number,
  mealType: string,
  date: Date,
) {
  const { data, error } = await supabase
    .from("mealPlanning")
    .delete()
    .eq("userId", userId)
    .eq("mealType", mealType)
    .eq("date", date);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function getUpcomingIngredientsDB(
  userId: number,
  dayCount: number = 3,
) {
  const today = formatISO(new Date(), { representation: "date" });
  const nextUpcomingDays = formatISO(addDays(new Date(), dayCount), {
    representation: "date",
  });
  const { data, error } = await supabase
    .from("requiredIngredients")
    .select(
      "*, bitebytesRecipes(title), extendedIngredients(id, name, amount, consistency, unit, image)",
    )
    .eq("userId", userId)
    .gte("requiredDate", today)
    .lte("requiredDate", nextUpcomingDays);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
export async function removeUpcomingIngredientItemDB(
  id: number,
  userId: number,
) {
  const { data, error } = await supabase
    .from("requiredIngredients")
    .delete()
    .eq("id", id)
    .eq("userId", userId);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
export async function getUpcomingIngredients(
  userId: number,
  dayCount?: number,
) {
  return await getUpcomingIngredientsDB(userId, dayCount);
}
export async function removeUpcomingIngredientItem(id: number, userId: number) {
  return await removeUpcomingIngredientItemDB(id, userId);
}
