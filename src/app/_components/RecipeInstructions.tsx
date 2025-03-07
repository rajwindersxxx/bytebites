import React from "react";
import AnalyzedInstruction from "./AnalyzedInstruction";
import { AnalyzedInstructions } from "../types/RecipeTypes";
import { uniqueId } from "lodash";

interface props {
  analyzedInstructions: AnalyzedInstructions[];
}
export default function RecipeInstructions({ analyzedInstructions }: props) {
  return (
    <div className="col-span-2">
      <h2 className="mb-8 text-2xl"> 📝 Instructions</h2>
      {analyzedInstructions.map((analyzedInstruction) => (
        <AnalyzedInstruction
          analyzedInstruction={analyzedInstruction}
          key={uniqueId()}
        />
      ))}
    </div>
  );
}
