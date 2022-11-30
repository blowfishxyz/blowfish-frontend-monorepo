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
  darkMode?: boolean;
}
const StyledTextXL = styled(TextXL)<SharedProps>`
  text-align: center;
  margin-bottom: 32px;
  color: ${({ darkMode, theme }) =>
    darkMode ? theme.palette.warningText : theme.palette.black};
`;
const StyledText = styled(Text)<SharedProps>`
  text-align: center;
  margin-bottom: 32px;
  line-height: 22px;
  color: ${({ darkMode, theme }) =>
    darkMode ? theme.palette.warningText : theme.palette.black};
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
  background-color: ${({ darkMode, theme }) =>
    darkMode ? "#340000" : theme.palette.white};
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

export interface TransactionBlockedScreenProps {
  onContinue: () => void;
}
export const TransactionBlockedScreen: React.FC<
  TransactionBlockedScreenProps
> = ({ onContinue }) => {
  return (
    <Wrapper darkMode>
      <StyledBlowfishWarningIcon severity="CRITICAL" />
      <StyledTextXL darkMode>Transaction Flagged</StyledTextXL>
      <StyledText darkMode>
        We believe this transaction is malicious and unsafe to sign. Approving
        may lead to loss of funds
      </StyledText>
      <StyledTextButton onClick={onContinue}>
        <StyledText
          darkMode
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

export interface SimulationErrorScreenProps {
  style?: React.CSSProperties;
  className?: string;
  headline: string;
  message: string;
  errorMessage?: string;
}
export const SimulationErrorScreen: React.FC<SimulationErrorScreenProps> = ({
  style,
  className,
  headline,
  message,
  errorMessage,
}) => {
  return (
    <Wrapper style={style} className={className}>
      <StyledBlowfishInvertedWarningIcon />
      <StyledTextXL>{headline}</StyledTextXL>
      <StyledText>{message}</StyledText>
      {errorMessage && (
        <ContentToggle message="View error message">
          <WarningMessageWrapper>
            <Text>{errorMessage}</Text>
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
