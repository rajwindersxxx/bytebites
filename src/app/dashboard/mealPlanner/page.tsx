import BookmarksList from "@/app/_components/BookmarksList";
import MealCalendar from "@/app/_components/MealCalendar";
export default function MealPlannerPage() {
  return (
    <div className="grid h-full grid-cols-[23.25rem_1fr] gap-4">
      <div>
        <h2 className="text-xl text-center">Recipes List</h2>
        <BookmarksList visibleButtons={['meal']} detailLink="/recipeDetail"/>
      </div>
      <MealCalendar />
    </div>
  );
}
