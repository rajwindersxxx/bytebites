import { RecipeObject } from "@/app/_types/RecipeTypes";
import { addRecipeToDB } from "./recipes";
import { supabase } from "./supabase";
import { getRecipeDetailsData } from "@/app/_actions/recipesActions";
import { getUserID } from "@/app/_helper/helper";

export async function getSavedRecipeSDB() {
  const userId = await getUserID();
  if(!userId) throw new Error('you need to login')
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

export async function getLikedRecipesDB() {
  const userId = await getUserID();
  if(!userId) throw new Error('you need to login')
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
  return likedRecipes.map((item) => item.bitebytesRecipes);
}
export async function addRemoveSavedRecipeDB(
  recipeId: number,
  remove: boolean,
  recipeObject?: RecipeObject | null,
) {
  const userId = await getUserID();
  if (!userId) throw new Error("you need to login");
  let query;
  if (remove === true) {
    query = supabase
      .from("savedRecipes")
      .delete()
      .eq("userId", userId)
      .eq("recipeId", recipeId);
  } else {
    let data;
    if (recipeObject && !recipeObject.sourceUrl) data = recipeObject;
    else data = await getRecipeDetailsData(recipeId);
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
  remove: boolean,
  recipeObject?: RecipeObject | null,
) {
  const userId = await getUserID();
  if(!userId) throw new Error('you need to login')
  let query;
  if (remove === true) {
    query = supabase
      .from("likedRecipes")
      .delete()
      .eq("userId", userId)
      .eq("recipeId", recipeId);
  } else {
    let data;
    if (recipeObject && !recipeObject.sourceUrl) data = recipeObject;
    else data = await getRecipeDetailsData(recipeId);

    await addRecipeToDB(data);
    query = supabase
      .from("likedRecipes")
      .insert([{ recipeId: data.id, userId }]);
  }
  const { data, error } = await query;
  if (error) {
    if (error.code === "23503" || error.code === "23505") {
      return recipeObject;
    }
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
