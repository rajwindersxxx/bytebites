"use server";
import {
  getMealPlanningFromDB,
  AddMealPlanningToDB,
  removeMealPlanningFromDB,
} from "../_servers/supabase/mealPlanning";
import { MealPlanning } from "../types/FormData";

export async function getMealPlannings(userId: number) {
  return await getMealPlanningFromDB(userId);
}

export async function addMealPlanning(mealObject: MealPlanning) {
  return await AddMealPlanningToDB(mealObject);
}

export async function removeMealPlanning(
  userId: number,
  mealType: string,
  date: Date,
) {
  return await removeMealPlanningFromDB(userId, mealType, date);
}
