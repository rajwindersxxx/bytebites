"use server";
import { simulateApiRequest } from "../_helper/helper";
import { aiOutputToObject, makeAQuestion } from "../_lib/apiFunctions";
import { AiResponseSample } from "../_data/recipeAiData";
import { askAi } from "../_servers/googleAiApi";
import { SearchRecipeByIngredients } from "../_servers/foodApi";
import { recipeSearchBased } from "../_data/recipeIngdidientBased";

type Data = {
  ingredient: {
    value: string;
  }[];
};
export async function makeARecipe(data: Data) {
  const ingredients = data.ingredient.map((item) => item.value).join(", ");
  if (!ingredients) return { error: "Recipe ingredient are required" };
  // const generatedAIData = await askAi(makeAQuestion(ingredients));
  const generatedAIData = (await simulateApiRequest(
    AiResponseSample,
    2000,
  )) as string;
  const errorSplit = generatedAIData.split("__");
  if (errorSplit[1]) {
    return { error: errorSplit[1] }; // Or another appropriate status code
  }
  const generatedRecipe = aiOutputToObject(generatedAIData);
  return generatedRecipe;
}

export async function getSimilarRecipes(ingredients: { name: string }[]) {
  const ingredient = ingredients.map((item) => item.name.trim()).join(",");
  // const data = await SearchRecipeByIngredients(ingredient);
  const data = recipeSearchBased;

  return data;
}
