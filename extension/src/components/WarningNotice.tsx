import React from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div<{ action: "BLOCK" | "WARN" }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px;
  width: 100%;

  background: ${({ action, theme }) =>
    action === "WARN"
      ? theme.palette.warningBackground
      : theme.palette.blockBackground};
  ${({ action, theme }) =>
    action === "WARN"
      ? css`
          border: 2px solid ${theme.palette.yellow};
          box-shadow: 0px 4px 25px rgba(255, 206, 33, 0.2);
        `
      : css`
          border: 2px solid ${theme.palette.red};
          box-shadow: 0px 4px 25px rgba(255, 61, 0, 0.2);
        `};
  border-radius: 12px;
`;

interface WarningNoticeProps {
  action: "BLOCK" | "WARN";
  message: string;
}
export const WarningNotice: React.FC<WarningNoticeProps> = ({
  action,
  message,
}) => {
  return <Wrapper action={action}>{message}</Wrapper>;
};
