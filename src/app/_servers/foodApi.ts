import {
  FOOD_URL,
  SEARCH_RESULTS_COUNT,
  USE_API,
} from "../_config/foodApiConfig";
import { searchRecipe } from "../_data/dataSamples";
import { simulateApiRequest } from "../_helper/helper";
import { addRecipeToDB } from "./supabase/recipes";
const apiKey = process.env.FOOD_API_KEY;

export async function getSearchedRecipe(
  complexSearchQuery: string,
  offset: number,
) {
  const url = `${FOOD_URL}/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=${"true"}&fillIngredients=${"true"}&number=${SEARCH_RESULTS_COUNT}&offset=${offset}${complexSearchQuery}`;
  if (!USE_API) return await simulateApiRequest(searchRecipe);

  try {
    const res = await fetch(url);
    if (res.status === 402) return { error: "API Limit Reached" };
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
}
export async function getRandomRecipes(count: number) {
  try {
    const res = await fetch(
      `${FOOD_URL}/recipes/random?apiKey=${apiKey}&number=${count}`,
    );
    if (res.status === 402) return { error: "API Limit Reached" };
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
}
export async function getRecipeDetails(id: number) {
  try {
    const res = await fetch(
      `${FOOD_URL}/recipes/${id}/information?apiKey=${apiKey}`,
    );
    if (res.status === 402) return { error: "API Limit Reached" };

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    // this will add recipe to database when USER VIEW
    await addRecipeToDB(data);
    console.log(data)
    return data;

  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
}
export async function getSimilarRecipes(id: number) {
  try {
    const res = await fetch(
      `${FOOD_URL}/recipes/${id}/similar?apiKey=${apiKey}`,
    );
    if (res.status === 402) return { error: "API Limit Reached" };

    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
}
export async function getRecipeByIngredients(ingredients: string) {
  try {
    const res = await fetch(
      `${FOOD_URL}/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&number=10`,
    );
    if (res.status === 402) return { error: "API Limit Reached" };

    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
}
