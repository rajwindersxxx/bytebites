export function simulateApiRequest(data: unknown) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
      return data;
    }, 0);
  });
}

export function setSessionStorage(key: string, data: unknown) {
  if (typeof window !== 'undefined') {
    return sessionStorage.setItem(key, JSON.stringify(data));
  } else {
    return false;
  }
}
export function getSessionStorage(key: string) {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem(key);
  } else {
    return false;
  }
}
