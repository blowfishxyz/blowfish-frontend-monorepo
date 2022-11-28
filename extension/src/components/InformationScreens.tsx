import React from "react";
import styled from "styled-components";

import {
  BlowfishWarningIcon,
  BlowfishInvertedWarningIcon,
} from "./icons/BlowfishWarningIcons";
import { TextButton } from "./Buttons";
import { TextXL, Text } from "./Typography";

interface SharedProps {
  kind: InformationScreenKind;
}
const StyledTextXL = styled(TextXL)<SharedProps>`
  text-align: center;
  margin-bottom: 32px;
  color: ${({ kind, theme }) =>
    kind === "TRANSACTION_BLOCKED" ? "#ff6332" : theme.palette.black};
`;
const StyledText = styled(Text)<SharedProps>`
  text-align: center;
  margin-bottom: 32px;
  color: ${({ kind, theme }) =>
    kind === "TRANSACTION_BLOCKED" ? "#ff6332" : theme.palette.black};
`;

const StyledBlowfishWarningIcon = styled(BlowfishWarningIcon)`
  width: 81px;
  height: auto;
  margin-bottom: 40px;
`;

const StyledBlowfishInvertedWarningIcon = styled(BlowfishInvertedWarningIcon)`
  margin-bottom: 48px;
`;

const Wrapper = styled.div<SharedProps>`
  width: 100%;
  background-color: ${({ kind, theme }) =>
    kind === "TRANSACTION_BLOCKED" ? "#340000" : theme.palette.white};
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1.4945px 3.62304px rgba(0, 0, 0, 0.0731663);
  border-radius: 12px;
  padding: 120px 32px 32px 32px;
  align-items: center;
  box-sizing: border-box;
`;

type InformationScreenKind =
  | "TRANSACTION_BLOCKED"
  | "SIMULATION_FAILED"
  | "TRANSACTION_REVERTED"
  | "UNSUPPORTED_CHAIN";

export interface TransactionBlockedScreenProps {
  onContinue: () => void;
}
export const TransactionBlockedScreen: React.FC<
  TransactionBlockedScreenProps
> = ({ onContinue }) => {
  const kind = "TRANSACTION_BLOCKED";
  return (
    <Wrapper kind={kind}>
      <StyledBlowfishWarningIcon severity="CRITICAL" />
      <StyledTextXL kind={kind}>Transaction Flagged</StyledTextXL>
      <StyledText kind={kind}>
        We believe this transaction is malicious and unsafe to sign. Approving
        may lead to loss of funds
      </StyledText>
      <TextButton onClick={onContinue}>
        <StyledText
          kind={kind}
          style={{
            fontWeight: 400,
            opacity: 0.6,
          }}
        >
          Ignore warning, proceed anyway
        </StyledText>
      </TextButton>
    </Wrapper>
  );
};

export interface SimulationFailedScreenProps {
  style?: React.CSSProperties;
  className?: string;
}
export const SimulationFailedScreen: React.FC<SimulationFailedScreenProps> = ({
  style,
  className,
}) => {
  const kind = "SIMULATION_FAILED";
  // TODO(kimpers): Actual copy
  return (
    <Wrapper kind={kind} style={style} className={className}>
      <StyledBlowfishInvertedWarningIcon />
      <StyledTextXL kind={kind}>Simulation Failed</StyledTextXL>
      <StyledText kind={kind}>
        We are unable to simulate this transaction. Approving it may lead to
        loss of your funds
      </StyledText>
    </Wrapper>
  );
};
