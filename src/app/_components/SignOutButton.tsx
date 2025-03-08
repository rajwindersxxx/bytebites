"use client";
import { HiOutlineLogout } from "react-icons/hi";
import { signOut, useSession } from "next-auth/react";
import { useShoppingData } from "../context/ShoppingListContext";

function SignOutButton() {
  const { update } = useSession();
  const { clearLocalStorageCart } = useShoppingData();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        clearLocalStorageCart();
        signOut({ callbackUrl: "/" });
        update();
      }}
    >
      <button
        type="submit"
        className="my-2 flex w-full items-center justify-start gap-2 p-2 transition-all hover:bg-natural-beige"
      >
        <HiOutlineLogout className="h-5 w-5" />
        SignOut
      </button>
    </form>
  );
}

export default SignOutButton;
