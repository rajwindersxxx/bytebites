import { useState } from "react";

export function useCategoryFilter() {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({
    type: [],
    diet: [],
    cuisine: [],
    excludeIngredients:[]
  });
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
  function clearFilters() {
    setSelectedFilters({});
  }
  return { selectedFilters, handleFilterChange, clearFilters };
}
