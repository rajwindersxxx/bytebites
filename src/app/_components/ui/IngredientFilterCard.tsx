import { HiChevronUp } from "react-icons/hi";
import SearchOption from "./SearchOption";
import { IngredientListTags } from "@/app/_types/RecipeTypes";
import { useEffect, useState } from "react";
import { useRecipeFilter } from "@/app/_context/RecipeFilterContext";

interface Props {
  item: IngredientListTags;
}

function IngredientFilterCard({ item }: Props) {
  const { type, ingredients } = item;
  const [displayData, setDisplayData] = useState<string[]>([]);
  const [isCollapseCard, setCollapseCard] = useState(true);
  const { selectedIngredients, toggleSelection } = useRecipeFilter();
  useEffect(() => {
    if (isCollapseCard) {
      setDisplayData([...ingredients.slice(0, 7)]);
    } else {
      setDisplayData(ingredients);
    }
  }, [isCollapseCard, ingredients]);

  return (
    <div className="py-4">
      <div className="bg-natural-beige p-2">
        <div className="mb-1 flex h-8 items-center justify-between border-b border-accent">
          <h2>{type}</h2>
          <button onClick={() => setCollapseCard((prevValue) => !prevValue)}>
            <HiChevronUp
              className={`h-6 w-6 transition-transform ${isCollapseCard ? "" : "rotate-180"}`}
            />
          </button>
        </div>

        {/* Render checkboxes and persist selection state */}
        {displayData.map((ing) => (
          <SearchOption
            key={ing}
            option={ing}
            groupName={type}
            className="has-[:checked]:bg-accent has-[:checked]:dark:text-black"
            isChecked={selectedIngredients.has(ing)}
            onToggle={() => toggleSelection(ing)}
          />
        ))}

        {/* Show "more" button only if collapsed */}
        {isCollapseCard && ingredients.length > 7 && (
          <button
            className="mt-2 rounded-full bg-natural-cream p-2"
            onClick={() => setCollapseCard(false)}
          >{`${ingredients.length - 7} more`}</button>
        )}
      </div>
    </div>
  );
}

export default IngredientFilterCard;
