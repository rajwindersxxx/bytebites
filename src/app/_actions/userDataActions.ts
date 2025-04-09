"use server";
import { getIngredientsFormDB } from "../_servers/supabase/recipes";
import {
  addRemoveSavedRecipeDB,
  addRemoveLikedRecipeDB,
  getSavedRecipeSDB,
  getLikedRecipesDB,
} from "../_servers/supabase/userData";
import { RecipeObject } from "../_types/RecipeTypes";

export async function addRemoveSavedRecipe(
  recipeId: number,
  remove: boolean | undefined,
  recipeObject?: RecipeObject | null,
) {
  delete recipeObject?.review;
  if (remove === undefined) throw new Error("Value is not boolean");
  return await addRemoveSavedRecipeDB(recipeId, remove, recipeObject);
}

export async function addRemoveLikedRecipe(
  recipeId: number,
  remove: boolean | undefined,
  recipeObject?: RecipeObject | null,
) {
  delete recipeObject?.review;
  if (remove === undefined) throw new Error("Value is not boolean");
  return await addRemoveLikedRecipeDB(recipeId, remove, recipeObject);
}

export async function getSavedRecipes() {
  return await getSavedRecipeSDB();
}

export async function getLikedRecipes() {
  return await getLikedRecipesDB();
}

export async function getSavedRecipeIngredients(recipeId: number) {
  return await getIngredientsFormDB(recipeId);
}
