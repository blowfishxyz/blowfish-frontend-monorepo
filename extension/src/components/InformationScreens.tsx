import React from "react";
import styled from "styled-components";
import { useLocalStorage } from "react-use";

import {
  BlowfishWarningIcon,
  BlowfishInvertedWarningIcon,
} from "./icons/BlowfishWarningIcons";
import { TextButton } from "./Buttons";
import { TextXL, Text } from "./Typography";
import { ContentToggle } from "./ContentToggle";
import { PREFERENCES_LOCALSTORAGE_PREFIX } from "../constants";

interface SharedProps {
  kind?: InformationScreenKind;
}
const StyledTextXL = styled(TextXL)<SharedProps>`
  text-align: center;
  margin-bottom: 32px;
  color: ${({ kind, theme }) =>
    kind === "TRANSACTION_BLOCKED"
      ? theme.palette.warningText
      : theme.palette.black};
`;
const StyledText = styled(Text)<SharedProps>`
  text-align: center;
  margin-bottom: 32px;
  line-height: 22px;
  color: ${({ kind, theme }) =>
    kind === "TRANSACTION_BLOCKED"
      ? theme.palette.warningText
      : theme.palette.black};
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

const WarningMessageWrapper = styled.div`
  background: rgba(245, 180, 159, 0.2);
  border-radius: 12px;
  padding: 17px 16px;
  word-break: break-word;

  ${Text} {
    color: ${({ theme }) => theme.palette.warningText};
  }
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
      <StyledTextButton onClick={onContinue}>
        <StyledText
          kind={kind}
          style={{
            fontWeight: 400,
            opacity: 0.6,
          }}
        >
          Ignore warning, proceed anyway
        </StyledText>
      </StyledTextButton>
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
        We are unable to simulate this transaction. Approving it may
        lead&nbsp;to&nbsp;loss of funds
      </StyledText>
    </Wrapper>
  );
};

export interface TransactionRevertedScreenProps {
  style?: React.CSSProperties;
  className?: string;
  parsedErrorMessage?: string;
}
export const TransactionRevertedScreen: React.FC<
  TransactionRevertedScreenProps
> = ({ style, className, parsedErrorMessage }) => {
  const kind = "TRANSACTION_REVERTED";
  // TODO(kimpers): Actual copy
  return (
    <Wrapper kind={kind} style={style} className={className}>
      <StyledBlowfishInvertedWarningIcon />
      <StyledTextXL kind={kind}>Transaction Reverted</StyledTextXL>
      <StyledText kind={kind}>
        The transaction reverted when we simulated it. Approving may lead to
        loss&nbsp;of funds
      </StyledText>
      {parsedErrorMessage && parsedErrorMessage.length > 0 && (
        <ContentToggle message="View error message">
          <WarningMessageWrapper>
            <Text>{parsedErrorMessage}</Text>
          </WarningMessageWrapper>
        </ContentToggle>
      )}
    </Wrapper>
  );
};

// TODO(kimpers): Checkbox styling
const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 13px;
`;

const StyledTextButton = styled(TextButton)`
  display: flex;
  align-items: center;
`;

export interface UnsupportedChainScreenProps {
  style?: React.CSSProperties;
  className?: string;
}

export const useShouldShowUnsupportedChainScreen = () => {
  const key = `${PREFERENCES_LOCALSTORAGE_PREFIX}show_unsupported_chain_notice`;
  const [shouldShowScreen, setShouldShowScreen] = useLocalStorage(key, true);

  return [shouldShowScreen, setShouldShowScreen] as const;
};
export const UnsupportedChainScreen: React.FC<UnsupportedChainScreenProps> = ({
  style,
  className,
}) => {
  const [shouldShowScreen, setShouldShowScreen] =
    useShouldShowUnsupportedChainScreen();
  // TODO(kimpers): Actual copy
  return (
    <Wrapper style={style} className={className}>
      <StyledBlowfishInvertedWarningIcon />
      <StyledTextXL>Unsupported Chain</StyledTextXL>
      <StyledText>
        This chain is currently not supported. More chains coming soon!
      </StyledText>
      <StyledTextButton onClick={() => setShouldShowScreen(!shouldShowScreen)}>
        <StyledCheckbox checked={!shouldShowScreen} />
        <StyledText style={{ marginBottom: "unset" }}>
          Don&apos;t show this again
        </StyledText>
      </StyledTextButton>
    </Wrapper>
  );
};
