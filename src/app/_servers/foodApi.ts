import { FOOD_URL, SEARCH_RESULTS_COUNT } from "../_config/foodApiConfig";
import { addRecipeToDB } from "./supabaseApi";
const apiKey = process.env.FOOD_API_KEY;

export async function getSearchedRecipe(recipeName: string, offset: number) {
  try {
    const res = await fetch(
      `${FOOD_URL}/recipes/complexSearch?apiKey=${apiKey}&query=${recipeName}&offset=${offset}&&number=${SEARCH_RESULTS_COUNT}`,
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
}
export async function getRandomRecipes(count: number) {
  try {
    const res = await fetch(
      `${FOOD_URL}/recipes/random?apiKey=${apiKey}&number=${count}`,
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
}
export async function getRecipeDetails(id: number) {
  try {
    const res = await fetch(
      `${FOOD_URL}/recipes/${id}/information?apiKey=${apiKey}`,
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    // this will add recipe to database when USER VIEW
    await addRecipeToDB(data)
    return data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
}
export async function getSimilarRecipes(id: number) {
  try {
    const res = await fetch(
      `${FOOD_URL}/recipes/${id}/similar?apiKey=${apiKey}`,
    );
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
}
export async function getRecipeByIngredients(ingredients: string) {
  try {
    const res = await fetch(
      `${FOOD_URL}/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&number=10`,
    );
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
}
