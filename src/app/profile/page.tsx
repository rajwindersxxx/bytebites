import UpdateAccount from "@/app/_components/forms/UpdateAccount";
import UpdatePassword from "@/app/_components/forms/UpdatePassword";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Profile",
};
export default function ProfilePage() {
  return (
    <div className="py-4 px-8  ml-9">
      <h1 className="p-2 text-center text-2xl border-b">Update your Profile</h1>
      <div className="grid max-w-[80.75rem] mx-auto p-4 py-8">
        <h2 className="text-2xl font-bold">Update your account settings </h2>
        <UpdateAccount />
        <h2 className="text-2xl font-bold">Update your account password </h2>
        <UpdatePassword />
      </div>
    </div>
  );
}
