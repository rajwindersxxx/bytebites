import ShoppingListPage from "@/app/_components/features/recipe/ShoppingListPage";
import { Metadata } from "next";
import { auth } from "../_lib/Auth";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Make a list",
};
async function page() {
    const session = await auth();
    if (!session?.user) {
      redirect("/");
    }
  return <ShoppingListPage />;
}

export default page;
