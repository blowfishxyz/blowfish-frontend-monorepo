import React, { useState, PropsWithChildren } from "react";
import styled from "styled-components";

import { logger } from "../utils/logger";
import { TextButton } from "./Buttons";
import { ContentToggle } from "./ContentToggle";
import { Text, TextXL } from "./Typography";
import { shortenHex } from "../utils/hex";
import {
  BlowfishInvertedWarningIcon,
  BlowfishWarningIcon,
} from "./icons/BlowfishWarningIcons";

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

interface RetryButtonProps extends PropsWithChildren {
  onRetry: () => void;
  isRetrying: boolean;
}
const RetryButton: React.FC<RetryButtonProps> = ({
  onRetry,
  isRetrying,
  children,
}) => {
  return isRetrying ? (
    <StyledText style={{ opacity: 0.5 }}>Loading...</StyledText>
  ) : (
    <TextButton onClick={onRetry}>
      <StyledText style={{ opacity: 0.5 }}>{children}</StyledText>
    </TextButton>
  );
};

export interface SimulationErrorScreenProps {
  style?: React.CSSProperties;
  className?: string;
  headline: string;
  message: string;
  errorMessage?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
}
export const SimulationErrorScreen: React.FC<SimulationErrorScreenProps> = ({
  style,
  className,
  headline,
  message,
  errorMessage,
  onRetry,
  isRetrying,
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
      {onRetry && (
        <RetryButton onRetry={onRetry} isRetrying={isRetrying ?? false}>
          <StyledText>Retry this transaction</StyledText>
        </RetryButton>
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
  onDismissUnsupportedChain: (isDismissed: boolean) => Promise<void>;
}

export const UnsupportedChainScreen: React.FC<UnsupportedChainScreenProps> = ({
  style,
  className,
  onDismissUnsupportedChain,
}) => {
  const [shouldShowScreen, setShouldShowScreen] = useState<boolean>(true);
  // TODO(kimpers): Actual copy
  return (
    <Wrapper style={style} className={className}>
      <StyledBlowfishInvertedWarningIcon />
      <StyledTextXL>Unsupported Chain</StyledTextXL>
      <StyledText>
        This chain is currently not supported. More chains coming soon!
      </StyledText>
      <StyledTextButton
        onClick={() => {
          setShouldShowScreen(!shouldShowScreen);
          // NOTE: we invert the boolean because we store whether it's been dismissed
          onDismissUnsupportedChain(shouldShowScreen).catch((err) =>
            logger.error(err)
          );
        }}
      >
        <StyledCheckbox checked={!shouldShowScreen} />
        <StyledText style={{ marginBottom: "unset" }}>
          Don&apos;t show this again
        </StyledText>
      </StyledTextButton>
    </Wrapper>
  );
};

export interface AccountNotConnectedScreenProps {
  style?: React.CSSProperties;
  className?: string;
  accountToConnect: string;
  connectedAccount?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
}

export const AccountNotConnectedScreen: React.FC<
  AccountNotConnectedScreenProps
> = ({
  style,
  className,
  accountToConnect,
  connectedAccount,
  onRetry,
  isRetrying,
}) => {
  return (
    <Wrapper style={style} className={className}>
      <StyledBlowfishInvertedWarningIcon />
      <StyledTextXL>
        {connectedAccount ? "Wrong account connected" : "Account not connected"}
      </StyledTextXL>

      {connectedAccount ? (
        <StyledText>
          You are connected with{" "}
          <StyledText semiBold>{shortenHex(connectedAccount, 5)}</StyledText>,
          but are trying to perform an action for{" "}
          <StyledText semiBold>{accountToConnect}</StyledText>. Please switch to
          the correct account in your wallet
        </StyledText>
      ) : (
        <>
          <StyledText>
            Please connect <StyledText semiBold>{accountToConnect}</StyledText>{" "}
            to Blowfish&nbsp;Protect in order to proceed with the action
          </StyledText>
          {onRetry && (
            <RetryButton onRetry={onRetry} isRetrying={isRetrying ?? false}>
              <StyledText>Connect account</StyledText>
            </RetryButton>
          )}
        </>
      )}
    </Wrapper>
  );
};

export interface UnknownErrorScreenProps {
  style?: React.CSSProperties;
  className?: string;
  onRetry: () => void;
  isRetrying: boolean;
}

export const UnknownErrorScreen: React.FC<UnknownErrorScreenProps> = ({
  style,
  className,
  onRetry,
  isRetrying,
}) => {
  return (
    <Wrapper style={style} className={className}>
      <StyledBlowfishInvertedWarningIcon />
      <StyledTextXL>Something went wrong</StyledTextXL>
      <StyledText>
        Something unexpected happened. Please try again later.
      </StyledText>
      <RetryButton onRetry={onRetry} isRetrying={isRetrying}>
        <StyledText>Retry this transaction</StyledText>
      </RetryButton>
    </Wrapper>
  );
};
