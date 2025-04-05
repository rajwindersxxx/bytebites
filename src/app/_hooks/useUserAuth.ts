import { useMutation } from "@tanstack/react-query";
import { loginUser, signUpUser } from "../_actions/userActions";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useShoppingData } from "../context/ShoppingListContext";

type formData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
function useUserAuth() {
  const { clearLocalStorageCart } = useShoppingData();
  const { update } = useSession();
  const router = useRouter();

  const { mutate: userSignIn, isPending: isSignPending } = useMutation({
    mutationFn: (formData: formData) => loginUser(formData),
    onSuccess: async () => {
      router.replace("/");
      await update(); //its update session after redirecting
    },
    onError: (error: { message: string }) => {
      console.error("Login error:", error);
    },
  });

  const { mutate: userSignUp, isPending: isSignUpPending } = useMutation({
    mutationFn: async (signupData: formData) => {
      await signUpUser(signupData);
      return signupData;
    },
    onError: (error: unknown) => {
      console.error("Signup error:", error);
    },
    onSuccess: async (formData) => {
      signIn("credentials", { formData, redirect: false });
      router.replace("/");
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
  };
}

export default useUserAuth;
