'use client'
import Spinner from "@/app/_components/Spinner";
import UpdateAccount from "@/app/_components/UpdateAccount";
import UpdatePassword from "@/app/_components/UpdatePassword";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
    const session = useSession();
    if(!session.data) return <Spinner />;
  return (
    <>
      <h1 className="m-4 text-center text-2xl">Update your account</h1>
      <div className="grid max-w-[43.75rem]">
        <h2 className="text-xl">Update your account settings </h2>
        <UpdateAccount/>
        <UpdatePassword/>
      </div>
    </>
  );
}
