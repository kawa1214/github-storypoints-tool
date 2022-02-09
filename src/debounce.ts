export const debounce = <T extends (...args: any[]) => unknown>(
  callback: T,
  delay = 500
): ((...args: Parameters<T>) => void) => {
  let timeoutId: any;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
    console.log(timeoutId);
  };
};
