import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "../_actions/userActions";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useShoppingData } from "../_context/ShoppingListContext";
import { useState } from "react";

type formData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
function useUserAuth() {
  const [error, setError] = useState<boolean | string>(false);

  const { clearLocalStorageCart } = useShoppingData();
  const { update } = useSession();
  const router = useRouter();

  const { mutate: userSignIn, isPending: isSignPending } = useMutation({
    mutationFn: (formData: formData) =>
      signIn("credentials", { ...formData, redirect: false }),
    onSuccess: async (output) => {
      if (output?.error) return setError("invalid Email or Password");
      router.replace("/");
      await update(); //its update session after redirecting
      setError(false);
    },
    onError: (error: { message: string }) => {
      console.error("Login error:", error);
    },
  });

  const { mutate: userSignUp, isPending: isSignUpPending } = useMutation({
    mutationFn: async (formData: formData) => {
      const output = await signUpUser(formData);
      return { formData, output };
    },
    onError: (error: unknown) => {
      console.error("Signup error:", error);
    },
    onSuccess: async ({ formData, output }) => {
      if (output?.error) return setError(output.error);
      signIn("credentials", { formData, redirect: false });
      router.replace("/");
      await update();
    },
  });
  const { mutate: userSignOut } = useMutation({
    mutationFn: () => signOut({ redirect: false }),
    onSuccess: async () => {
      clearLocalStorageCart();
      router.replace("/");
      await update();
    },
  });
  return {
    userSignUp,
    userSignIn,
    isSignPending,
    userSignOut,
    isSignUpPending,
    error,
  };
}

export default useUserAuth;
