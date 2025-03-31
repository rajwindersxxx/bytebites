import { Category } from "@/app/types/RecipeTypes";
import SearchOptionsGroup from "./SearchOptionsGroup";

interface Props {
  categories: Category[];
  openedCategories: string;
}

function SearchOptions({ categories, openedCategories }: Props) {

  return (
    <>
      {categories.map((item) => (
        <SearchOptionsGroup
          item={item}
          openedCategories={openedCategories}
          key={Object.keys(item)[0]}
        />
      ))}
    </>
  );
}

export default SearchOptions;
