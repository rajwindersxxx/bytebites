import React from "react";

import { uniqueId } from "lodash";
import { AnalyzedInstructions } from "@/app/_types/RecipeTypes";
import RecipeInstruction from "./RecipeInstruction";

interface props {
  analyzedInstruction: AnalyzedInstructions;
}
export default function AnalyzedInstruction({ analyzedInstruction }: props) {
  const { name, steps } = analyzedInstruction;
  return (
    <div className="min-h-32 bg-natural-cream">
      <h4 className="my-8 text-xl font-bold">{name}</h4>
      <div className="flex flex-col gap-4 rounded-md">
        {steps.map((instruction) => (
          <RecipeInstruction instruction={instruction} key={uniqueId()} />
        ))}
      </div>
    </div>
  );
}
