"use server";
import { RANDOM_RECIPE_COUNT, USE_API } from "../_config/foodApiConfig";
import { BUCKET_URL_AI } from "../_config/supabaseConfig";
import {
  recipeData,
  recipeDetails,
  recipeSearchBased,
  sampleAIrecipe,
  similarRecipe,
} from "../_data/dataSamples";
import { simulateApiRequest } from "../_helper/helper";
import { makeAQuestion, aiOutputToObject } from "../_lib/apiFunctions";
import { auth } from "../_lib/Auth";
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
import { RecipeObject, SearchData } from "../_types/RecipeTypes";

export async function getSearchedRecipeData({
  query,
  searchObject,
  filterObject,
  offSet,
}: SearchData) {
  const complexQuery = toQueryString(query, searchObject, filterObject);
  const data = await getSearchedRecipe(complexQuery, offSet);
  return data;
}

export async function getRandomRecipeData(): Promise<RecipeObject[]> {
  if (!USE_API) return (await simulateApiRequest(recipeData)) as RecipeObject[];
  return await getRandomRecipes(RANDOM_RECIPE_COUNT);
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
      data = await simulateApiRequest(recipeDetails[0]);
    }
  }
  return data;
}

export async function getRecipeByIngredientsData(
  ingredients: { name: string }[],
) {
  if (!USE_API) return await simulateApiRequest(recipeSearchBased);
  const ingredient = ingredients.map((item) => item.name.trim()).join(",");
  return await getRecipeByIngredients(ingredient);
}

export async function getSimilarRecipesData(id: number) {
  if (!USE_API) return similarRecipe;
  return await getSimilarRecipes(id);
}
// todo: Error handling is missing
export async function makeARecipe(data: {
  ingredient: {
    value: string;
  }[];
}) {
  const session = await auth();
  if(!session?.user) throw new Error('You need to login')
  const ingredients = data.ingredient.map((item) => item.value).join(", ");
  if (!ingredients) return { error: "Recipe ingredient are required" };
  if (!USE_API) return await simulateApiRequest(sampleAIrecipe);

  const generatedAIData = await askAi(makeAQuestion(ingredients));
  const errorSplit = generatedAIData.split("__");
  if (errorSplit[1]) {
    return { error: errorSplit[1] }; // Or another appropriate status code
  }
  const generatedRecipe = aiOutputToObject(generatedAIData);
  if (!generatedRecipe?.title) throw new Error("Failed to generate recipe ");
  const generatedRecipeImage = await generateAiImage(generatedRecipe.title);
  const imagePath = await uploadAIimage(
    generatedRecipeImage,
    generatedRecipe.id.toString(),
  );
  const recipeData = {
    ...generatedRecipe,
    image: `${BUCKET_URL_AI}/${imagePath}`,
  };
  return recipeData;
}

/**
 *this function convert the incoming filter to
 * @param query accept value as string
 * @param searchObject accept ingredients as set eg {string,..}
 * @param filterObject accepts filterObject e.g {cuisines":[string],diet:[],excludeIngredients:[]}
 * @returns URL endpoint e.g  &query=''&cuisines=string1,string2&......
 */
function toQueryString(
  query: string,
  searchObject: Set<string>,
  filterObject: Record<string, string[]>,
): string {
  let queryString = "";
  queryString += `&query=${query.toLowerCase()}`;
  if (searchObject.size > 0) {
    queryString += `&includeIngredients=${[...searchObject]
      .map((ingredient) => ingredient.toLowerCase())
      .join(",")}`;
  }
  for (const [key, value] of Object.entries(filterObject)) {
    if (value.length > 0) {
      queryString += `&${key.toLowerCase()}=${value
        .map((item) => item.toLowerCase())
        .join(",")}`;
    }
  }
  return queryString;
}
