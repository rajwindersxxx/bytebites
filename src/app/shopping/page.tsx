import ShoppingListPage from "@/app/_components/features/recipe/ShoppingListPage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Make a list",
};
function page() {
  return <ShoppingListPage />;
}

export default page;
