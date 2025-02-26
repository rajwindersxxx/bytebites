import { supabase } from "./supabase";

export async function createAUser(userData: {
  email: string;
  password: string;
  username: string;
}) {
  const { data, error } = await supabase
    .from("bitebytesUser")
    .insert([userData])
    .select();
  return { data, error };
}
export async function getUser(email: string) {
  const { data, error } = await supabase
    .from("bitebytesUser")
    .select()
    .eq("email", email);
  return { data, error };
}
export async function addRecipe(recipeObject: unknown) {
  const { data, error } = await supabase
    .from("bitebytesRecipes")
    .insert([recipeObject]);
  return { data, error };
}
