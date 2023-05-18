import { Text } from "@blowfish/ui/core";
import { BlowfishWarningIcon } from "@blowfish/ui/icons";
import type { WarningSeverity } from "@blowfish/utils/types";
import React from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div<{ $severity: WarningSeverity }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 25px;
  width: 100%;
  margin-bottom: 8px;

  ${({ $severity, theme }) =>
    $severity === "WARNING"
      ? css`
          background: ${theme.severityColors.WARNING.backgroundLight};
          border: 2px solid ${theme.colors.warning};
          box-shadow: 0px 4px 25px rgba(255, 206, 33, 0.2);
        `
      : css`
          background: ${theme.severityColors.CRITICAL.backgroundLight};
          border: 2px solid ${theme.colors.danger};
          box-shadow: 0px 4px 25px rgba(255, 61, 0, 0.2);
        `};
  border-radius: 12px;
`;

const WarningHeadline = styled(Text)<{ $severity: WarningSeverity }>`
  font-weight: 900;
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 8px;
  color: ${({ theme, $severity }) =>
    $severity === "WARNING" ? theme.colors.warning : theme.colors.danger};
`;
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 25px;
`;

interface WarningNoticeProps {
  severity: WarningSeverity;
  message: string;
}
export const WarningNotice: React.FC<WarningNoticeProps> = ({
  severity,
  message,
}) => {
  const headline = severity === "WARNING" ? "WARNING" : "CRITICAL WARNING";
  return (
    <Wrapper $severity={severity}>
      <BlowfishWarningIcon severity={severity} />
      <MessageContainer>
        <WarningHeadline $severity={severity}>{headline}</WarningHeadline>
        <Text>{message}</Text>
      </MessageContainer>
    </Wrapper>
  );
};
