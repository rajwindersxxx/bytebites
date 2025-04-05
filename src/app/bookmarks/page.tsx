import { Metadata } from "next";
import BookmarkPage from "../_components/features/bookmarks/BookmarkPage";
import { auth } from "../_lib/Auth";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Bookmarks",
};
async function page() {
    const session = await auth();
    if (!session?.user) {
      redirect("/");
    }
  return <BookmarkPage />;
}

export default page;
