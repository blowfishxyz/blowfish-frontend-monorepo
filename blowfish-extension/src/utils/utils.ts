export const sleep = (timeMs: number) =>
  new Promise((resolve) => setTimeout(resolve, timeMs))
