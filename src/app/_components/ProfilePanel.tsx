import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth, signOut } from "../_config/Auth";
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";

export default async function ProfilePanel() {
  const session = await auth();
  return (
    <div className="flex items-center gap-4 justify-self-end">
      {session?.user ? (
        <>
          <Image
            src="https://picsum.photos/200"
            alt="guest image "
            width={48}
            height={48}
            className="h-12 w-12 rounded-full"
          />
          <p>username</p>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button type="submit">
              <HiOutlineLogout className="h-6 w-6" />
            </button>
          </form>
        </>
      ) : (
        <Link href="/login">
          <HiOutlineLogin className="h-6 w-6" />
        </Link>
      )}
    </div>
  );
}
