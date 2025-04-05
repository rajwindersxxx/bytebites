import { Metadata } from "next";
import SignUpForm from "../_components/forms/SignUpForm";
import { auth } from "../_lib/Auth";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Sign Up",
};
export default async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  return (
    <div className="flex h-[calc(100vh-8.125rem)] items-center justify-center">
      <SignUpForm />
    </div>
  );
}
