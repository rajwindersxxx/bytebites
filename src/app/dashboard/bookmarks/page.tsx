import BookmarksList from "@/app/_components/BookmarksList";
import RecipeShortDetails from "@/app/_components/RecipeShortDetails";
function page() {
  return (
    <div className="grid h-full grid-cols-[23.25rem_2fr] gap-4">

      <div className="h-[96%]">
        <h1 className="text-xl text-center p2">Bookmarked recipes</h1>
        <BookmarksList detailLink='/dashboard/bookmarks'/>
      </div>
      <RecipeShortDetails />
    </div>
  );
}

export default page;
