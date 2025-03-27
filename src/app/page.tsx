import IngredientPanel from "./_components/IngredientPanel";
import ExplorePage from "./_components/layout/ExplorePage";

export default function page() {
  return (
    <div className="flex">
      <div className="flex-grow p-4 h-[calc(100vh-3rem)] overflow-y-scroll">
        <ExplorePage/>
      </div>
      <IngredientPanel/>
    </div>
  );
}
