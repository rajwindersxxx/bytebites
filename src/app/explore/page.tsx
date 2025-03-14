import { Metadata } from "next";
import ExplorePage from "../_components/layout/ExplorePage";

export const metadata: Metadata = {
  title: "Explore",
};

function page() {
  return (
    <div>
      <ExplorePage />
    </div>
  );
}

export default page;
