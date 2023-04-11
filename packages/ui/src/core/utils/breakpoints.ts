export type Size = {
  md: string;
  lg: string;
};

export type Device = {
  md: string;
  lg: string;
};

const size: Size = {
  md: "768px",
  lg: "1024px",
};

const device: Device = {
  md: `(min-width: ${size.md})`,
  lg: `(min-width: ${size.lg})`,
};

export { size, device };
