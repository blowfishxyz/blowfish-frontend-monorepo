import walletHero from "data-base64:~assets/wallet-hero.png";
import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";

import "./style.css";

import {
  PauseDuration,
  useTransactionScannerPauseResume,
} from "@blowfish/hooks";
import { PrimaryButton } from "@blowfish/protect-ui/core";
import { CloseIcon, PauseIcon, PlayIcon } from "@blowfish/protect-ui/icons";
import { transformDate } from "@blowfish/utils/helpers";
import {
  BlowfishOption,
  BlowfishPausedOptionType,
} from "@blowfish/utils/types";
import { Column, Row, Text } from "@blowfishxyz/ui";

import { useStorage } from "@plasmohq/storage/hook";

import PauseDurationSelector from "~components/PauseDurationSelector";
import { ClearStorage } from "~components/Popup/ClearStorage";
import { CustomPortalUrl } from "~components/Popup/CustomPortalUrl";
import PopupFooter from "~components/Popup/IconRow";
import Impersonator from "~components/Popup/Impersonator";
import { V2Toggle } from "~components/Popup/V2Toggle";
import {
  BLOWFISH_EXTENSION_VERSION,
  CLEAR_STORAGE_ENABLED,
  CUSTOM_PORTAL_URL_ENABLED,
  IS_IMPERSONATION_AVAILABLE,
  V2_TOGGLE_ENABLED,
} from "~config";

import { PopupContainer } from "./components/PopupContainer";
import { Providers } from "./components/Providers";

const scanNotPaused = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 185, 74, 0.302);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(0, 185, 74, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 185, 74, 0);
  }
`;

const scanPaused = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(197, 56, 56, 0.302);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(197, 56, 56, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(197, 56, 56, 0);
  }
`;

const StyledPopupContainer = styled(PopupContainer)`
  position: relative;
  width: 392px;
  height: 600px;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
`;

const Content = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  width: 100%;
  padding: 58px 30px 0;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;

const Header = styled(Row)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  padding: 20px 20px 8px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.severityColors.INFO.background};
`;

const WalletHeroImage = styled.img<{ isScanPaused: boolean }>`
  margin-bottom: 20px;
  transition: all 0.2s linear;
  filter: ${({ isScanPaused }) => (isScanPaused ? `grayscale(1)` : `none`)};
`;

const StyledOl = styled.ol`
  list-style: none;
  counter-reset: item;
  padding-left: 0;

  li {
    counter-increment: item;
    margin-top: 0.5rem;
    font-weight: 400;
    font-size: 16px;
    line-height: 30px;

    &:before {
      margin-right: 10px;
      content: counter(item);
      background-color: rgba(0, 0, 0, 0.1);
      color: black;
      border-radius: 100%;
      font-weight: 500;
      font-size: 16px;
      line-height: 30px;
      width: 30px;
      height: 30px;
      text-align: center;
      display: inline-block;
    }
  }
`;

const ScannerActionsContainer = styled(Row)`
  width: auto;
  padding: 0 10px;
  margin: 10px 0px 5px;
`;

const ScannerActionWrapper = styled(Column).attrs({
  alignItems: "center",
  justifyContent: "center",
  alignContent: "center",
  marginRight: 6,
})<{ $darkBackground?: boolean }>`
  cursor: pointer;
  width: 25px;
  min-width: 25px;
  height: 25px;
  border-radius: 100%;
  transition: all 0.2s linear;
  background-color: ${({ theme, $darkBackground }) =>
    $darkBackground
      ? theme.colors.foregroundPrimary
      : theme.colors.backgroundPrimary};

  svg {
    width: 10px;
    height: 10px;
    fill: ${({ theme, $darkBackground }) =>
      $darkBackground
        ? theme.colors.backgroundPrimary
        : theme.colors.foregroundPrimary};
  }
`;

const Indicator = styled.div<{ paused: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 100%;
`;

const StatusIndicatorWrapper = styled(Row)<{ paused: boolean }>`
  font-size: 12px;

  ${Indicator} {
    ${({ paused, theme }) => {
      if (paused) {
        return css`
          background-color: ${theme.colors.danger};
          width: 7px;
          height: 7px;
          animation: ${scanPaused} 2s infinite ease-in-out;
        `;
      } else {
        return css`
          background-color: rgba(0, 191, 54, 0.8);
          width: 7px;
          height: 7px;
          animation: ${scanNotPaused} 2s infinite ease-in-out;
        `;
      }
    }};
  }
`;

