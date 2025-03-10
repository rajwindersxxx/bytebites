function IngredientRequiredItem() {
  return (
    <div className="rounded-md dark:bg-indigo-600 bg-indigo-200 p-1">
      <h3 className="border-b">Tenty piazza with wine</h3>
      <ul>
        <li className="flex justify-between px-1 py-1">
          <p>oliveOil</p>
          <p>24 ml</p>
          <div>
            <button className="h-7 w-7 rounded-full transition-colors hover:bg-accent">
              ✔
            </button>
            <button className="h-7 w-7 rounded-full transition-colors hover:bg-accent">
              &#43;
            </button>
          </div>
        </li>
        <li className="flex justify-between px-1">
          <p>oliveOil</p>
          <p>24 ml</p>
          <div>
            <button className="h-7 w-7 rounded-full transition-colors hover:bg-accent">
              ✔
            </button>
            <button className="h-7 w-7 rounded-full transition-colors hover:bg-accent">
              &#43;
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default IngredientRequiredItem;
