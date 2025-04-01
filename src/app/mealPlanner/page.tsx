import BookmarksList from "@/app/_components/features/bookmarks/BookmarksList";
import MealCalendar from "@/app/_components/features/MealPlanning/MealCalendar";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Meal planning",
};
export default function MealPlannerPage() {
  return (
    <div className="grid h-[95%] grid-cols-[23.25rem_1fr] gap-4 px-8 py-4  ml-9">
      <div className="">
        <h2 className="p-2 text-center text-2xl">Recipes List</h2>
        <BookmarksList visibleButtons={["meal"]} detailLink="/recipeDetail" />
      </div>
      <MealCalendar />
    </div>
  );
}
