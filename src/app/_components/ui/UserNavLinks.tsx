"use client";
import { uniqueId } from "lodash";
import Link from "next/link";
import {
  HiOutlineCalendar,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineShoppingCart,
  HiOutlineThumbUp,
  HiOutlineUser,
} from "react-icons/hi";
import UserNavigation from "../features/Navigation/UserNavigation";
import { usePathname } from "next/navigation";
import { cloneElement } from "react";

function UserNavLinks() {
  const pathName = usePathname();
  const userNavigation = [
    {
      name: "home",
      link: "/dashboard",
      icon: <HiOutlineHome />,
    },
    {
      name: "bookmarked",
      link: "/dashboard/bookmarks",
      icon: <HiOutlineHeart />,
    },
    {
      name: "Make shopping list",
      link: "/dashboard/shopping",
      icon: <HiOutlineShoppingBag />,
    },
    {
      name: "Cart",
      link: "/dashboard/shoppingList",
      icon: <HiOutlineShoppingCart />,
    },
    {
      name: "Meal Planning",
      link: "/dashboard/mealPlanner",
      icon: <HiOutlineCalendar />,
    },
    {
      name: "Likes",
      link: "/dashboard/likes",
      icon: <HiOutlineThumbUp />,
    },
    {
      name: "Profile",
      link: "/dashboard/profile",
      icon: <HiOutlineUser />,
    },
  ];
  return (
    <UserNavigation>
      <ul>
        {userNavigation.map((item) => (
          <li key={uniqueId()}>
            <Link
              href={item.link}
              prefetch={true}
              className={`my-2 flex items-center justify-start gap-2 p-2 transition-all hover:bg-natural-beige ${item.link === pathName && "bg-natural-beige"}`}
            >
              {cloneElement(item.icon, {
                className: `h-5 w-5 ${item.link === pathName && "fill-gray-800 dark:fill-gray-300"}`,
              })}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </UserNavigation>
  );
}

export default UserNavLinks;
