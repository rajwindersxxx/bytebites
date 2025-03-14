import { RecipeObject } from "@/app/types/RecipeTypes";
import { getRecipeDetails } from "../foodApi";
import { addRecipeToDB } from "./recipes";
import { supabase } from "./supabase";

export async function getSavedRecipeSDB(userId: number) {
  if (!userId) return ["no userId provided"];
  const { data: savedRecipes, error } = await supabase
    .from("savedRecipes")
    .select(
      "*, bitebytesRecipes(id , title, image, readyInMinutes,extendedIngredients,servings, summary,cuisines, created_at)",
    )
    .eq("userId", userId);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return savedRecipes;
}

export async function getLikedRecipesDB(userId: number) {
  if (!userId) return ["no userId provided"];
  const { data: likedRecipes, error } = await supabase
    .from("likedRecipes")
    .select(
      "* , bitebytesRecipes(id, title , servings ,readyInMinutes,pricePerServing, image, created_at)",
    )
    .eq("userId", userId);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  const recipeData = likedRecipes.map((item) => item.bitebytesRecipes);
  return recipeData;
}
export async function addRemoveSavedRecipeDB(
  recipeId: number,
  userId: number,
  remove: boolean,
  recipeObject?: RecipeObject | null,
) {
  let query;
  if (remove === true) {
    query = supabase
      .from("savedRecipes")
      .delete()
      .eq("userId", userId)
      .eq("recipeId", recipeId);
  } else {
    let data;
    // if there is no recipeId , we insert our own object
    if (!recipeId)
      data = { ...recipeObject, id: Math.ceil(Math.random() * 100000) };
    else data = await getRecipeDetails(recipeId);
    await addRecipeToDB(data);
    query = supabase
      .from("savedRecipes")
      .insert([{ recipeId: data.id, userId }])
      .select()
      .single();
  }
  const { data, error } = await query;

  if (error) {
    if (error.code === "23503") {
      return recipeObject;
    }
    console.error(error);

    throw new Error(error.message);
  }
  return data;
}
export async function addRemoveLikedRecipeDB(
  recipeId: number,
  userId: number,
  remove: boolean,
  recipeObject?: RecipeObject | null,
) {
  let query;
  if (remove === true) {
    query = supabase
      .from("likedRecipes")
      .delete()
      .eq("userId", userId)
      .eq("recipeId", recipeId);
  } else {
    let data;
    if (!recipeId)
      data = { ...recipeObject, id: Math.ceil(Math.random() * 100000) };
    else data = await getRecipeDetails(recipeId);
    await addRecipeToDB(data);
    query = supabase
      .from("likedRecipes")
      .insert([{ recipeId: data.id, userId }]);
  }
  const { data, error } = await query;
  if (error) {
    if (error.code === "23503") {
      return recipeObject;
    }
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
