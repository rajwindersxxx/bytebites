import Link from "next/link";
import {
  HiOutlineCalendar,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineThumbUp,
  HiOutlineUser,
} from "react-icons/hi";
import SignOutButton from "./SignOutButton";
import { uniqueId } from "lodash";

function UserNavigation() {
  const userNavigation = [
    {
      name: "home",
      link: "/dashboard",
      icon: <HiOutlineHome className="h-5 w-5" />,
    },
    {
      name: "bookmarked",
      link: "/dashboard/bookmarks",
      icon: <HiOutlineHeart className="h-5 w-5" />,
    },
    {
      name: "Make shopping list",
      link: "/dashboard/shopping",
      icon: <HiOutlineShoppingBag className="h-5 w-5" />,
    },
    {
      name: "Meal Planning",
      link: "/dashboard/mealPlanner",
      icon: <HiOutlineCalendar className="h-5 w-5" />,
    },
    {
      name: "Likes",
      link: "/dashboard/likes",
      icon: <HiOutlineThumbUp className="h-5 w-5" />,
    },
    {
      name: "Profile",
      link: "/dashboard/profile",
      icon: <HiOutlineUser className="h-5 w-5" />,
    },
  ];
  return (
    <nav className="flex h-full flex-col justify-between">
      <ul>
        {userNavigation.map((item) => (
          <li key={uniqueId()}>
            <Link
              href={item.link}
              className="my-2 flex items-center justify-start gap-2 p-2 transition-all hover:bg-natural-beige"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul>
        <SignOutButton />
      </ul>
    </nav>
  );
}

export default UserNavigation;
