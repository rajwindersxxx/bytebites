import { UpdatePasswordForm, UpdateProfileForm } from "@/app/types/FormData";
import { supabase } from "./supabase";
import { BUCKET_URL } from "@/app/_config/supabaseConfig";
import { comparePassword, generateHash } from "@/app/_helper/helper";

export async function getUserDB(email: string) {
  const { data, error } = await supabase
    .from("bitebytesUser")
    .select()
    .eq("email", email);
  return { data, error };
}
export async function getUserByIdDB(userId: number) {
  const { data, error } = await supabase
    .from("bitebytesUser")
    .select()
    .eq("id", userId)
    .single();
  return { data, error };
}
export async function createAUserDB(userData: {
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
export async function UpdateUserDB(userData: UpdateProfileForm) {
  let inputObject: { username: string; image?: string } = {
    username: userData.username,
  };
  const image = `${BUCKET_URL}/${userData.file[0]?.name}`;
  if (userData.file.length > 0) {
    const fileType = userData.file[0].type;
    if (!fileType.startsWith("image/")) {
      throw new Error("The uploaded file is not an image.");
    }
    inputObject = { ...inputObject, image };
  }
  const { data, error } = await supabase
    .from("bitebytesUser")
    .update([inputObject])
    .eq("id", userData.id)
    .select();
  if (userData.file) {
    const {
      error,
    }: { error: { statusCode?: string; message: string } | undefined | null } =
      await supabase.storage
        .from("avatarsBiteBytes")
        .upload(image.split("//")[2], userData.file[0] as File);
    if (error?.statusCode === "409") {
      return error?.message;
    } else {
      console.error(error);
      throw new Error("something went wrong");
    }
  }
  if (error) {
    console.error(error);
    throw new Error("something went wrong");
  }
  return data;
}
export async function updatePasswordDB(password: string, userId: number) {
  const { data, error } = await supabase
    .from("bitebytesUser")
    .update([{ password: password }])
    .eq("id", userId);
  if (error) {
    console.error(error);
    throw new Error("something went wrong");
  }
  return data;
}
export async function changeUserPasswordDB(
  inputData: UpdatePasswordForm,
  userId: number,
) {
  const { data: userData } = await getUserByIdDB(userId);
  const match = await comparePassword(
    userData.password,
    inputData.currentPassword,
  );
  if (match) {
    const hash = await generateHash(inputData.newPassword);
    const data = await updatePasswordDB(hash, userId);
    return data;
  } else {
    throw new Error("Password does not match");
  }
}
