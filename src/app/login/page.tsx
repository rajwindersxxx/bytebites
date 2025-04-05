import { Metadata } from "next";
import LoginForm from "../_components/forms/LoginForm";
import { auth } from "../_lib/Auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In",
};
async function page() {
    const session = await auth();
    if (!session?.user) {
      redirect("/");
    }
  return (
    <div className=" flex justify-center items-center  h-[calc(100vh-8.125rem)]">
      <LoginForm/>
    </div>
  );
}

export default page;
