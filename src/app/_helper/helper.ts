import bcrypt from "bcrypt";
import { ExtendedIngredients, RecipeObject } from "../types/RecipeTypes";
import { endOfDay, isWithinInterval, startOfDay } from "date-fns";
export function simulateApiRequest(data: unknown) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
      return data;
    }, 0);
  });
}


export async function generateHash(password: string) {
  return await bcrypt.hash(password, 10);
}
export async function comparePassword(
  hashedPassword: string,
  plainPassword: string,
) {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  return match;
}
export function isDateToday(dateToCheck: string) {
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());
  return isWithinInterval(dateToCheck, { start: todayStart, end: todayEnd });
}
export function mergeIngredients(recipeData: RecipeObject[], ingredientData: ExtendedIngredients[]) {
  const ingredientMap = new Map();
  recipeData.forEach((recipe) => {
    recipe.extendedIngredients.forEach((item) => {
      const { id, name, amount, unit, image } = item;
      if (ingredientMap.has(id)) {
        const existingIngredient = ingredientMap.get(id);
        existingIngredient.amount += amount;
      } else {
        ingredientMap.set(id, { id, name, amount, unit, image });
      }
    });
  });

  // Process customIngredients
  ingredientData.forEach((item) => {
    const { id, name, amount, unit, image } = item;
    if (ingredientMap.has(id)) {
      const existingIngredient = ingredientMap.get(id);
      existingIngredient.amount += amount;
    } else {
      ingredientMap.set(id, { id, name, amount, unit, image });
    }
  });

  // Convert Map values to an array
  return Array.from(ingredientMap.values());
}
