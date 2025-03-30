import { Category } from "@/app/types/RecipeTypes";
import SearchOptionsGroup from "./SearchOptionsGroup";
import { useState } from "react";

interface Props {
  categories: Category[];
  openedCategories: string;
}

function SearchOptions({ categories, openedCategories }: Props) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  console.log(selectedFilters) //* here is main filters 
  const handleFilterChange = (category: string, option: string) => {
    setSelectedFilters((prev) => {
      const currentOptions = prev[category] || [];
      if (currentOptions.includes(option)) {
        return {
          ...prev,
          [category]: currentOptions.filter((item) => item !== option),
        };
      } else {
        return {
          ...prev,
          [category]: [...currentOptions, option],
        };
      }
    });
  };

  return (
    <>
      {categories.map((item) => (
        <SearchOptionsGroup
          item={item}
          openedCategories={openedCategories}
          key={Object.keys(item)[0]}
          onFilterChange={handleFilterChange}
          selectedFilters={selectedFilters}
        />
      ))}
    </>
  );
}

export default SearchOptions;
