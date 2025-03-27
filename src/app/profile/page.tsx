import UpdateAccount from "@/app/_components/forms/UpdateAccount";
import UpdatePassword from "@/app/_components/forms/UpdatePassword";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Profile",
};
export default function ProfilePage() {
  return (
    <>
      <h1 className="m-4 text-center text-2xl">Update your account</h1>
      <div className="grid max-w-[43.75rem]">
        <h2 className="text-xl">Update your account settings </h2>
        <UpdateAccount />
        <UpdatePassword />
      </div>
    </>
  );
}
