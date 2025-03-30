import { Category } from "@/app/types/RecipeTypes";
import SearchOption from "./SearchOption";

interface props {
  categories: Category[];
  openedCategories: string;
}
function SearchOptions({ categories, openedCategories }: props) {
  return (
    <>
      {categories.map((item) => (
        <div
          className={`rounded-md border border-accent p-1 ${openedCategories === Object.keys(item)[0] ? "" : "invisible absolute -z-[999]"}`}
          key={Object.keys(item)[0]}
        >
          {Object.values(item)[0].map((option) => (
            <SearchOption option={option} groupName={Object.keys(item)[0]} key={option}/>
          ))}
        </div>
      ))}
    </>
  );
}

export default SearchOptions;
