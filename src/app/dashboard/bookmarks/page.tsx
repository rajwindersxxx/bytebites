import BookmarksList from "@/app/_components/BookmarksList";
import RecipeShortDetails from "@/app/_components/RecipeShortDetails";
function page() {
  return (
    <div className="grid h-full grid-cols-[21.25rem_2fr] gap-4">
      <BookmarksList detailLink='/dashboard/bookmarks'/>
      <RecipeShortDetails />
    </div>
  );
}

export default page;
