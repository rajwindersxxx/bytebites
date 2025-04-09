"use server";
import { getUserID } from "@/app/_helper/helper";
import { supabase } from "./supabase";

export async function uploadAIimage(buffer: Buffer, imageName: string) {
  const userId = await getUserID();
  if (!userId) throw new Error("You Need to Login");
  const { data, error } = await supabase.storage
    .from("generatedimages")
    .upload(`${imageName}.png`, buffer, {
      contentType: "image/png",
      upsert: true,
    });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data.path;
}
