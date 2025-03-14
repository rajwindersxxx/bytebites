"use server";
import { CredentialsSignin } from "next-auth";
import { generateHash } from "../_helper/helper";
import { signIn } from "../_lib/Auth";
import {
  createAUserDB,
  UpdateUserDB,
  changeUserPasswordDB,
} from "../_servers/supabase/users";
import { UpdateProfileForm, UpdatePasswordForm } from "../types/FormData";

export async function signUpUser(formData: {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}) {
  const { email, password, confirmPassword, username } = formData;
  if (!email || !password || !confirmPassword || !username)
    return "please enter all filed ";
  if (password !== confirmPassword) return { error: "password do not match " };
  const hash = await generateHash(password);
  const userData = { email: email, password: hash, username: username };
  const data = await createAUserDB(userData);
  return data;
}

export async function loginUser(formData: { email: string; password: string }) {
  try {
    const res = await signIn("credentials", { ...formData, redirect: false });
    if (!res) throw new Error("Something went wrong. Please try again.");
    if (res.error) throw new CredentialsSignin(res.error);
    return res;
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      throw new Error("Invalid email or password");
    }
    throw new Error("Login failed. Please try again later.");
  }
}
export async function updateUser(data: UpdateProfileForm) {
  return await UpdateUserDB(data);
}
export async function changePassword(
  inputData: UpdatePasswordForm,
  userId: number,
) {
  return await changeUserPasswordDB(inputData, userId);
}
