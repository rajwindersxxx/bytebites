import IngredientList from "@/app/_components/IngredientList";

function page() {
  return (
    <div className="h-full">
      <h2 className="p-4 text-center text-2xl">
        {" "}
        Your Ingredient Shopping List{" "}
      </h2>
      <div className=" h-[calc(100vh-275px)] min-h-0  flex-col items-start gap-4 overflow-y-auto overflow-x-hidden p-3 ">
        <IngredientList />
      </div>
    </div>
  );
}

export default page;
