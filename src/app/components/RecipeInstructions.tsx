import React from 'react'
interface props{
    analyzedInstructions: unknown[]
}
export default function RecipeInstructions({analyzedInstructions}: props) {
    const {} = analyzedInstructions;
  return (
    <div className="bg-natural-cream h-32 col-span-2">RecipeInstructions</div>
  )
}
