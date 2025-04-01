import UpdateAccount from "@/app/_components/forms/UpdateAccount";
import UpdatePassword from "@/app/_components/forms/UpdatePassword";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Profile",
};
export default function ProfilePage() {
  return (
    <div className="ml-9 px-8 py-4">
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
