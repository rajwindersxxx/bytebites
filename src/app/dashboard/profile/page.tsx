import { PrimaryButton, SecondaryButton } from "@/app/_components/Buttons";
import Input from "@/app/_components/Input";
import { auth } from "@/app/_lib/Auth";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) return null;
  const { name, email} = session?.user;
  return (
    <div className="h-full">
      <h1 className="m-4 text-center text-2xl">Update your account</h1>
      <div className="grid max-w-[43.75rem]">
        <h2 className="text-xl">Update your account settings </h2>
        <form className="grid grid-cols-[0.3fr_1fr] items-center gap-4 py-8">
          <label>Email Address:</label>
          <Input
            type="text"
            className="p-2"
            placeHolder="Email Address"
            disabled={true}
            defaultValue={email || ''}
          />
          <label>Full Name:</label>
          <Input
            type="text"
            className="p-2"
            placeHolder="your Full name"
            defaultValue={name || ''}
          />
          <label>Avatar:</label>
          <Input type="file" className="p-2" placeHolder="Email Address" />
          <div className="col-span-2 flex gap-4 justify-self-end">
            <SecondaryButton>Cancel</SecondaryButton>
            <PrimaryButton>Update account</PrimaryButton>
          </div>
        </form>
        <form className="grid grid-cols-[0.3fr_1fr] items-center gap-4 py-8">
          <label>Current Password:</label>
          <Input
            type="text"
            className="p-2"
            placeHolder="Enter current password"
          />
          <label>New Password:</label>
          <Input type="text" className="p-2" placeHolder="Enter new password" />
          <label>Confirm password:</label>
          <Input
            type="text"
            className="p-2"
            placeHolder="Eonfirm new password"
          />
          <div className="col-span-2 flex gap-4 justify-self-end">
            <SecondaryButton>Cancel</SecondaryButton>
            <PrimaryButton>Update Password</PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}
