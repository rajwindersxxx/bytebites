import {
  UpdatePasswordForm,
  UpdateProfileForm,
  UserData,
} from "@/app/_types/FormData";
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
export async function getUserDataDB(
  requiredFields: string[],
): Promise<UserData> {
  const userId = await getUserID();
  if (!userId) throw new Error("You need to Login");
  const { data, error } = await supabase
    .from("bitebytesUser")
    .select(`${requiredFields.join(", ")}`)
    .eq("id", userId)
    .single();
  if (error) {
    console.error(error);
    throw new Error("something went wrong");
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Invalid user data received from the database");
  }
  return data as UserData;
}

export async function createAUserDB(userData: {
  email: string;
  password: string;
  username: string;
  image?: string;
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
  console.log(data[0]);
  return data[0];
}
export async function UpdateUserDB(userData: UpdateProfileForm) {
  const userId = await getUserID();
  if (!userId) throw new Error("You need to Login");

  const inputObject: Partial<UpdateProfileForm> = {};

  // Add fields to update only if they exist
  if (typeof userData.userPoints === 'number') {
    inputObject.userPoints = userData.userPoints;
  }

  if (userData.username) {
    inputObject.username = userData.username;
  }

  if (userData.file && userData.file?.length > 0) {
    const file = userData.file[0];
    const fileType = file.type;

    if (!fileType.startsWith("image/")) {
      throw new Error("The uploaded file is not an image.");
    }

    const imagePath = `${BUCKET_URL}/${file.name}`;
    inputObject.image = imagePath;
  }

  console.log("Updating user with:", inputObject);

  const { data, error } = await supabase
    .from("bitebytesUser")
    .update(inputObject)
    .eq("id", userId)  // FIXED: now using correct ID
    .select();

  if (error) {
    console.error("Database update error:", error);
    throw new Error("Failed to update user.");
  }

  // Optional: upload the image after successful DB update
  if (userData.file && userData.file?.length > 0) {
    const file = userData.file[0];
    const imagePath = `${BUCKET_URL}/${file.name}`.split("//")[1];

    const uploadRes = await supabase.storage
      .from("avatarsBiteBytes")
      .upload(imagePath, file);

    if (uploadRes.error) {
      if (uploadRes.error.message.includes("Duplicate")) {
        return uploadRes.error.message;
      } else {
        console.error("File upload error:", uploadRes.error);
        throw new Error("Failed to upload image.");
      }
    }
  }

  return data;
}

export async function updatePasswordDB(password: string) {
  const userId = await getUserID();
  if (!userId) throw new Error("You need to Login");
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
export async function changeUserPasswordDB(inputData: UpdatePasswordForm) {
  const userData = await getUserDataDB(["password"]);
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
// *temporary solution
export async function updateUserPointsDB(num: number) {
  const { userPoints } = await getUserDataDB(["userPoints"]);
  const newPoints = Number(userPoints) + num;
  await UpdateUserDB({
    userPoints: newPoints,
  });
}
