"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import useSavedMeals from "../_hooks/useSavedMeals";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { useModal } from "./Modal";
import ConfirmationModal from "./ConfirmationModal";
function MealCalendar() {
  const { removeMeal, savedMeals } = useSavedMeals();
  const { openModal } = useModal();
  const newData = savedMeals.map((item) => {
    let color;
    if (item.mealType === "breakfast") color = "oklch(0.723 0.219 149.579)";
    if (item.mealType === "lunch") color = "oklch(0.852 0.199 91.936)";
    if (item.mealType === "dinner") color = "oklch(0.637 0.237 25.331)";
    const date = new Date(item.date).toISOString().split("T")[0];
    return {
      ...item,
      date,
      description: item.title,
      currentDate: item.date,
      color,
    };
  });
  function handleDateClick(info: DateClickArg) {
    console.log(info);
  }
  function handleEventClick(info: EventClickArg) {
    const { currentDate, mealType, userId } = info.event._def.extendedProps;
    openModal(
      <ConfirmationModal
        callback={() => removeMeal({ userId, mealType, date: currentDate })}
      />,
      "deleteMeal",
    );
  }
  function handletooltip(info){
    
   console.log(info.el)
  }
  return (
    <div className="relative h-[calc(100vh-250px)] w-[90%] justify-self-center overflow-y-scroll">
      <div className="absolute right-48 top-1 h-9 w-58  flex gap-4 items-center">
        <div className="flex items-center gap-1">
          <div className="h-4 w-4 rounded-full bg-green-500 "></div>
          <p>BreakFast</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
          <p>Lunch</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-4 w-4 rounded-full bg-red-500"></div>
          <p>Dinner</p>
        </div>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={newData}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventMouseEnter={handletooltip}
      />
    </div>
  );
}

export default MealCalendar;
