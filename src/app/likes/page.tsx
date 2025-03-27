import LikedRecipeList from "@/app/_components/features/bookmarks/LikedRecipeList";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Likes",
};
function page() {
  return (
    <div>
      <h2 className="p-4 text-center text-2xl">Liked Recipes</h2>
      <LikedRecipeList />
    </div>
  );
}

export default page;
