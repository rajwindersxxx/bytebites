import { Metadata } from "next";
import SignUpForm from "../_components/forms/SignUpForm";
export const metadata: Metadata = {
  title: "Sign Up",
};
export default function page() {
  return (
    <div className="flex items-center justify-center  h-[calc(100vh-8.125rem)]">
      <SignUpForm/>
    </div>
  );
}
