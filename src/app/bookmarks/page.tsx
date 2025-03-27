import BookmarksList from "@/app/_components/features/bookmarks/BookmarksList";
import RecipeShortDetails from "@/app/_components/features/recipe/RecipeShortDetails";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Bookmarks",
};
function page() {
  return (
    <div className="grid h-full grid-cols-[23.25rem_2fr] gap-4">
      <div className="h-full">
        <h1 className="p2 text-center text-xl">Bookmarked recipes</h1>
        <BookmarksList detailLink="/bookmarks" />
      </div>
      <RecipeShortDetails />
    </div>
  );
}

export default page;
