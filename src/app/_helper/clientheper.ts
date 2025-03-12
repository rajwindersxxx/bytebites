import { computePosition, offset, Placement } from "@floating-ui/dom";
import { arrow, flip, shift } from "@floating-ui/react";

export function setSessionStorage(key: string, data: unknown): boolean {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, JSON.stringify(data));
    return true; // Indicate success
  }
  return false;
}

export function getSessionStorage<T>(key: string): T | null {
  if (typeof window !== "undefined") {
    const storedData = sessionStorage.getItem(key);
    if (storedData) {
      try {
        return JSON.parse(storedData) as T; // Type assertion
      } catch (error) {
        console.error(
          `Error parsing sessionStorage data for key "${key}":`,
          error,
        );
        return null; // Return null on parsing error
      }
    }
  }
  return null;
}
export function setLocalStorage(key: string, data: unknown) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  }
  return false;
}

export function getLocalStorage<T>(key: string): T | null {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      try {
        return JSON.parse(storedData) as T; // Type assertion
      } catch (error) {
        console.error(
          `Error parsing localStorage data for key "${key}":`,
          error,
        );
        return null; // Return null on parsing error
      }
    }
  }
  return null;
}
// convert utc date to localdate  date.toLocaleString(); to convert localdate

interface FloatingTooltipOptions {
  placement?: Placement;
  offset?: number;
  showDelay?: number;
  hideDelay?: number;
}

export function floatingToolTip(
  button: HTMLElement,
  tooltip: HTMLElement,
  arrowElement: HTMLElement,
  options: FloatingTooltipOptions = {},
) {
  const {
    placement = "top",
    offset: offsetValue = 6,
    showDelay = 0,
    hideDelay = 0,
  } = options;

  let showTimeout: ReturnType<typeof setTimeout> | null = null;
  let hideTimeout: ReturnType<typeof setTimeout> | null = null;
  let isTooltipVisible = false;

  function updatePosition() {
    computePosition(button, tooltip, {
      placement,
      middleware: [
        offset(offsetValue),
        flip(),
        shift({ padding: 0 }),
        arrow({ element: arrowElement }),
      ],
    }).then(({ x, y, placement: computedPlacement, middlewareData }) => {
      Object.assign(tooltip.style, {
        left: `${x}px`,
        top: `${y}px`,
      });

      const { x: arrowX, y: arrowY } = middlewareData.arrow || {};

      const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
      }[computedPlacement.split("-")[0]];

      Object.assign(arrowElement.style, {
        left: arrowX != null ? `${arrowX}px` : "",
        top: arrowY != null ? `${arrowY}px` : "",
        right: "",
        bottom: "",
        [staticSide as string]: "-4px",
      });
    });
  }

  function showTooltip() {
    clearTimeout(hideTimeout!);

    if (isTooltipVisible) return;

    showTimeout = setTimeout(() => {
      tooltip.style.display = "block";
      setTimeout(() => {
        tooltip.style.opacity = "1";
        isTooltipVisible = true;
      }, showDelay); // Use 0 to ensure opacity change is applied after display

      updatePosition();
    }, 0); // Start show animation immediately
  }

  function hideTooltip() {
    clearTimeout(showTimeout!);
    if (!isTooltipVisible) return;

    hideTimeout = setTimeout(() => {
      tooltip.style.opacity = "0";
      setTimeout(() => {
        tooltip.style.display = "";
        isTooltipVisible = false;
      }, hideDelay);
    }, 0); // Start hide animation immediately
  }

  const handleMouseEnter = () => showTooltip();
  const handleMouseLeave = () => hideTooltip();
  const handleFocus = () => showTooltip();
  const handleBlur = () => hideTooltip();

  button.addEventListener("mouseenter", handleMouseEnter);
  button.addEventListener("mouseleave", handleMouseLeave);
  button.addEventListener("focus", handleFocus);
  button.addEventListener("blur", handleBlur);

  return () => {
    button.removeEventListener("mouseenter", handleMouseEnter);
    button.removeEventListener("mouseleave", handleMouseLeave);
    button.removeEventListener("focus", handleFocus);
    button.removeEventListener("blur", handleBlur);
  };
}

export function textToEmoji(name: string) {
  switch (name) {
    case "SOLID":
      return "🧊";
    case "LIQUID":
      return "💧";
    default:
      return "undefined";
  }
}
