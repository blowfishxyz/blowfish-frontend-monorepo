import React from "react";
import styled, { css } from "styled-components";
import { Text } from "./Typography";
import { BlowfishWarningIcon } from "./icons/BlowfishWarningIcon";
import { WarningSeverity } from "../types";
import type { Warning } from "../utils/BlowfishApiClient";

const Wrapper = styled.div<{ severity: WarningSeverity }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 25px;
  width: 100%;

  ${({ severity, theme }) =>
    severity === "WARNING"
      ? css`
          background: ${theme.palette.warningBackground};
          border: 2px solid ${theme.palette.yellow};
          box-shadow: 0px 4px 25px rgba(255, 206, 33, 0.2);
        `
      : css`
          background: ${theme.palette.blockBackground};
          border: 2px solid ${theme.palette.red};
          box-shadow: 0px 4px 25px rgba(255, 61, 0, 0.2);
        `};
  border-radius: 12px;
`;

const WarningHeadline = styled(Text)<{ severity: WarningSeverity }>`
  font-weight: 900;
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 8px;
  color: ${({ theme, severity }) =>
    severity === "WARNING" ? theme.palette.yellow : theme.palette.red};
`;
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 25px;
`;

interface WarningNoticeProps {
  severity: WarningSeverity;
  warning: Warning;
}
export const WarningNotice: React.FC<WarningNoticeProps> = ({
  severity,
  warning,
}) => {
  const headline = severity === "WARNING" ? "WARNING" : "CRITICAL WARNING";
  return (
    <Wrapper severity={severity}>
      <BlowfishWarningIcon severity={severity} />
      <MessageContainer>
        <WarningHeadline severity={severity}>{headline}</WarningHeadline>
        <Text>{warning.message}</Text>
      </MessageContainer>
    </Wrapper>
  );
};
