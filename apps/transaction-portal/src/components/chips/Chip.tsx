import {
  Text,
  device,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@blowfishxyz/ui";
import { LockIcon } from "@blowfish/protect-ui/icons";
import { Severity } from "@blowfish/utils/types";
import React from "react";
import styled, { css, keyframes } from "styled-components";

export interface ChipProps {
  variant?: "primary";
  text?: React.ReactNode | string;
  $severity: Severity | undefined;
  $safeguard: boolean;
}

const ChipContainer = styled.div<Omit<ChipProps, "text">>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  font-size: 13px;
  padding: 8px 10px;
  background-color: #6a6a6a1a;
  position: relative;

  @media (${device.lg}) {
    font-size: 14px;
  }

  &[data-clickable="true"] {
    cursor: pointer;
  }

  ${({ theme, $severity }) =>
    $severity &&
    css`
      background-color: ${$severity === "INFO"
        ? theme.colors.success
        : theme.severityColors[$severity].backgroundV2};
    `}
`;

const WarningText = styled(Text).attrs({ size: "md" })`
  color: ${({ theme }) => theme.colors.base50};
`;

const SeverityText = styled(Text).attrs({ size: "md" })`
  color: ${({ theme }) => theme.colors.foregroundContrast};
`;

const shakeKeyframes = keyframes`
    0% { transform: rotate(0deg); }
    ${Array.from({ length: 5 })
      .map(
        (_, i) => `
        ${0.5 + 2 * i}% { transform: rotate(10deg); }
        ${1 + 2 * i}% { transform: rotate(0deg); }
        ${1.5 + 2 * i}% { transform: rotate(-10deg); }
        ${2 + 2 * i}% { transform: rotate(0deg); }
    `
      )
      .join("")}
`;

const LockWrapper = styled(LockIcon)`
  position: absolute;
  left: -25px;
  width: 20px;
  height: 20px;
  animation: ${shakeKeyframes} 8s infinite;
`;

export const Chip = ({ $severity, $safeguard, ...rest }: ChipProps) => {
  const getSeverityText = () => {
    switch ($severity) {
      case "WARNING":
        return (
          <Text size="md">
            Risk level <Text weight="semi-bold">Medium</Text>
          </Text>
        );
      case "CRITICAL":
        return (
          <WarningText size="md">
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

  return (
    <ChipContainer $severity={$severity} $safeguard={$safeguard} {...rest}>
      {$safeguard && (
        <Tooltip placement="bottom">
          <TooltipTrigger>
            <LockWrapper />
          </TooltipTrigger>
          <TooltipContent>
            <Text size="sm">
              This transaction is protected by Blowfish Safeguard
            </Text>
          </TooltipContent>
        </Tooltip>
      )}

      {getSeverityText()}
    </ChipContainer>
  );
};
