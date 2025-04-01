import BookmarksList from "@/app/_components/features/bookmarks/BookmarksList";
import RecipeShortDetails from "@/app/_components/features/recipe/RecipeShortDetails";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Bookmarks",
};
function page() {
  return (
    <div className="grid grid-cols-[23.25rem_2fr] gap-4 px-8 py-4  ml-9">
      <div className="">
        <h1 className="p-2 text-center text-2xl">Bookmarked recipes</h1>
        <BookmarksList detailLink="/bookmarks" />
      </div>
      <RecipeShortDetails />
    </div>
  );
}

export default page;
