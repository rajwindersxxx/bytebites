import { RecipeObject } from "@/app/_types/RecipeTypes";
import { supabase } from "./supabase";
import { getUserID } from "@/app/_helper/helper";

export async function createUserShoppingList(inputData: RecipeObject[]) {
  const userId = await getUserID();
  if (!userId) throw new Error("your need to login");
  await clearShoppingListDB();
  const { data, error } = await supabase
    .from("userIngredientList")
    .insert(inputData);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
export async function getUserShoppingListDB() {
  const userId = await getUserID();
  if (!userId) throw new Error("your need to login");
  const { data, error } = await supabase
    .from("userIngredientList")
    .select("*")
    .eq("userId", userId)
    .order("id", { ascending: false });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
export async function removeShoppingListItemDB(IngredientId: number) {
  const userId = await getUserID();
  if (!userId) throw new Error("your need to login");
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
  PurchasedStatus: boolean,
) {
  const userId = await getUserID();
  if(!userId) throw new Error('your need to login')
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
export async function clearShoppingListDB() {
  const userId = await getUserID();
  if(!userId) throw new Error('your need to login')
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
export async function checkAllItemsDB() {
  const userId = await getUserID();
  if(!userId) throw new Error('your need to login')
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
