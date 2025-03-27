"use client";
import { categories } from "@/app/_data/dataSamples";
import { uniqueId } from "lodash";
import { useState } from "react";
function SearchFilters() {
  const [openedCategories , setOpenedCategories] = useState('');
  return (
    <>
      <div className="flex flex-wrap gap-2 py-4">
        {categories.map((category) => (
          <button
            key={uniqueId()}
            type="button"
            className="text-md inline-block rounded-full border px-4 py-2"
            onClick={() => setOpenedCategories(Object.keys(category)[0])}
          >
            {Object.keys(category)}
          </button>
        ))}
      </div>
      {categories.map((item) => (
        <div className={`rounded-md border p-1 ${openedCategories === Object.keys(item)[0] ? '' : 'invisible absolute -z-[999] '}`} key={uniqueId()}>
          {Object.values(item)[0].map((option) => (
              <label key={uniqueId()}
                htmlFor={option}

                className={`m-1 inline-block rounded-full border px-3 py-2 has-[:checked]:bg-natural-beige`}
              >
                {option}
              <input
                id={option}
                type="radio"
                name={Object.keys(item)[0]}
                value={option}
                className={`hidden`}
              />
              </label>
          ))}
        </div>
      ))}
    </>
  );
}

export default SearchFilters;
