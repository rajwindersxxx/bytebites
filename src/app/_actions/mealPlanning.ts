"use server";
import {
  getMealPlanningFromDB,
  AddMealPlanningToDB,
  removeMealPlanningFromDB,
} from "../_servers/supabase/mealPlanning";
import { MealPlanning } from "../_types/FormData";

export async function getMealPlannings() {
  return await getMealPlanningFromDB();
}

export async function addMealPlanning(mealObject: MealPlanning) {
  return await AddMealPlanningToDB(mealObject);
}

export async function removeMealPlanning(
  mealType: string,
  date: Date,
) {
  return await removeMealPlanningFromDB(mealType, date);
}
