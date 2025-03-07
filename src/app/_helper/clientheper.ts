
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

