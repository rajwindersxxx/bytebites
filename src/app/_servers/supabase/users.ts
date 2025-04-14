import { UpdatePasswordForm, UpdateProfileForm } from "@/app/_types/FormData";
import { supabase } from "./supabase";
import { BUCKET_URL } from "@/app/_config/supabaseConfig";
import { comparePassword, generateHash, getUserID } from "@/app/_helper/helper";

export async function getUserDB(email: string) {
  const { data, error } = await supabase
    .from("bitebytesUser")
    .select()
    .eq("email", email);

  if (error) {
    console.error(error);
    throw new Error("unable to fetch user");
  }
  return { data: data[0], error };
}
export async function getUserDataDB() {
  const userId = await getUserID();
  if(!userId) throw new Error('You need to Login')
  const { data, error } = await supabase
    .from("bitebytesUser")
    .select()
    .eq("id", userId)
    .single();
  if (error) {
    console.error(error);
    throw new Error("something went wrong");
  }
  return data;
}
export async function createAUserDB(userData: {
  email: string;
  password: string;
  username: string;
  image?: string
}) {
  const { data, error } = await supabase
    .from("bitebytesUser")
    .insert([userData])
    .select();
  if (error?.code === "23505") return { error: "User already Exists" };
  if (error) {
    console.error(error);
    throw new Error("Failed To Create User.");
  }
  console.log(data[0])
  return data[0];
}
export async function UpdateUserDB(userData: UpdateProfileForm) {
  const userId = await getUserID();
  if(!userId) throw new Error('You need to Login')
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
export async function updatePasswordDB(password: string) {
  const userId = await getUserID();
  if(!userId) throw new Error('You need to Login')
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
) {
  const userData = await getUserDataDB();
  const match = await comparePassword(
    userData.password,
    inputData.currentPassword,
  );
  if (match) {
    const hash = await generateHash(inputData.newPassword);
    const data = await updatePasswordDB(hash);
    return data;
  } else {
    throw new Error("Password does not match");
  }
}
