import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  HiOutlineCalendar,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineLogout,
  HiOutlineShoppingBag,
  HiOutlineUser,
} from "react-icons/hi";

function UserNavigation() {
  return (
    <nav className="flex h-full flex-col justify-between">
      <ul>
        <li>
          <Link
            href="/dashboard"
            className="my-2 flex items-center justify-start gap-2 p-2 transition-all hover:bg-natural-beige"
          >
            <HiOutlineHome className="h-5 w-5" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/bookmarks"
            className="my-2 flex items-center justify-start gap-2 p-2 transition-all hover:bg-natural-beige"
          >
            <HiOutlineHeart className="h-5 w-5" />
            <span>bookmarked</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/shopping"
            className="my-2 flex items-center justify-start gap-2 p-2 transition-all hover:bg-natural-beige"
          >
            <HiOutlineShoppingBag className="h-5 w-5" />
            <span>Shopping</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/mealPlanner"
            className="my-2 flex items-center justify-start gap-2 p-2 transition-all hover:bg-natural-beige"
          >
            <HiOutlineCalendar className="h-5 w-5" />
            <span>Meal Planing</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/profile"
            className="my-2 flex items-center justify-start gap-2 p-2 transition-all hover:bg-natural-beige"
          >
            <HiOutlineUser className="h-5 w-5" />
            Profile
          </Link>
        </li>
      </ul>
      <ul>
        <form
          action={async () => {
            "use server"
            await signOut()
          }}
        >
          <button
            type="submit"
            className="my-2 flex items-center justify-start gap-2 p-2 transition-all hover:bg-natural-beige w-full"
          >
            <HiOutlineLogout className="h-5 w-5" />
            SignOut
          </button>
        </form>
      </ul>
    </nav>
  );
}

export default UserNavigation;
