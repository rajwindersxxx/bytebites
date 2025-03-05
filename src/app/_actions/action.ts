"use server";
import { simulateApiRequest } from "../_helper/helper";
import { aiOutputToObject, makeAQuestion } from "../_lib/apiFunctions";
import { askAi } from "../_servers/googleAiApi";
import bcrypt from "bcrypt";
import {
  getRandomRecipes,
  getRecipeByIngredients,
  getRecipeDetails,
  getSearchedRecipe,
  getSimilarRecipes,
} from "../_servers/foodApi";

// mock data
import { USE_API } from "../_config/foodApiConfig";
import { AiResponseSample } from "../_data/AiDataSamples";
import {
  recipeData,
  recipeDetails,
  recipeSearchBased,
  searchRecipe,
  similarRecipe,
} from "../_data/dataSamples";
import {
  AddMealPlanningToDB,
  addRemoveLikedRecipeDB,
  addRemoveSavedRecipeDB,
  createAUserDB,
  getIngredientsFormDB,
  getLikedRecipesDB,
  getMealPlanningFromDB,
  getSavedRecipeSDB,
} from "../_servers/supabaseApi";
import { signIn } from "../_lib/Auth";
import { MealPlanning } from "../types/FormData";

interface Recipe {
  id: number;
  image: string;
  title: string;
  readyInMinutes: number;
  servings: number;
  vegetarian?: boolean;
  pricePerServing?: number;
  veryPopular?: boolean;
  extendedIngredients?: unknown[];
  baseUrlImage?: string;
  searchParams: { search: string };
}
export async function getSearchedRecipeData(
  recipeName: string,
  offset: number,
) {
  let data;
  if (USE_API) {
    data = await getSearchedRecipe(recipeName, offset);
  } else {
    data = await simulateApiRequest(searchRecipe);
  }
  return data;
}
export async function getRandomRecipeData(): Promise<Recipe[]> {
  let data;
  if (USE_API) {
    const { recipes: recipeArray }: { recipes: [] } =
      await getRandomRecipes(12);
    data = recipeArray;
  } else {
    data = await simulateApiRequest(recipeData);
  }
  return data as Recipe[];
}
export async function getRecipeDetailsData(id: number) {
  let data;
  if (USE_API) {
    data = await getRecipeDetails(id);
  } else {
    data = await simulateApiRequest(recipeDetails[0]);
  }
  return data;
}
export async function getRecipeByIngredientsData(
  ingredients: { name: string }[],
) {
  let data;
  if (USE_API) {
    const ingredient = ingredients.map((item) => item.name.trim()).join(",");
    data = await getRecipeByIngredients(ingredient);
  } else {
    data = await simulateApiRequest(recipeSearchBased);
  }
  return data;
}
export async function makeARecipe(data: {
  ingredient: {
    value: string;
  }[];
}) {
  const ingredients = data.ingredient.map((item) => item.value).join(", ");
  if (!ingredients) return { error: "Recipe ingredient are required" };
  let generatedAIData;
  if (USE_API) {
    generatedAIData = await askAi(makeAQuestion(ingredients));
  } else {
    generatedAIData = (await simulateApiRequest(AiResponseSample)) as string;
  }
  const errorSplit = generatedAIData.split("__");
  if (errorSplit[1]) {
    return { error: errorSplit[1] }; // Or another appropriate status code
  }
  const generatedRecipe = aiOutputToObject(generatedAIData);
  return generatedRecipe;
}
export async function getSimilarRecipesData(id: number) {
  let data;
  if (USE_API) {
    data = await getSimilarRecipes(id);
  } else {
    data = similarRecipe;
  }
  return data;
}

const saltRounds = 10;
export async function signUpUser(formData: {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}) {
  const { email, password, confirmPassword, username } = formData;
  if (!email || !password || !confirmPassword || !username)
    return "please enter all filed ";
  if (password !== confirmPassword) return { error: "password do not match " };
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  const userData = { email: email, password: hash, username: username };
  const data = await createAUserDB(userData);
  return data;
}
import { CredentialsSignin } from "next-auth";

export async function loginUser(formData: { email: string; password: string }) {
  try {
    const res = await signIn("credentials", { ...formData, redirect: false });

    if (!res) {
      throw new Error("Something went wrong. Please try again.");
    }

    if (res.error) {
      throw new CredentialsSignin(res.error); // ✅ Properly throwing CredentialsSignin error
    }

    return res; // ✅ Success
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      throw new Error("Invalid email or password"); // ✅ Catch specific error
    }
    throw new Error("Login failed. Please try again later.");
  }
}


// database actions
export async function addRemoveSavedRecipe(
  recipeId: number,
  userId: number,
  remove: boolean | undefined,
) {
  if (remove === undefined) throw new Error("Value is not boolean");
  return await addRemoveSavedRecipeDB(recipeId, userId, remove);
}
export async function addRemoveLikedRecipe(
  recipeId: number,
  userId: number,
  remove: boolean | undefined,
) {
  if (remove === undefined) throw new Error("Value is not boolean");
  return await addRemoveLikedRecipeDB(recipeId, userId, remove);
}
// get recipe data
export async function getSavedRecipes(userId: number) {
  return await getSavedRecipeSDB(userId);
}
export async function getLikedRecipes(userId: number) {
  return await getLikedRecipesDB(userId);
}

export async function getSavedRecipeIngredients(recipeId: number) {
  return await getIngredientsFormDB(recipeId);
}
// meal planning
export async function getMealPlannings(userId: number) {
  return await getMealPlanningFromDB(userId);
}
export async function addMealPlanning(mealObject: MealPlanning) {
  return await AddMealPlanningToDB(mealObject);
}
