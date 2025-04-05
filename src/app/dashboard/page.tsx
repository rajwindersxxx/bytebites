import ActivityCard from "../_components/features/dashboard/ActivityCard";
import MakeRecipeCard from "../_components/features/dashboard/MakeRecipeCard";
import MealCalendarCard from "../_components/features/MealPlanning/MealCalanderCard";
import RequiredIngredientCard from "../_components/features/dashboard/RequiredIngredientCard";
import { auth } from "../_lib/Auth";
import { Metadata } from "next";
import DashBoardCards from "../_components/features/dashboard/DashBoardCards";
import CartCard from "../_components/features/dashboard/CartCard";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Dashboard",
};
async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="px-8 py-4">
      <h2 className="p-4 text-center text-2xl capitalize">
        Welcome {session?.user?.name}
      </h2>
      <div className="grid h-[calc(100vh-145px)] grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 grid-rows-[min-content_auto_min-content] gap-8 place-content-start">
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
