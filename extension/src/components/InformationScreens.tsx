import React from "react";
import styled from "styled-components";

import { BlowfishWarningIcon } from "./icons/BlowfishWarningIcon";
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
  onProceed: () => void;
}
export const TransactionBlockedScreen: React.FC<
  TransactionBlockedScreenProps
> = ({ onProceed }) => {
  const kind = "TRANSACTION_BLOCKED";
  return (
    <Wrapper kind={kind}>
      <StyledBlowfishWarningIcon severity="CRITICAL" />
      <StyledTextXL kind={kind}>Transaction Flagged</StyledTextXL>
      <StyledText kind={kind}>
        We believe this transaction is malicious and unsafe to sign. Approving
        may lead to loss of funds
      </StyledText>
      <TextButton onClick={onProceed}>
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
