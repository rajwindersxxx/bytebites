import { HiChevronUp } from "react-icons/hi";
import SearchOption from "./SearchOption";
import { IngredientListTags } from "@/app/types/RecipeTypes";
interface props {
  item: IngredientListTags;
}
function IngredientFilterCard({ item }: props) {
  const { type, ingredients } = item;
  return (
    <div className="py-4">
      <div className="bg-natural-beige p-2">
        <div className="mb-1 flex h-8 items-center justify-between border-b border-accent">
          <h2 className="uppercase">{type}</h2>
          <button>
            <HiChevronUp className="h-6 w-6" />
          </button>
        </div>
        {ingredients.map((ing) => (
          <SearchOption
            key={ing}
            option={ing}
            groupName={type}
            className="has-[:checked]:bg-accent has-[:checked]:dark:text-black"
          />
        ))}
      </div>
    </div>
  );
}

export default IngredientFilterCard;
