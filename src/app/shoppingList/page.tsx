import IngredientList from "@/app/_components/features/recipe/IngredientList";
import { Metadata } from "next";
import { auth } from "../_lib/Auth";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Cart",
};
async function page() {
    const session = await auth();
    if (!session?.user) {
      redirect("/");
    }
  return (
    <div className="px-8 py-4">
      <h2 className="p-2 text-center text-2xl">
        Your Ingredient Shopping List
      </h2>
      <IngredientList />
    </div>
  );
}

export default page;
