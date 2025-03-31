"use client";
import { categories } from "@/app/_data/dataSamples";
import { useState } from "react";
import SearchCategories from "./SearchCategories";
import SearchOptions from "./SearchOptions";
function SearchFilters() {
  const [openedCategories, setOpenedCategories] = useState("");
  return (
    <div className="pb-4 pt-2">
      <SearchCategories
        handleOptions={setOpenedCategories}
        openedCategories={openedCategories}
        categories={categories}
      />
      <SearchOptions
        openedCategories={openedCategories}
        categories={categories}
      />
    </div>
  );
}

export default SearchFilters;
