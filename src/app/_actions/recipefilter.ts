import { getIngredientListDB } from "../_servers/supabase/recipeFilter";

export async function getIngredientList() {
  return await getIngredientListDB()
}
