"use server";
import { MealPlanning } from "@/app/_types/FormData";
import { supabase } from "./supabase";
import { getIngredientsIdsFormDB } from "./recipes";
import { addDays, formatISO } from "date-fns";
import { getUserID } from "@/app/_helper/helper";

export async function getMealPlanningFromDB() {
  const userId = await getUserID();
  if (!userId) throw new Error("You need to Login");
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
  const userId = await getUserID();
  if (!userId) throw new Error("You need to Login");
  const mealDate = mealObject.date;
  const { data, error } = await supabase
    .from("mealPlanning")
    .insert([{ ...mealObject, userId }])
    .select();
  if (data) {
    const recipeId = data[0].recipeId;
    const ingredientUniqueIds = await getIngredientsIdsFormDB(recipeId);
    const newObject = ingredientUniqueIds.map((item) => {
      return {
        uniqueIngredientId: item.uniqueId,
        userId: userId,
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
export async function removeMealPlanningFromDB(mealType: string, date: Date) {
  const userId = await getUserID();
  if (!userId) throw new Error("You need to Login");
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

export async function getUpcomingIngredientsDB(dayCount: number = 3) {
  const userId = await getUserID();
  if (!userId) throw new Error("You need to Login");
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
export async function removeUpcomingIngredientItemDB(id: number) {
  const userId = await getUserID();
  if (!userId) throw new Error("You need to Login");
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
export async function getUpcomingIngredients(dayCount?: number) {
  return await getUpcomingIngredientsDB(dayCount);
}
export async function removeUpcomingIngredientItem(id: number) {
  return await removeUpcomingIngredientItemDB(id);
}
