import React from 'react';
import RecipeInstruction from './RecipeInstruction';
interface props {
  analyzedInstruction: {
    name: string;
    steps: {
      number: number;
      step: string;
      ingredients: { id: number; name: string }[];
      equipment: { id: number; name: string; image: string }[];
    }[];
  };
}
export default function AnalyzedInstruction({ analyzedInstruction }: props) {
  const { name, steps } = analyzedInstruction;
  return (
    <div className="bg-natural-cream min-h-32">
      <h4 className='text-xl font-bold my-8'>{name}</h4>
      <div className="flex flex-col gap-4 rounded-md">
        {steps.map((instruction) => (
          <RecipeInstruction instruction={instruction} key={Math.random()} />
        ))}
      </div>
    </div>
  );
}
