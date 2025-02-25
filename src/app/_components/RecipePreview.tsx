import React from "react";
import { SecondaryButton } from "./Buttons";

export default function RecipePreview() {
  return (
    <div className="relative grid min-h-96 w-[800px] grid-rows-[auto_1fr_auto] justify-between overflow-hidden rounded-md border-2 border-natural-terracotta bg-natural-beige">
      <div className="flex h-8 items-center justify-between bg-natural-terracotta/75 px-2">
        <p className="text-cream uppercase">Recipe Preview</p>
        <button className="h-4 w-4 rounded-full bg-red-950/50"></button>
      </div>
      <div className="text-beige justify-self-start p-4 text-start text-black">
      <p dangerouslySetInnerHTML={{ __html: "These Spicy Scrambled Eggs with Scallions offer a quick and vibrant start to the day, blending the creamy texture of scrambled eggs with a gentle kick from chili powder and the fresh, crisp bite of scallions. This simple dish, ready in just ten minutes, makes it an ideal choice for busy mornings or a light, protein-packed lunch. The process begins with whisking eggs, milk, chili powder, and salt together, ensuring a smooth and evenly spiced mixture. The white parts of the scallions are then softened in a skillet, adding a subtle oniony sweetness, before the egg mixture is poured in. The eggs are scrambled until just set, maintaining a moist and tender texture, with the green parts of the scallions added at the end for a fresh, vibrant finish. This dish is not only delicious but also nutritious, providing high-quality protein from the eggs, calcium and vitamin D from the milk, metabolism-boosting capsaicin from the chili powder, and essential vitamins K and C from the scallions. It's a globally popular breakfast item, with this spicy twist offering a unique and flavorful variation. For those seeking to enhance the flavor, consider adding a pinch of cumin, a sprinkle of shredded cheese, or incorporating diced bell peppers or mushrooms. Similar dishes include frittatas, breakfast burritos, and shakshuka. A crisp Sauvignon Blanc or light Rosé pairs well, balancing the spice and richness of the eggs. Remember to avoid overcooking the eggs and to add the scallions in two phases for optimal flavor and texture. This adaptable recipe encourages customization with spices and vegetables, making it a versatile addition to any meal plan. <u>Health Benefits:</u> High protein from eggs, Calcium & D from milk, Capsaicin from chili, Vitamins K & C from scallions. <i>Eating Time:</i> Breakfast, lunch, brunch. <b>Popularity:</b> Global, unique twist. Extra Advice: Add cumin, cheese, peppers, mushrooms." }} />
      </div>
      <div className="p-4">
        <SecondaryButton>View recipe</SecondaryButton>
      </div>
    </div>
  );
}
