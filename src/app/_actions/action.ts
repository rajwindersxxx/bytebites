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
import { createAUser } from "../_servers/supabaseApi";
import { signIn } from "../_config/Auth";

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
export async function getRecipeDetailsData(id: string) {
  let data;
  if (USE_API) {
    data = await getRecipeDetails(Number(id));
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
  const data = await createAUser(userData);
  return data;
}
export async function loginUser(formData: { email: string; password: string }) {
  try {
    const res = (await signIn("credentials", formData)) as { error: string };
    if (res?.error) {
      return { message: res.error };
    }
    return res;
  } catch (error) {
    if ((error as { type: string }).type === "CredentialsSignin") {
      return { message: "Invalid email or password" };
    }
    return null;
  }
}
