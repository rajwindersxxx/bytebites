import IngredientRequiredItem from "./IngredientRequiredItem";

function RequiredIngredientCart() {
  return (
    <div className="col-span-1 rounded-md dark:bg-indigo-900 bg-indigo-400 p-4">
      <h2 className="mb-4 text-xl uppercase">Ingredient Required</h2>
      <div className="max-h-52 overflow-y-auto flex flex-col gap-2">
        <IngredientRequiredItem />
        <IngredientRequiredItem />
        <IngredientRequiredItem />
      </div>

    </div>
  );
}

export default RequiredIngredientCart;
