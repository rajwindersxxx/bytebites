import { Metadata } from "next"
import ExplorePage from "../_components/ExplorePage"

export const metadata: Metadata = {
  title: 'Explore'
}

function page() {
  return (
    <>
      <ExplorePage/>
    </>
  )
}

export default page
