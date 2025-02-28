import Link from "next/link";
import React from "react";
import { auth } from "../_lib/Auth";
import { HiOutlineLogin } from "react-icons/hi";

export default async function ProfilePanel() {
  const session = await auth();
  console.log(session?.user?.name)
  return (
    <div className="flex items-center gap-4 justify-self-end">
      {session?.user ? (
        <>
          <Link href='/dashboard' className="capitalize">{session?.user?.name}</Link>
        </>
      ) : (
        <Link href="/login">
          <HiOutlineLogin className="h-6 w-6" />
        </Link>
      )}
    </div>
  );
}
