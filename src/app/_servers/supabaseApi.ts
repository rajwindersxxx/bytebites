import { BUCKET_URL } from "../_config/supabaseConfig";
import { comparePassword, generateHash } from "../_helper/helper";
import {
  MealPlanning,
  UpdatePasswordForm,
  UpdateProfileForm,
} from "../types/FormData";
import { RecipeObject } from "../types/RecipeTypes";
import { getRecipeDetails } from "./foodApi";
import { supabase } from "./supabase";
// User MANAGEMENT
export async function getUserDB(email: string) {
  const { data, error } = await supabase
    .from("bitebytesUser")
    .select()
    .eq("email", email);
  return { data, error };
}
export async function getUserByIdDB(userId: number) {
  const { data, error } = await supabase
    .from("bitebytesUser")
    .select()
    .eq("id", userId)
    .single();
  return { data, error };
}
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
export async function UpdateUserDB(userData: UpdateProfileForm) {
  let inputObject: { username: string; image?: string } = {
    username: userData.username,
  };
  const image = `${BUCKET_URL}/${userData.file[0]?.name}`;
  if (userData.file) {
    inputObject = { ...inputObject, image };
  }
  const { data, error } = await supabase
    .from("bitebytesUser")
    .update([inputObject])
    .eq("id", userData.id)
    .select();
  if (userData.file) {
    const {
      error,
    }: { error: { statusCode?: string; message: string } | undefined | null } =
      await supabase.storage
        .from("avatarsBiteBytes")
        .upload(image.split("//")[2], userData.file[0] as File);
    if (error?.statusCode === "409") {
      return error?.message;
    } else {
      console.error(error);
      throw new Error("something went wrong");
    }
  }
  if (error) {
    console.error(error);
    throw new Error("something went wrong");
  }
  return data;
}
export async function updatePasswordDB(password: string, userId: number) {
  const { data, error } = await supabase
    .from("bitebytesUser")
    .update([{ password: password }])
    .eq("id", userId);
  if (error) {
    console.error(error);
    throw new Error("something went wrong");
  }
  return data;
}

// RECIPE MANAGEMENT
export async function getRecipeFormDB(recipeId: number) {
  console.log('recipe got from database ')
  const { data, error } = await supabase
    .from("bitebytesRecipes")
    .select()
    .eq("id", Number(recipeId));
  const recipeData = data && data[0] ? data[0] : null;
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return { recipeData, error };
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
      console.error(error);
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
    .select(
      "* , bitebytesRecipes(id, title , servings ,readyInMinutes,pricePerServing, image)",
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
  recipeObject?: RecipeObject |null,
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
      .insert([{ recipeId: data.id, userId }]);
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
    // if there is no recipeId , we insert our own object
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
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
//  meal planning

export async function getMealPlanningFromDB(userId: number) {
  const { data, error } = await supabase
    .from("mealPlanning")
    .select("*")
    .eq("userId", userId);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
export async function AddMealPlanningToDB(mealObject: MealPlanning) {
  const { data, error } = await supabase
    .from("mealPlanning")
    .insert([mealObject])
    .select();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
export async function removeMealPlanningFromDB(
  userId: number,
  mealType: string,
  date: Date,
) {
  const { data, error } = await supabase
    .from("mealPlanning")
    .delete()
    .eq("userId", userId)
    .eq("mealType", mealType)
    .eq("date", date);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
export async function changeUserPasswordDB(
  inputData: UpdatePasswordForm,
  userId: number,
) {
  const { data: userData } = await getUserByIdDB(userId);
  const match = await comparePassword(
    userData.password,
    inputData.currentPassword,
  );
  if (match) {
    const hash = await generateHash(inputData.newPassword);
    const data = await updatePasswordDB(hash, userId);
    return data;
  } else {
    throw new Error("Password does not match");
  }
}

export async function createUserShoppingList(inputData: RecipeObject[]) {
  const { data, error } = await supabase
    .from("userIngredientList")
    .insert(inputData);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
export async function getUserShoppingList(UserId: number) {
  const { data, error } = await supabase
    .from("userIngredientList")
    .select("*")
    .eq("userId", UserId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
