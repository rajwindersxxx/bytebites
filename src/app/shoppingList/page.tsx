import IngredientList from "@/app/_components/features/recipe/IngredientList";
import { Metadata } from "next";
import IngredientListActions from "../_components/ui/IngredientListActions";
export const metadata: Metadata = {
  title: "Cart",
};
function page() {
  return (
    <div className="ml-9 px-8 py-4">
      <h2 className="p-2 text-center text-2xl">
        Your Ingredient Shopping List
      </h2>
      <IngredientList />
      <IngredientListActions />
    </div>
  );
}

export default page;
