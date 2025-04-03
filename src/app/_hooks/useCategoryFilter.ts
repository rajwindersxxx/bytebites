import { useState } from "react";
const initialData = {
  type: [],
  diet: [],
  cuisine: [],
  excludeIngredients: [],
};
export function useCategoryFilter() {
  const [selectedFilters, setSelectedFilters] =
    useState<Record<string, string[]>>(initialData);
  const handleFilterChange = (category: string, option: string) => {
    setSelectedFilters((prev) => {
      const currentOptions = prev[category] || [];
      if (currentOptions.includes(option))
        return {
          ...prev,
          [category]: currentOptions.filter((item) => item !== option),
        };
      return {
        ...prev,
        [category]: [...currentOptions, option],
      };
    });
  };
  function clearFilters() {
    setSelectedFilters({});
  }
  return { selectedFilters, handleFilterChange, clearFilters };
}
