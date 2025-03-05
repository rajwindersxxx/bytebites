"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugi
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import useSavedMeals from "../_hooks/useSavedMeals";
import { useSession } from "next-auth/react";

function MealCalendar() {
  const session = useSession();
  const userId = session.data?.user?.id;
  const { savedMeals } = useSavedMeals(Number(userId));
  const newData = savedMeals.map((item) => {
    let color;
    if (item.mealType === "breakfast") color = "green";
    if (item.mealType === "lunch") color = "orange";
    if (item.mealType === "dinner") color = "red";
    return { ...item, color };
  });

  return (
    <div className="h-[calc(100vh-250px)] w-[90%] justify-self-center overflow-y-scroll">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={newData}
      />
    </div>
  );
}

export default MealCalendar;
