import React from "react";
import Tags from "./Tags";
interface props {
  instruction: {
    number: number;
    step: string;
    ingredients: { id: number; name: string }[];
    equipment: { id: number; name: string; image: string }[];
  };
}
export default function RecipeInstruction({ instruction }: props) {
  const { number, step, ingredients, equipment } = instruction;
  return (
    <div className="grid grid-cols-[auto_1fr_1fr] items-center gap-4 rounded-bl-md border-b border-natural-terracotta p-4">
      <p className="self-start text-xl">Step {number}</p>
      <p className="col-span-2">{step}</p>
      <div className="col-span-2 col-start-2 flex flex-col gap-4">
        {ingredients && (
          <Tags
            tags={ingredients}
            heading="Ingredients:"
            color="bg-natural-beige "
          />
        )}
        {equipment && (
          <Tags
            tags={equipment}
            heading="Equipments:"
            color="bg-orange-200 dark:bg-orange-900"
          />
        )}
      </div>
    </div>
  );
}
