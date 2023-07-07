import { styled } from "styled-components";

interface DividerProps {
  margin?: string;
  orientation?: "horizontal" | "vertical";
}

export const Divider: React.FC<
  React.PropsWithChildren<DividerProps>
> = styled.div<DividerProps>`
  background-color: ${({ theme }) => theme.colors.foregroundPrimary};
  opacity: 0.05;
  margin: ${({ margin }) => margin};

  ${({ orientation = "horizontal", margin }) =>
    orientation === "horizontal"
      ? `
            width: 100%;
            height: 1px;
          `
      : `
            align-self: stretch;
            width: 1px;
            margin: ${margin || "0 15px"};
          `}
`;
