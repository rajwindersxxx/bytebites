"use client";
import { HiOutlineLogout } from "react-icons/hi";
import useUserAuth from "@/app/_hooks/useUserAuth";

function SignOutButton() {
  const { userSignOut } = useUserAuth();
  return (
    <button
      className="my-2 flex w-full items-center justify-start gap-2 p-2 transition-all hover:bg-accent"
      onClick={() => userSignOut()}
    >
      <HiOutlineLogout className="h-5 w-5" />
      SignOut
    </button>
  );
}

export default SignOutButton;
