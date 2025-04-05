import bcrypt from "bcrypt";
import {
  ExtendedIngredients,
  RecipeObject,
  UserShoppingList,
} from "../types/RecipeTypes";
import { endOfDay, isWithinInterval, startOfDay } from "date-fns";
export function simulateApiRequest(data: unknown) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
      return data;
    }, 500);
  });
}

export async function generateHash(password: string) {
  return await bcrypt.hash(password, 10);
}
export async function comparePassword(
  hashedPassword: string,
  plainPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
export function isDateToday(dateToCheck: string) {
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());
  return isWithinInterval(dateToCheck, { start: todayStart, end: todayEnd });
}
/**
 * this function merge ingredients  into single array including amount
 * @param recipeData recipes array must include  extendedIngredients[]
 * @param ingredientData list of ingredients
 * @returns  return new Array
 */
export function mergeIngredients(
  recipeData: RecipeObject[],
  ingredientData: ExtendedIngredients[],
) {
  const ingredientMap = new Map();
  recipeData.forEach((recipe) => {
    recipe.extendedIngredients.forEach((item) => {
      const { id, name, amount, unit, image, consistency } = item;
      if (ingredientMap.has(id)) {
        const existingIngredient = ingredientMap.get(id);
        existingIngredient.amount += amount;
      } else {
        ingredientMap.set(id, { id, name, amount, unit, image, consistency });
      }
    });
  });

  ingredientData.forEach((item) => {
    const { id, name, amount, unit, image, consistency } = item;
    if (ingredientMap.has(id)) {
      const existingIngredient = ingredientMap.get(id);
      existingIngredient.amount += amount;
    } else {
      ingredientMap.set(id, { id, name, amount, unit, image, consistency });
    }
  });
  return Array.from(ingredientMap.values());
}
/**
 * this function merge two arrays together,
 * @param oldArray old stored array
 * @param newArray new data need to mirage
 * @returns array of ingredients
 */
export function mergeUserShoppingList(
  oldArray: UserShoppingList[],
  newArray: UserShoppingList[],
) {
  const ingredientMap = new Map();
  oldArray.forEach((ingredient) => {
    if (ingredientMap.has(ingredient.id)) {
      const existingValue = ingredientMap.get(ingredient.id);
      existingValue.amount += ingredient.amount;
    } else {
      ingredientMap.set(ingredient.id, { ...ingredient });
    }
  });
  newArray.forEach((ingredient) => {
    if (ingredientMap.has(ingredient.id)) {
      const existingValue = ingredientMap.get(ingredient.id);
      existingValue.amount += ingredient.amount;
      existingValue.created_at = new Date();
      existingValue.isPurchased = false;
    } else {
      ingredientMap.set(ingredient.id, {
        ...ingredient,
        created_at: new Date(),
        isPurchased: false,
      });
    }
  });
  return Array.from(ingredientMap.values());
}
