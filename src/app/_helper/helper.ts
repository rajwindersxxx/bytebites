export function simulateApiRequest(data: unknown, delay: number | undefined) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
      return data;
    }, delay);
  });
}
