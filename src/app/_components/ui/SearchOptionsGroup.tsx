import { useRecipeFilter } from "@/app/_context/RecipeFilterContext";
import SearchOption from "./SearchOption";

interface Props {
  item: Record<string, string[]>;
  openedCategories: string;
}

function SearchOptionsGroup({ item, openedCategories }: Props) {
  const { handleFilterChange, selectedFilters } = useRecipeFilter();
  const category = Object.keys(item)[0];
  const options = Object.values(item)[0];

  if (openedCategories !== category) return null;
  return (
    <div className="rounded-md border p-1">
      {options.map((option) => (
        <SearchOption
          key={option}
          option={option}
          groupName={category}
          isChecked={selectedFilters[category]?.includes(option) || false}
          onToggle={() => handleFilterChange(category, option)}
        />
      ))}
    </div>
  );
}

export default SearchOptionsGroup;
