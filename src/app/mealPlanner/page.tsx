import BookmarksList from "@/app/_components/features/bookmarks/BookmarksList";
import MealCalendar from "@/app/_components/features/MealPlanning/MealCalendar";
import { Metadata } from "next";
import { auth } from "../_lib/Auth";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Meal planning",
};
export default async function MealPlannerPage() {
    const session = await auth();
    if (!session?.user) {
      redirect("/");
    }
  return (
    <div className="grid  md:grid-cols-[1fr_23.25rem] gap-4 px-8 py-4 ">
      <MealCalendar />
      <div className=" ">
        <h2 className="p-2 text-center text-2xl">Recipes List</h2>
        <BookmarksList visibleButtons={["meal"]} detailLink="/recipeDetail" />
      </div>

    </div>
  );
}
