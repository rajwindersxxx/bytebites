"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import useSavedMeals from "../_hooks/useSavedMeals";
import { EventClickArg } from "@fullcalendar/core/index.js";
function MealCalendar() {
  const { removeMeal, savedMeals } = useSavedMeals();
  const newData = savedMeals.map((item) => {
    let color;
    if (item.mealType === "breakfast") color = "green";
    if (item.mealType === "lunch") color = "orange";
    if (item.mealType === "dinner") color = "red";
    const date = new Date(item.date).toISOString().split("T")[0];
    return {
      ...item,
      date,
      currentDate: item.date,
      color,
    };
  });
  console.log(newData);
  function handleDateClick(info: DateClickArg) {
    console.log(info);
  }
  function handleEventClick(info: EventClickArg) {
    const { currentDate, mealType, userId } = info.event._def.extendedProps;
    removeMeal({ userId, mealType, date: currentDate });
  }

  return (
    <div className="h-[calc(100vh-250px)] w-[90%] justify-self-center overflow-y-scroll">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={newData}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
    </div>
  );
}

export default MealCalendar;
