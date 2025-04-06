import { RecipeObject } from "@/app/_types/RecipeTypes";
import { supabase } from "./supabase";

export async function getRecipeFormDB(recipeId: number) {
  const { data, error } = await supabase
    .from("bitebytesRecipes")
    .select()
    .eq("id", Number(recipeId));
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return { recipeData: data[0], error };
}

export async function addRecipeToDB(recipeObject: RecipeObject) {
  delete recipeObject.missedIngredients;
  const { extendedIngredients } = recipeObject;
  const { data, error: recipeError } = await supabase
    .from("bitebytesRecipes")
    .insert([recipeObject])
    .select();

  // if row already exists no need duplicate
  if (data) {
    const IngredientObject = extendedIngredients.map((item) => ({
      ...item,
      recipeId: recipeObject.id,
    }));
    const { error } = await supabase
      .from("extendedIngredients")
      .insert(IngredientObject);
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
  if (recipeError && recipeError.code !== "23505") {
    console.error(recipeError);
    throw new Error(recipeError?.message);
  }
  return data;
}

export async function getDetailedSavedRecipesDB(userId: number) {
  if (!userId) return ["no userId provided"];
  const { data: savedRecipes, error } = await supabase
    .from("savedRecipes")
    .select("* , bitebytesRecipes(*)")
    .eq("userId", userId);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return savedRecipes[0].bitebytesRecipes;
}
export async function getIngredientsFormDB(recipeId: number) {
  const { data, error } = await supabase
    .from("extendedIngredients")
    .select()
    .eq("recipeId", recipeId);
  if (error) throw new Error(error.message);
  return data;
}
export async function getIngredientsIdsFormDB(recipeId: number) {
  const { data, error } = await supabase
    .from("extendedIngredients")
    .select("uniqueId")
    .eq("recipeId", recipeId);
  if (error) throw new Error(error.message);
  return data;
}
