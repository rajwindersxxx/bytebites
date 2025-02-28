import BookmarksList from "@/app/_components/BookmarksList";
import RecipeShortDetails from "@/app/_components/RecipeShortDetails";
function page() {
  return (
    <div className="grid h-full grid-cols-[0.74fr_2fr] gap-4">
      <BookmarksList />
      <RecipeShortDetails />
    </div>
  );
}

export default page;