const InfoContainer = styled.div``;

const ExtensionVersion = styled(Text).attrs({
  size: "xs",
  $design: "secondary",
})``;

const StatusIndicator = ({
  paused,
  until,
}: {
  paused: boolean;
  until: number | null;
}) => {
  return (
    <StatusIndicatorWrapper gap="sm" alignItems="center" paused={paused}>
      <Indicator paused={paused} />
      {paused && until ? (
        <Text size="sm">Scanning Paused until {transformDate(until)}</Text>
      ) : (
        <Text size="sm">Running</Text>
      )}
    </StatusIndicatorWrapper>
  );
};

const Popup: React.FC = () => {
  const [scanPaused, setScanPaused] = useStorage<BlowfishPausedOptionType>(
    BlowfishOption.PREFERENCES_BLOWFISH_PAUSED
  );
  const { pauseScan, resumeScan, isScanPaused, scanPausedUntil } =
    useTransactionScannerPauseResume(scanPaused, setScanPaused);
  const [showDurationSelector, setShowDurationSelector] = useState(false);

  const onActionClick = () => {
    if (showDurationSelector) {
      setShowDurationSelector(false);
      return;
    }
    if (isScanPaused) {
      resumeScan();
      return;
    }

    setShowDurationSelector(true);
  };

  const onDurationSelect = (duration: PauseDuration) => {
    setShowDurationSelector(false);
    pauseScan(duration);
  };
  return (
    <StyledPopupContainer>
      <Header alignItems="center" justifyContent="space-between">
        <StatusIndicator
          paused={isScanPaused ?? false}
          until={scanPausedUntil ?? null}
        />
        <ExtensionVersion>v{BLOWFISH_EXTENSION_VERSION}</ExtensionVersion>
      </Header>
      <Content>
        <WalletHeroImage
          src={walletHero}
          alt="wallet"
          width={180}
          height={180}
          isScanPaused={isScanPaused ?? false}
        />
        <Column gap="sm" alignSelf="flex-start">
          <Text size="xxl" weight="semi-bold">
            You’re protected!
          </Text>
          <Text size="md" $design="secondary">
            Blowfish is actively scanning. To invoke it...
          </Text>
        </Column>
        <Column flex={1} alignSelf="flex-start" width="100%">
          <StyledOl>
            <Text as="li" size="md">
              Start a transaction on a web3 app
            </Text>
            <Text as="li" size="md">
              Check Blowfish before your wallet
            </Text>
            <Text as="li" size="md">
              Confirm transaction with confidence
            </Text>
          </StyledOl>
          <div onClick={onActionClick}>
            {showDurationSelector ? (
              <ScannerActionsContainer
                alignItems="center"
                alignContent="center"
              >
                <ScannerActionWrapper $darkBackground>
                  <CloseIcon />
                </ScannerActionWrapper>
                {showDurationSelector && (
                  <PauseDurationSelector
                    onClick={(period) => onDurationSelect(period)}
                  />
                )}
              </ScannerActionsContainer>
            ) : (
              <PrimaryButton>
                <ScannerActionWrapper>
                  {isScanPaused ? <PlayIcon /> : <PauseIcon />}
                </ScannerActionWrapper>
                {!showDurationSelector && (
                  <InfoContainer>
                    {isScanPaused && (
                      <Text $design="tertiary" size="lg">
                        Click to start scanning
                      </Text>
                    )}
                    {!isScanPaused && (
                      <Text $design="tertiary" size="lg">
                        Click to pause scanning
                      </Text>
                    )}
                  </InfoContainer>
                )}
              </PrimaryButton>
            )}
          </div>
        </Column>
        {IS_IMPERSONATION_AVAILABLE && <Impersonator />}
        {CUSTOM_PORTAL_URL_ENABLED && <CustomPortalUrl />}
        {V2_TOGGLE_ENABLED && <V2Toggle />}
        {CLEAR_STORAGE_ENABLED && <ClearStorage />}
        <PopupFooter />
      </Content>
    </StyledPopupContainer>
  );
};

const Page: React.FC = () => (
  <Providers>
    <Popup />
  </Providers>
);

export default Page;
