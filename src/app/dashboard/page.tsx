import ActivityCard from "../_components/features/dashboard/ActivityCard";
import MakeRecipeCard from "../_components/features/dashboard/MakeRecipeCard";
import MealCalendarCard from "../_components/features/MealPlanning/MealCalanderCard";
import RequiredIngredientCard from "../_components/features/dashboard/RequiredIngredientCard";
import { auth } from "../_lib/Auth";
import { Metadata } from "next";
import DashBoardCards from "../_components/features/dashboard/DashBoardCards";
import CartCard from "../_components/features/dashboard/CartCard";
export const metadata: Metadata = {
  title: "Dashboard",
};
async function page() {
  const session = await auth();
  return (
    <div className="h-[90%]">
      <h2 className="p-4 text-center text-2xl capitalize">
        Welcome {session?.user?.name}
      </h2>
      <div className="grid h-full grid-cols-4 grid-rows-[min-content_auto_min-content] gap-8">
        <DashBoardCards />
        <ActivityCard />
        <RequiredIngredientCard />
        <CartCard />
        <MakeRecipeCard />
        <MealCalendarCard />
      </div>
    </div>
  );
}

export default page;
