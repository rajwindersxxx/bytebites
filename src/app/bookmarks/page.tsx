import { Metadata } from "next";
import BookmarkPage from "../_components/features/bookmarks/BookmarkPage";
export const metadata: Metadata = {
  title: "Bookmarks",
};
function page() {
  return <BookmarkPage />;
}

export default page;
