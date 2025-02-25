import React from 'react';
import Tags from './Tags';
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
    <div className="border-b rounded-bl-md border-natural-terracotta gap-4 grid grid-cols-[auto_1fr_1fr] p-4 items-center ">
      <p className=" text-xl self-start">Step {number}</p>
      <p className="col-span-2">{step}</p>
      <div className="col-start-2 col-span-2 flex flex-col gap-4">
        {ingredients && <Tags
          tags={ingredients}
          heading="Ingredients:"
          color="bg-natural-beige"
        />}
        {equipment && <Tags tags={equipment} heading="Equipments:" color="bg-orange-200" />}
      </div>
    </div>
  );
}
