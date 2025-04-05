import UpdateAccount from "@/app/_components/forms/UpdateAccount";
import UpdatePassword from "@/app/_components/forms/UpdatePassword";
import { Metadata } from "next";
import { auth } from "../_lib/Auth";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Profile",
};
export default async function ProfilePage() {
    const session = await auth();
    if (!session?.user) {
      redirect("/");
    }
  return (
    <div className="px-8 py-4">
      <h1 className="border-b p-2 text-center text-2xl">Update your Profile</h1>
      <div className="mx-auto max-w-[80.75rem] p-4 py-8">
        <h2 className="text-2xl font-bold">Update your account settings </h2>
        <UpdateAccount />
        <h2 className="text-2xl font-bold">Update your account password </h2>
        <UpdatePassword />
      </div>
    </div>
  );
}
