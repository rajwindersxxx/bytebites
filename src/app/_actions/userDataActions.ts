"use server";
import { getIngredientsFormDB } from "../_servers/supabase/recipes";
import {
  addRemoveSavedRecipeDB,
  addRemoveLikedRecipeDB,
  getSavedRecipeSDB,
  getLikedRecipesDB,
} from "../_servers/supabase/userData";
import { RecipeObject } from "../types/RecipeTypes";

export async function addRemoveSavedRecipe(
  recipeId: number,
  userId: number,
  remove: boolean | undefined,
  recipeObject?: RecipeObject | null,
) {
  delete recipeObject?.review;
  if (remove === undefined) throw new Error("Value is not boolean");
  return await addRemoveSavedRecipeDB(recipeId, userId, remove, recipeObject);
}

export async function addRemoveLikedRecipe(
  recipeId: number,
  userId: number,
  remove: boolean | undefined,
  recipeObject?: RecipeObject | null,
) {
  delete recipeObject?.review;
  if (remove === undefined) throw new Error("Value is not boolean");
  return await addRemoveLikedRecipeDB(recipeId, userId, remove, recipeObject);
}

export async function getSavedRecipes(userId: number) {
  return await getSavedRecipeSDB(userId);
}

export async function getLikedRecipes(userId: number) {
  return await getLikedRecipesDB(userId);
}

export async function getSavedRecipeIngredients(recipeId: number) {
  return await getIngredientsFormDB(recipeId);
}
