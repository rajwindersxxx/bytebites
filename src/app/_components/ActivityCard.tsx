import { isWithinInterval, parseISO, subDays } from "date-fns";
import ActivityCardListItem from "./ActivityCardListItem";

function ActivityCard() {

  return (
    <div className="col-span-1 rounded-md bg-green-300 p-4 dark:bg-green-900">
      <h2 className="pb-4 text-xl uppercase"> Activity</h2>
      <ul className="flex flex-col justify-center gap-4">
        <ActivityCardListItem image={"/x.jpg"}>
          Added meal to meals
        </ActivityCardListItem>
        <ActivityCardListItem image={"/x.jpg"}>
          bookmarks recipe pizza
        </ActivityCardListItem>
        <ActivityCardListItem image={"/x.jpg"}>
          recipe Name added to cart
        </ActivityCardListItem>
        <ActivityCardListItem image={"/x.jpg"}>
          ingredient is purchased
        </ActivityCardListItem>
      </ul>
    </div>
  );
}

export default ActivityCard;
function filterByRecentDates<T>(
  data: T[],
  dateKey: keyof T,
  dayCount: number,
): T[] {
  const today = new Date();
  const pastDate = subDays(today, dayCount);

  return data.filter((item) => {
    const itemDate = parseISO(item[dateKey] as string); // Convert string to Date
    return isWithinInterval(itemDate, { start: pastDate, end: today });
  });
}
