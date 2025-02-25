export function simulateApiRequest(data: string, delay: number | undefined) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
      return data;
    }, delay);
  });
}
