import { Category } from "@/app/types/RecipeTypes";

interface props {
  categories: Category[];
  handleOptions: (category: string) => void;
  openedCategories: string;
}
function SearchCategories({
  categories,
  handleOptions,
  openedCategories,
}: props) {
  return (
    <div className="flex flex-wrap gap-2 py-4">
      {categories.map((category) => (
        <button
          key={Object.keys(category)[0]}
          type="button"
          className={`text-md inline-block rounded-full border px-3 py-2 ${openedCategories === Object.keys(category)[0] && 'bg-accent dark:text-gray-700 border-none'}`}
          onClick={() =>
            openedCategories === Object.keys(category)[0]
              ? handleOptions("")
              : handleOptions(Object.keys(category)[0])
          }
        >
          {Object.keys(category)}
        </button>
      ))}
    </div>
  );
}

export default SearchCategories;
