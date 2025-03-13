import LikedRecipeList from "@/app/_components/LikedRecipeList"
import { Metadata } from "next"
export const metadata: Metadata = {
  title: 'Likes'
}
function page() {
  return (
    <div>
      <h2 className="text-2xl text-center p-4">Liked Recipes</h2>
      <LikedRecipeList/>
    </div>
  )
}

export default page
