import { memo } from "react";
import { ImageElement } from "../../ui/ImageElement";
interface props {
  children: React.ReactNode;
  image: string;
}
const ActivityCardListItem = memo(function ActivityCardListItem({
  children,
  image,
}: props) {
  return (
    <li className="pl-4text-md relative flex justify-between gap-2 rounded-bl-md border-b border-b-accent pb-2 pl-4 before:absolute before:left-0 before:top-[2px] before:content-['•']">
      {children}
      <div className="relative h-7 w-7 overflow-hidden rounded-full">
        <ImageElement src={image} alt="image" />
      </div>
    </li>
  );
});

export default ActivityCardListItem;
