import IngredientList from "@/app/_components/features/recipe/IngredientList";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Cart",
};
function page() {
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
