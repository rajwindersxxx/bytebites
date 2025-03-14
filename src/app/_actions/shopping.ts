"use server";
import { mergeIngredients, mergeUserShoppingList } from "../_helper/helper";
import {
  createUserShoppingList,
  getUserShoppingListDB,
  removeShoppingListItemDB,
  updateShoppingItemStatesDB,
} from "../_servers/supabase/shopping";
import {
  RecipeObject,
  ExtendedIngredients,
  UserShoppingList,
} from "../types/RecipeTypes";

export async function makeAShoppingList(
  recipeData: RecipeObject[],
  ingredientData: ExtendedIngredients[],
  userId: number,
  oldIngredientData?: UserShoppingList[] | void,
) {
  console.log(recipeData, ingredientData, userId, oldIngredientData);
  let shoppingList;
  shoppingList = mergeIngredients(recipeData, ingredientData).map((item) => {
    return { ...item, userId };
  });
  if (oldIngredientData) {
    shoppingList = mergeUserShoppingList(oldIngredientData, shoppingList);
  }
  console.log(shoppingList);
  return await createUserShoppingList(shoppingList);
}
export async function getUserShoppingList(UserId: number) {
  return await getUserShoppingListDB(UserId);
}
export async function removeShoppingListItem(
  ingredientId: number,
  userId: number,
) {
  return await removeShoppingListItemDB(ingredientId, userId);
}

export async function updateShoppingItemStates(
  IngredientId: number,
  userId: number,
  purchasedStatus: boolean,
) {
  return await updateShoppingItemStatesDB(
    IngredientId,
    userId,
    purchasedStatus,
  );
}
