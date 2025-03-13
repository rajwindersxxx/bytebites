import BookmarksList from "@/app/_components/BookmarksList";
import MealCalendar from "@/app/_components/MealCalendar";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Meal planning'
}
export default function MealPlannerPage() {
  return (
    <div className="grid h-[95%] grid-cols-[23.25rem_1fr] gap-4">
      <div className="">
        <h2 className="text-xl text-center">Recipes List</h2>
        <BookmarksList visibleButtons={['meal']} detailLink="/recipeDetail"/>
      </div>
      <MealCalendar />
    </div>
  );
}
