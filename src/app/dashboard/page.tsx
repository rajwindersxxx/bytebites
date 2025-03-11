import DashBoardCards from "../_components/DashBoardCards";
import ActivityCard from "../_components/ActivityCard";
import CartCard from "../_components/CartCard";
import MakeRecipeCard from "../_components/MakeRecipeCard";
import MealCalendarCard from "../_components/MealCalanderCard";
import RequiredIngredientCard from "../_components/RequiredIngredientCard";

function Page() {
  return (
    <div className="h-[90%]">
      <h2 className="p-4 text-center text-2xl">Welcome Yourname</h2>
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

export default Page;
