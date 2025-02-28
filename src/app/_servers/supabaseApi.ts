import { getRecipeDetails } from "./foodApi";
import { supabase } from "./supabase";

export async function createAUserDB(userData: {
  email: string;
  password: string;
  username: string;
}) {
  const { data, error } = await supabase
    .from("bitebytesUser")
    .insert([userData])
    .select();
  return { data, error };
}
export async function getUserDB(email: string) {
  const { data, error } = await supabase
    .from("bitebytesUser")
    .select()
    .eq("email", email);
  return { data, error };
}
// Read database
export async function addRecipeToDB(recipeObject: unknown) {
  const { data, error } = await supabase
    .from("bitebytesRecipes")
    .insert([recipeObject])
    .select();
  if (error) {
    if (error.code !== "23505") {
      throw new Error(error.message);
    }
  }

  return { data, error };
}
export async function getRecipeFormDB(recipeId: string) {
  const { data, error } = await supabase
    .from("bitebytesRecipes")
    .select()
    .eq("id", Number(recipeId));
  const recipeData = data && data[0] ? data[0] : null;
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return { data: recipeData, error };
}
// mutate database
export async function getSavedRecipeSDB(userId: number) {
  if (!userId) return ["no userId provided"];
  const { data: savedRecipes, error } = await supabase
    .from("savedRecipes")
    .select('*, bitebytesRecipes(id , title, image, readyInMinutes,extendedIngredients,servings, summary)')
    .eq("userId", userId);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return savedRecipes;
}
export async function getDetailedSavedRecipesDB(userId: number){
  if (!userId) return ["no userId provided"];
  const { data: savedRecipes, error } = await supabase
    .from("savedRecipes")
    .select('* , bitebytesRecipes(*)')
    .eq("userId", userId);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return savedRecipes[0].bitebytesRecipes;
}
export async function getLikedRecipesDB(userId: number) {
  if (!userId) return ["no userId provided"];
  const { data: likedRecipes, error } = await supabase
    .from("likedRecipes")
    .select()
    .eq("userId", userId);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return likedRecipes;
}
export async function addRemoveSavedRecipeDB(
  recipeId: number,
  userId: number,
  remove: boolean,
) {
  let query;
  if (remove === true) {
    query = supabase
      .from("savedRecipes")
      .delete()
      .eq("userId", userId)
      .eq("recipeId", recipeId);
  } else {
    const data = await getRecipeDetails(recipeId);
    await addRecipeToDB(data);
    query = supabase.from("savedRecipes").insert([{ recipeId, userId }]);
  }
  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
export async function addRemoveLikedRecipeDB(
  recipeId: number,
  userId: number,
  remove: boolean,
) {
  let query;
  if (remove === true) {
    query = supabase
      .from("likedRecipes")
      .delete()
      .eq("userId", userId)
      .eq("recipeId", recipeId);
  } else {
    query = supabase.from("likedRecipes").insert([{ recipeId, userId }]);

  }
  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
