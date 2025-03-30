"use server";

import { supabase } from "./supabase";

export async function getIngredientListDB() {
  const { data, error } = await supabase
    .from("ingredientListForSearch")
    .select();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
