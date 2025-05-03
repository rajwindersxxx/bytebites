import { useState, useEffect, useMemo } from 'react';

/**
 * Custom hook that debounces a value and returns the debounced result.
 */
function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Memoize the value to avoid unnecessary recalculations
  const memoizedValue = useMemo(() => value, [value]);

  useEffect(() => {
    // Set up the debounce timer
    const handler = setTimeout(() => {
      setDebouncedValue(memoizedValue);
    }, delay);

    // Clean up the timer on component unmount or value change
    return () => {
      clearTimeout(handler);
    };
  }, [memoizedValue, delay]);

  return debouncedValue;
}

export default useDebounce;
