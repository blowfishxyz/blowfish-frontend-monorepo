export function normalizePxProp<T>(prop: T | number) {
  if (typeof prop === "number") {
    return `${prop}px`;
  }
  return prop;
}
