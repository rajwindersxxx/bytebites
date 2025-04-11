// todo: login/signUp needs improvements
"use server";
import { generateHash } from "../_helper/helper";
import {
  createAUserDB,
  UpdateUserDB,
  changeUserPasswordDB,
  getUserDataDB,
} from "../_servers/supabase/users";
import {
  UpdateProfileForm,
  UpdatePasswordForm,
  SignUpForm,
} from "../_types/FormData";

export async function signUpUser(formData: SignUpForm) {
  const { email, password, confirmPassword, username } = formData;
  if (!email || !password || !confirmPassword || !username)
    return { error: "Please fill in all fields." };
  if (password !== confirmPassword) return { error: "Passwords do not match." };
  const hash = await generateHash(password);
  const userData = { email: email, password: hash, username: username };
  return await createAUserDB(userData);
}

export async function updateUser(data: UpdateProfileForm) {
  return await UpdateUserDB(data);
}

export async function changePassword(inputData: UpdatePasswordForm) {
  return await changeUserPasswordDB(inputData);
}
export async function getUserData() {
  return await getUserDataDB();
}
