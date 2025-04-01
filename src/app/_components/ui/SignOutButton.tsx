"use client";
import { HiOutlineLogout } from "react-icons/hi";
import { signOut, useSession } from "next-auth/react";
import { useShoppingData } from "@/app/context/ShoppingListContext";

function SignOutButton() {
  const { update } = useSession();
  const { clearLocalStorageCart } = useShoppingData();
  return (
    <button
      type="submit"
      className="my-2 flex w-full items-center justify-start gap-2 p-2 transition-all hover:bg-accent"
      onClick={() => {
        clearLocalStorageCart();
        update();
        signOut({ callbackUrl: "/" });
      }}
    >
      <HiOutlineLogout className="h-5 w-5" />
      SignOut
    </button>
  );
}

export default SignOutButton;
