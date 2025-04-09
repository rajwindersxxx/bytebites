"use server";
import { mergeIngredients, mergeUserShoppingList } from "../_helper/helper";
import {
  checkAllItemsDB,
  clearShoppingListDB,
  createUserShoppingList,
  getUserShoppingListDB,
  removeShoppingListItemDB,
  updateShoppingItemStatesDB,
} from "../_servers/supabase/shopping";
import {
  RecipeObject,
  ExtendedIngredients,
  UserShoppingList,
} from "../_types/RecipeTypes";

export async function makeAShoppingList(
  recipeData: RecipeObject[],
  ingredientData: ExtendedIngredients[],
  userId: number,
  oldIngredientData?: UserShoppingList[] | void,
) {
  let shoppingList = mergeIngredients(recipeData, ingredientData).map(
    (item) => {
      return { ...item, userId };
    },
  );
  if (oldIngredientData)
    shoppingList = mergeUserShoppingList(oldIngredientData, shoppingList);
  return await createUserShoppingList(shoppingList);
}

export async function removeShoppingListItem(
  ingredientId: number,
) {
  return await removeShoppingListItemDB(ingredientId);
}

export async function updateShoppingItemStates(
  IngredientId: number,
  purchasedStatus: boolean,
) {
  return await updateShoppingItemStatesDB(
    IngredientId,
    purchasedStatus,
  );
}
export async function getUserShoppingList() {
  return await getUserShoppingListDB();
}
export async function checkAllItems() {
  return await checkAllItemsDB();
}
export async function clearShoppingList() {
  return await clearShoppingListDB();
}
