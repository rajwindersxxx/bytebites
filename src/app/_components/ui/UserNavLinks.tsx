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
      link: "/bookmarks",
      icon: <HiOutlineHeart />,
    },
    {
      name: "Make shopping list",
      link: "/shopping",
      icon: <HiOutlineShoppingBag />,
    },
    {
      name: "Cart",
      link: "/shoppingList",
      icon: <HiOutlineShoppingCart />,
    },
    {
      name: "Meal Planning",
      link: "/mealPlanner",
      icon: <HiOutlineCalendar />,
    },
    {
      name: "Likes",
      link: "/likes",
      icon: <HiOutlineThumbUp />,
    },
    {
      name: "Profile",
      link: "/profile",
      icon: <HiOutlineUser />,
    },
  ];
  return (
    <UserNavigation>
      <ul className="w-42">
        {userNavigation.map((item) => (
          <li key={uniqueId()}>
            <Link
              href={item.link}
              prefetch={true}
              className={`my-2 flex items-center justify-start gap-2 p-2 transition-all hover:bg-accent ${item.link === pathName && "bg-natural-beige"}`}
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
