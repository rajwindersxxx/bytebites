import { Metadata } from "next";
import LoginForm from "../_components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
};
function page() {
  return (
    <div className=" flex justify-center items-center  h-[calc(100vh-8.125rem)]">
      <LoginForm/>
    </div>
  );
}

export default page;
