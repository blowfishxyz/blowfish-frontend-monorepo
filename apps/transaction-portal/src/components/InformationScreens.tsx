import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

import { PrimaryButton, TextButton } from "./Buttons";
import { ContentToggle } from "./ContentToggle";
import { Text, TextXL } from "./Typography";
import { shortenHex } from "../utils/hex";
import { chainIdToName } from "@blowfish/utils/chains";
import {
  BlowfishInvertedWarningIcon,
  BlowfishWarningIcon,
} from "./icons/BlowfishWarningIcons";
import { sendPauseResumeSelection } from "~utils/messages";
import { SlimBottomMenu } from "~components/BottomMenus";
import { useLocalStorage } from "react-use";
import {
  BlowfishPausedOptionType,
  PAUSE_DURATIONS,
  PauseDuration,
  PREFERENCES_BLOWFISH_PAUSED,
  useTransactionScannerPauseResume,
} from "@blowfish/hooks";
import { MINIMUM_SUPPORTED_EXTENSION_VERSION } from "~config";
import Row from "./common/Row";
import { getExtensionInstallationUrl } from "~utils/utils";

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

const StyledTextButton = styled(TextButton)`
  display: flex;
  align-items: center;
`;
const ellipsis = keyframes`
  to {
    width: 16px;
  }
`;
const StyledTextWithEllipsisAnimation = styled(StyledText)`
  display: flex;
  width: 190px;
  font-weight: 400;
  opacity: 0.6;

  &:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    animation: ${ellipsis} steps(4, end) 1200ms infinite;
    content: "\\2026"; /* ascii code for the ellipsis character */
    width: 0;
  }
`;

const Spacer = styled(Row)`
  flex: 2;
`;

export interface TransactionBlockedScreenProps {
  onContinue: () => void;
  headline?: string;
  message?: string;
  continueButtonLabel?: string;
  confirmationText?: string;
}

export const TransactionBlockedScreen: React.FC<
  TransactionBlockedScreenProps
> = ({
  onContinue,
  headline = "Transaction Flagged",
  message = "We believe this transaction is malicious and unsafe to sign. Approving may lead to loss of funds",
  continueButtonLabel = "Ignore warning, proceed anyway",
  confirmationText,
}) => {
  const [showConfirmationText, setShowConfirmationText] =
    useState<boolean>(false);

  const continueClicked = () => {
    if (confirmationText) {
      setShowConfirmationText(true);
    }
    onContinue();
  };

  return (
    <Wrapper darkMode>
      <StyledBlowfishWarningIcon severity="CRITICAL" />
      <StyledTextXL darkMode>{headline}</StyledTextXL>
      <StyledText darkMode>{message}</StyledText>
      {showConfirmationText ? (
        <StyledTextWithEllipsisAnimation darkMode>
          {confirmationText}
        </StyledTextWithEllipsisAnimation>
      ) : (
        <StyledTextButton onClick={continueClicked}>
          <StyledText
            darkMode
            style={{
              fontWeight: 400,
              opacity: 0.6,
            }}
          >
            {continueButtonLabel}
          </StyledText>
        </StyledTextButton>
      )}
    </Wrapper>
  );
};

interface TransactionUnsupportedScreenProps {
  closeWindow: () => void;
}

export const TransactionUnsupportedScreen = ({
  closeWindow,
}: TransactionUnsupportedScreenProps) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [scanPaused, setScanPaused] = useLocalStorage<BlowfishPausedOptionType>(
    PREFERENCES_BLOWFISH_PAUSED
  );
  const { pauseScan } = useTransactionScannerPauseResume(
    scanPaused,
    setScanPaused
  );

  useEffect(() => {
    return () => timeoutRef?.current && clearTimeout(timeoutRef.current);
  }, []);

  const pauseScannerAndCloseWindow = async () => {
    pauseScan(PauseDuration.OneHour);
    sendPauseResumeSelection({
      isPaused: true,
      until: Date.now() + PAUSE_DURATIONS[PauseDuration.OneHour],
    });
    timeoutRef.current = setTimeout(() => {
      closeWindow();
    }, 2000);
  };
  return (
    <>
      <TransactionBlockedScreen
        headline="Dangerous unsupported action"
        message="Signing messages with the eth_sign method is dangerous and should be avoided at all times. We cannot simulate the outcomes of this action"
        continueButtonLabel="Ignore warning and turn off Blowfish Protect for 1 hour"
        confirmationText={`Pausing scanning for ${PauseDuration.OneHour}`}
        onContinue={pauseScannerAndCloseWindow}
      />
      <SlimBottomMenu onClick={closeWindow} buttonLabel="Close" />
    </>
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

export interface UnsupportedChainScreenProps {
  style?: React.CSSProperties;
  className?: string;
  onDismissUnsupportedChain: (isDismissed: boolean) => void;
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
          onDismissUnsupportedChain(shouldShowScreen);
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

export interface WrongChainScreenProps {
  style?: React.CSSProperties;
  className?: string;
  currentChainId: number;
  chainIdToConnect: number;
  onRetry: () => void;
  isRetrying?: boolean;
}

export const WrongChainScreen: React.FC<WrongChainScreenProps> = ({
  style,
  className,
  currentChainId,
  chainIdToConnect,
  onRetry,
  isRetrying,
}) => {
  return (
    <Wrapper style={style} className={className}>
      <StyledBlowfishInvertedWarningIcon />
      <StyledTextXL>Wallet connected to the wrong chain</StyledTextXL>
      <StyledText>
        Your are connected to{" "}
        <StyledText semiBold style={{ textTransform: "capitalize" }}>
          {chainIdToName(currentChainId)}
        </StyledText>{" "}
        but attempting to perform an action on{" "}
        <StyledText semiBold style={{ textTransform: "capitalize" }}>
          {chainIdToName(chainIdToConnect)}
        </StyledText>
        .
      </StyledText>
      <RetryButton onRetry={onRetry} isRetrying={isRetrying ?? false}>
        <StyledText>
          Switch to{" "}
          <StyledText style={{ textTransform: "capitalize" }}>
            {chainIdToName(chainIdToConnect)}
          </StyledText>
        </StyledText>
      </RetryButton>
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

export const OutdatedExtensionCTAScreen: React.FC = () => {
  const [extensionInstallationUrl, setExtensionInstallationUrl] = useState<
    string | null
  >();

  useEffect(() => {
    (async () => {
      setExtensionInstallationUrl(await getExtensionInstallationUrl());
    })();
  }, []);

  return (
    <Wrapper>
      <StyledBlowfishInvertedWarningIcon />
      <StyledTextXL>Outdated Extension</StyledTextXL>
      <StyledText>
        The minimum supported extension version is{" "}
        <b>{MINIMUM_SUPPORTED_EXTENSION_VERSION}</b>. Please update the Blowfish
        extension to the latest version and retry the transaction.
      </StyledText>
      <Spacer />
      {extensionInstallationUrl && (
        <PrimaryButton
          onClick={() =>
            // use location replace so the user can't go back
            location.replace(extensionInstallationUrl)
          }
        >
          Update
        </PrimaryButton>
      )}
    </Wrapper>
  );
};

export const TransactionNotFoundScreen: React.FC = () => {
  return (
    <Wrapper>
      <StyledBlowfishInvertedWarningIcon />
      <StyledTextXL>Something went wrong</StyledTextXL>
      <StyledText>Please close the window and try again.</StyledText>
    </Wrapper>
  );
};
