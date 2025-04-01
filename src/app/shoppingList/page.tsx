import IngredientList from "@/app/_components/features/recipe/IngredientList";
import { Metadata } from "next";
import { SecondaryButton } from "../_components/ui/Buttons";
export const metadata: Metadata = {
  title: "Cart",
};
function page() {
  return (
    <div className=" py-4 px-8  ml-9">
      <h2 className="p-2 text-center text-2xl">
        Your Ingredient Shopping List
      </h2>
      <div className=" h-[calc(100vh-180px)] min-h-0 flex-col items-start gap-4 overflow-y-auto overflow-x-hidden p-3">
        <IngredientList />
      </div>
      <div className="flex justify-end gap-4 pt-4 px-4">
        <SecondaryButton>Delete all items</SecondaryButton>
        <SecondaryButton>Check all </SecondaryButton>
      </div>
    </div>
  );
}

export default page;
