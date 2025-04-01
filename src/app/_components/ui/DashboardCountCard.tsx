import Link from "next/link";
import React, { cloneElement, ReactElement, SVGProps } from "react";

interface props {
  heading: string;
  count: number | undefined;
  label: string;
  color: string;
  link: string;
  icon: ReactElement<SVGProps<SVGSVGElement>>;
}
function DashboardCountCard({ heading, count, label, color, icon ,link = '/'}: props) {
  const colorClasses: { [key: string]: string } = {
    red: "bg-red-300 dark:bg-red-800",
    blue: "bg-blue-300 dark:bg-blue-800",
    green: "bg-green-300 dark:bg-green-800",
    yellow: "bg-yellow-300 dark:bg-yellow-800",
    orange: "bg-orange-300 dark:bg-orange-800",
    // Add more colors as needed
  };
  return (
    <div
      className={`grid  grid-cols-[0.5fr_1fr] items-center justify-start rounded-md  p-4 flex-1 ${colorClasses[color]}`}
    >
      {cloneElement(icon, { className: "m-1 h-12 w-12" })}
      <div className="flex flex-col gap-1">
        <Link href={link} className="text-xl uppercase">{heading}</Link>
        <h4 className="text-md">
          {count} {label}
        </h4>
      </div>
    </div>
  );
}

export default DashboardCountCard;
