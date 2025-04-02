import { RecipeObject } from "@/app/types/RecipeTypes";
import { supabase } from "./supabase";
export async function clearShoppingList() {
  return await clearShoppingList();
}
export async function createUserShoppingList(inputData: RecipeObject[]) {
  await clearShoppingListDB(inputData[0].userId!);
  const { data, error } = await supabase
    .from("userIngredientList")
    .insert(inputData);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
export async function getUserShoppingListDB(userId: number) {
  const { data, error } = await supabase
    .from("userIngredientList")
    .select("*")
    .eq("userId", userId)
    .order("created_at", { ascending: false });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
export async function removeShoppingListItemDB(
  IngredientId: number,
  userId: number,
) {
  const { data, error } = await supabase
    .from("userIngredientList")
    .delete()
    .eq("id", IngredientId)
    .eq("userId", userId);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
export async function updateShoppingItemStatesDB(
  IngredientId: number,
  userId: number,
  PurchasedStatus: boolean,
) {
  const { data, error } = await supabase
    .from("userIngredientList")
    .update({ isPurchased: PurchasedStatus })
    .eq("id", IngredientId)
    .eq("userId", userId);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
export async function clearShoppingListDB(userId: number) {
  const { data, error } = await supabase
    .from("userIngredientList")
    .delete()
    .eq("userId", userId);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
export async function checkAllItemsDB(userId: number) {
  const { data, error } = await supabase
    .from("userIngredientList")
    .update({ isPurchased: true })
    .eq("userId", userId);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
