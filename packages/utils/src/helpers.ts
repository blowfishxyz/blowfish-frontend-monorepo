export const sleep = (timeMs: number) =>
  new Promise((resolve) => setTimeout(resolve, timeMs));

export const isENS = (address = "") =>
  address.toLowerCase().endsWith(".eth") ||
  address.toLowerCase().endsWith(".xyz");

export const transformDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return date.toLocaleTimeString();
  } else if (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  ) {
    return `Tomorrow at ${date.toLocaleTimeString()}`;
  }
};
