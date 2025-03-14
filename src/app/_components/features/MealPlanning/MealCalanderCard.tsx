import MealCalendar from "./MealCalendar";

function MealCalendarCard() {
  return (
    <div className="col-span-4">
      <MealCalendar
        initialView="dayGridWeek"
        className="h-52 w-full rounded-md"
        height={200}
      />
    </div>
  );
}

export default MealCalendarCard;
