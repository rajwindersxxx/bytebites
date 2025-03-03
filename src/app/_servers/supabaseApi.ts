import { getRecipeDetails } from "./foodApi";
import { supabase } from "./supabase";
// User MANAGEMENT
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
// RECIPE MANAGEMENT
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
export async function getSavedRecipeSDB(userId: number) {
  if (!userId) return ["no userId provided"];
  const { data: savedRecipes, error } = await supabase
    .from("savedRecipes")
    .select(
      "*, bitebytesRecipes(id , title, image, readyInMinutes,extendedIngredients,servings, summary,cuisines)",
    )
    .eq("userId", userId);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return savedRecipes;
}
export async function addRecipeToDB(recipeObject: {
  extendedIngredients: unknown[];
  id: number;
}) {
  // add recipe to database
  const { data, error: recipeError } = await supabase
    .from("bitebytesRecipes")
    .insert([recipeObject])
    .select();
  // if row already exists no need duplicate
  if (data) {
    const { extendedIngredients } = recipeObject;
    const IngredientObject = (
      extendedIngredients as { recipeId: number }[]
    ).map((item) => {
      item.recipeId = recipeObject.id;
      return item;
    });
    const { error } = await supabase
      .from("extendedIngredients")
      .insert(IngredientObject);
    if (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
  // do not add Ingredient when recipe already exists
  if (recipeError && recipeError.code !== "23505") {
    console.error(recipeError);
    throw new Error(recipeError?.message);
  }
  return { data, error: recipeError };
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
  console.log(recipeId)
  const { data, error } = await supabase
    .from("extendedIngredients")
    .select()
    .eq("recipeId", recipeId);
  if (error) throw new Error(error.message);
  return data;
}
// USER RECIPE MANAGEMENT
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
