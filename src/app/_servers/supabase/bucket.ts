'use server';
import { supabase } from "./supabase";

export async function uploadAIimage(buffer: Buffer, imageName: string) {
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
