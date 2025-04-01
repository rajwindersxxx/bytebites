import BookmarksList from "@/app/_components/features/bookmarks/BookmarksList";
import RecipeShortDetails from "@/app/_components/features/recipe/RecipeShortDetails";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Bookmarks",
};
function page() {
  return (
    <div className="grid md:grid-cols-[2fr_23.25rem] gap-4 px-8 py-4  ml-9">
      <RecipeShortDetails />
      <div className="">
        <h1 className="p-2 text-center text-2xl">Bookmarked recipes</h1>
        <BookmarksList detailLink="/bookmarks" />
      </div>
    </div>
  );
}

export default page;
