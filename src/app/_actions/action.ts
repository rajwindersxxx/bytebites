"use server";
import { simulateApiRequest } from "../_helper/helper";
import { aiOutputToObject, makeAQuestion } from "../_lib/apiFunctions";
import { askAi } from "../_servers/googleAiApi";
import {
  getRandomRecipes,
  SearchRecipeByIngredients,
} from "../_servers/foodApi";

// mock data
import { USE_API } from "../_config/foodApiConfig";
import { AiResponseSample } from "../_data/AiDataSamples";
import { recipeData, recipeSearchBased } from "../_data/dataSamples";


type Data = {
  ingredient: {
    value: string;
  }[];
};
export async function makeARecipe(data: Data) {
  const ingredients = data.ingredient.map((item) => item.value).join(", ");
  if (!ingredients) return { error: "Recipe ingredient are required" };
  let generatedAIData;
  if (USE_API) {
    generatedAIData = await askAi(makeAQuestion(ingredients));
  } else {
    generatedAIData = (await simulateApiRequest(
      AiResponseSample,
      2000,
    )) as string;
  }
  const errorSplit = generatedAIData.split("__");
  if (errorSplit[1]) {
    return { error: errorSplit[1] }; // Or another appropriate status code
  }
  const generatedRecipe = aiOutputToObject(generatedAIData);
  return generatedRecipe;
}

export async function getSimilarRecipes(ingredients: { name: string }[]) {
  let data;
  if (USE_API) {
    const ingredient = ingredients.map((item) => item.name.trim()).join(",");
    data = await SearchRecipeByIngredients(ingredient);
  } else {
    data = await simulateApiRequest(recipeSearchBased, 2000);
  }
  return data;
}

export async function getRandomRecipeData() {
  let data;
  if (USE_API) {
    const { recipes: recipeArray }: { recipes: [] } =
      await getRandomRecipes(12);
    data = recipeArray;
  } else {
    data = await simulateApiRequest(recipeData, 2000);
  }
  return data;
}
