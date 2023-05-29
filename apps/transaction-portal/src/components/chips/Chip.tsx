import { Text, device } from "@blowfish/ui/core";
import React from "react";
import styled, { css } from "styled-components";
import { UIWarning } from "~modules/scan/components/ScanResultsV2";

export interface ChipProps {
  variant?: "primary";
  text?: React.ReactNode | string;
  warning?: UIWarning;
  clickable?: boolean;
}

const ChipContainer = styled.div<Omit<ChipProps, "text">>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  font-size: 13px;
  padding: 8px 10px;
  background-color: #6a6a6a1a;

  @media (${device.lg}) {
    font-size: 14px;
  }

  &[data-clickable="true"] {
    cursor: pointer;
  }

  ${({ theme, warning }) =>
    warning
      ? css`
          background-color: ${warning.severity === "WARNING"
            ? theme.severityColors.WARNING.backgroundV2
            : warning.severity === "CRITICAL"
            ? theme.severityColors.CRITICAL.backgroundV2
            : theme.severityColors.INFO.backgroundV2};
        `
      : css`
          background-color: ${theme.severityColors.INFO.backgroundV2};
        `}
`;

const WarningText = styled(Text).attrs({ size: "md" })`
  color: ${({ theme }) => theme.colors.foregroundSecondaryLight};
`;

const SeverityText = styled(Text).attrs({ size: "md" })`
  color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const Chip = ({ warning, ...rest }: ChipProps) => {
  const getSeverityText = () => {
    switch (warning?.severity) {
      case "WARNING":
        return (
          <Text size="md">
            Risk level <Text weight="semi-bold">Medium</Text>
          </Text>
        );
      case "CRITICAL":
        return (
          <WarningText size="md" design="primary">
            Risk level <SeverityText weight="semi-bold">Critical</SeverityText>
          </WarningText>
        );
      default:
        return (
          <WarningText>
            Risk level <SeverityText weight="semi-bold">Low</SeverityText>
          </WarningText>
        );
    }
  };

  console.log(warning);

  return (
    <ChipContainer warning={warning} {...rest}>
      {getSeverityText()}
    </ChipContainer>
  );
};
