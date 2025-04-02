import React from "react";
import { AnalyzedInstructions } from "../../../types/RecipeTypes";
import { uniqueId } from "lodash";
import AnalyzedInstruction from "./AnalyzedInstruction";

interface props {
  analyzedInstructions: AnalyzedInstructions[];
}
export default function RecipeInstructions({ analyzedInstructions }: props) {
  return (
    <div className="">
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
