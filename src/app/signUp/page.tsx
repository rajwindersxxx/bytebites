import { Metadata } from "next";
import SignUpForm from "../_components/forms/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up",
};
export default async function page() {

  return (
    <div className="flex h-[calc(100vh-8.125rem)] items-center justify-center">
      <SignUpForm />
    </div>
  );
}
