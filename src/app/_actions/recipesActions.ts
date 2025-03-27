"use server";
import { RANDOM_RECIPE_COUNT, USE_API } from "../_config/foodApiConfig";
import { BUCKET_URL_AI } from "../_config/supabaseConfig";
import { AiResponseSample } from "../_data/AiDataSamples";
import {
  searchRecipe,
  recipeData,
  recipeDetails,
  recipeSearchBased,
  similarRecipe,
} from "../_data/dataSamples";
import { simulateApiRequest } from "../_helper/helper";
import { makeAQuestion, aiOutputToObject } from "../_lib/apiFunctions";
import { askAi, generateAiImage } from "../_servers/AIapi";
import {
  getSearchedRecipe,
  getRandomRecipes,
  getRecipeDetails,
  getRecipeByIngredients,
  getSimilarRecipes,
} from "../_servers/foodApi";
import { uploadAIimage } from "../_servers/supabase/bucket";
import { getRecipeFormDB } from "../_servers/supabase/recipes";
import { RecipeObject } from "../types/RecipeTypes";

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

export async function getRandomRecipeData(): Promise<RecipeObject[]> {
  let data;
  if (USE_API) {
    const { recipes: recipeArray }: { recipes: [] } =
      await getRandomRecipes(RANDOM_RECIPE_COUNT);
    data = recipeArray;
  } else {
    data = await simulateApiRequest(recipeData);
  }
  return data as RecipeObject[];
}
export async function getRecipeDetailsData(id: number) {
  let data;
  if (USE_API) {
    const { recipeData } = await getRecipeFormDB(id);
    data = recipeData;
    if (!data) {
      data = await getRecipeDetails(id);
    }
  } else {
    const { recipeData } = await getRecipeFormDB(id);
    data = recipeData;
    if (!data) {
      console.log("sample");
      data = await simulateApiRequest(recipeDetails[0]);
    }
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
  const generatedRecipe = await aiOutputToObject(generatedAIData);
  const generatedRecipeImage = await generateAiImage(generatedRecipe.title);
  const imagePath = await uploadAIimage(
    generatedRecipeImage,
    generatedRecipe.id,
  );
  const recipeData = {
    ...generatedRecipe,
    image: `${BUCKET_URL_AI}/${imagePath}`,
  };
  return recipeData;
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
