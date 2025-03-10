"use client";
import { EventHoveringArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import useSavedMeals from "../_hooks/useSavedMeals";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { useModal } from "./Modal";
import ConfirmationModal from "./ConfirmationModal";

import { useRef, useState } from "react";
import RecipeCard from "./RecipeCard";
import { floatingToolTip } from "../_helper/clientheper";
import { RecipeObject } from "../types/RecipeTypes";
interface props {
  initialView?: string;
  className?: string;
  height?: number
}
function MealCalendar({initialView = "dayGridMonth" , className = 'h-[calc(100vh-250px)] w-[90%]', height}: props) {
  const { removeMeal, savedMeals } = useSavedMeals();
  const [selectedData, setSelectedData] = useState<RecipeObject | null>(null);
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
  const tooltip = useRef<HTMLDivElement>(null);
  const arrowElement = useRef<HTMLDivElement>(null);

  function handleTooltip(info: EventHoveringArg) {
    const hoverRecipeId = info.event._def.extendedProps.recipeId;
    const button = info.el;
    const hoverRecipe = savedMeals.filter(
      (item) => item.recipeId === hoverRecipeId,
    );
    setSelectedData(hoverRecipe[0].bitebytesRecipes);
    floatingToolTip(button, tooltip.current!, arrowElement.current!, {
      offset: 10,
      showDelay: 0,
      hideDelay: 0,
    });
  }

  return (
    <div className={`relative ${className} justify-self-center`}>
      <div className="w-58 absolute right-48 top-1 flex h-9 items-center gap-4">
        <div className="flex items-center gap-1">
          <div className="h-4 w-4 rounded-full bg-green-500"></div>
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
        initialView={initialView}
        events={newData}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventMouseEnter={handleTooltip}
        height={height}
      />
      <div
        ref={tooltip}
        id="tooltip"
        className="pointer-events-none absolute left-0 top-0 z-50 hidden w-[22rem] rounded-md text-sm opacity-0 transition-opacity [&_.cardDetails]:p-2 [&_.card]:w-full [&_.card]:grid-cols-[0.8fr_1.7fr] [&_h3]:text-sm"
      >
        {selectedData && <RecipeCard data={selectedData} visibleButtons={[]} />}
        <div
          ref={arrowElement}
          className="absolute z-20 h-4 w-4 rotate-45 bg-natural-beige"
        ></div>
      </div>
    </div>
  );
}

export default MealCalendar;
