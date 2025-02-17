import React from 'react';
import AnalyzedInstruction from './AnalyzedInstruction';
interface Instruction {
  name: string;
  steps: {
    number: number;
    step: string;
    ingredients: { id: number; name: string }[];
    equipment: { id: number; name: string; image: string }[];
  }[];
}
interface props {
  analyzedInstructions: Instruction[];
}
export default function RecipeInstructions({ analyzedInstructions }: props) {
  return (
    <div className="col-span-2">
      <h2 className="text-2xl mb-8"> 📝 Instructions</h2>
        {analyzedInstructions.map((analyzedInstruction) => (
          <AnalyzedInstruction
            analyzedInstruction={analyzedInstruction}
            key={analyzedInstruction.name}
          />
        ))}
    </div>
  );
}
