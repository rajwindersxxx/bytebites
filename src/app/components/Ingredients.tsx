import React from 'react';
import IngredientCard from './IngredientCard';
interface props {
  extendedIngredients: {
    id: number;
    name: string;
    amount: number;
    unit: string;
    image: string;
    consistency: string;
    measures: {
        metric: {
            unitShort: string
        }
    };
  }[];
}
export default function Ingredients({ extendedIngredients }: props) {
  return (
    <div className="col-span-3">
      <h2 className="text-2xl mb-8">🍳 Ingredients </h2>
      <div className="bg-natural-cream  grid grid-cols-responsiveGrid2 gap-4 m-4 ">
        {extendedIngredients.map((ingredient) => (
          <IngredientCard ingredient={ingredient} key={Math.random()} />
        ))}
      </div>
    </div>
  );
}
