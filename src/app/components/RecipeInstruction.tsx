import React from 'react';
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
      <div className="flex items-center  col-start-2 col-span-2 gap-2">
        <span className="font-bold">
          {ingredients.length > 0 && 'Ingredients:'}
        </span>
        {ingredients.map((item) => {
          return (
            <div key={item.id}>
              <p className="p-2 bg-natural-beige text-center rounded-md">
                {item.name}
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex items-center  col-start-2 col-span-2 gap-2">
        <span className="font-bold">
          {equipment.length > 0 && 'Equipments:'}
        </span>
        {equipment.map((item) => {
          return (
            <div key={item.id}>
              <p className="p-2 bg-orange-200 text-center rounded-md">
                {item.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
