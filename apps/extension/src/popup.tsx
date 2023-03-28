import walletHero from "data-base64:~assets/wallet-hero.png";
import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";

import "./style.css";

import type { BlowfishPausedOptionType } from "@blowfish/hooks";
import {
  PREFERENCES_BLOWFISH_PAUSED,
  PauseDuration,
  useTransactionScannerPauseResume,
} from "@blowfish/hooks";

import { useStorage } from "@plasmohq/storage/hook";

import { PrimaryButton } from "~components/Buttons";
import PauseDurationSelector from "~components/PauseDurationSelector";
import PopupFooter from "~components/Popup/IconRow";
import Impersonator from "~components/Popup/Impersonator";
import { Column } from "~components/common/Column";
import Row from "~components/common/Row";
import { CloseIcon } from "~components/icons/CloseIcon";
import { PauseIcon } from "~components/icons/PauseIcon";
import { PlayIcon } from "~components/icons/PlayIcon";
import {
  BLOWFISH_EXTENSION_VERSION,
  IS_IMPERSONATION_AVAILABLE,
} from "~config";
import { opacify, transformDate } from "~utils/utils";

import { PopupContainer } from "./components/PopupContainer";
import { Providers } from "./components/Providers";
import { Text, TextXL } from "./components/Typography";
import { BlowfishIcon } from "./components/icons/BlowfishIcon";

const StyledPopupContainer = styled(PopupContainer)`
  position: relative;
  width: 392px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const WalletHeroImage = styled.img<{ isScanPaused: boolean }>`
  margin: 20px 0;
  transition: all 0.2s linear;
  filter: ${({ isScanPaused }) => (isScanPaused ? `grayscale(1)` : `none`)};
`;

const StyledOl = styled.ol`
  list-style: none;
  counter-reset: item;
  padding-left: 0;
  margin-left: 10px;

  li {
    counter-increment: item;
    margin-top: 0.5rem;

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
`;

const ScannerActionButton = styled(PrimaryButton)<{ paused: boolean }>`
  width: 50px;
  min-width: 50px;
  height: 50px;
  border-radius: 100%;
  border: none;
  cursor: pointer;
  transition: all 0.2s linear;

  svg {
    width: 25px;
    height: 25px;
    fill: white;
  }
`;

const Indicator = styled.div<{ paused: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 100%;
`;
const blink = keyframes`
  50% {
    opacity: 0.5;
  }
`;
const StatusIndicatorWrapper = styled(Row)<{ paused: boolean }>`
  font-size: 12px;

  ${Indicator} {
    ${({ paused, theme }) => {
      if (paused) {
        return css`
          background-color: ${theme.palette.red};
        `;
      } else {
        return css`
          background-color: ${opacify(80, theme.palette.green)};
          animation: ${blink} 2s ease-in-out infinite;
        `;
      }
    }};
  }
  color: ${({ paused, theme }) =>
    paused ? `${theme.palette.red}` : `${opacify(80, theme.palette.green)}`};
`;

const InfoContainer = styled.div`
  opacity: 0.2;
`;

const ExtensionVersion = styled(Text)`
  font-size: 12px;
  opacity: 0.2;
`;

const StatusIndicator = ({
  paused,
  until,
}: {
  paused: boolean;
  until: number | null;
}) => {
  return (
    <StatusIndicatorWrapper gap="sm" paused={paused}>
      <Indicator paused={paused} />
      {paused && until ? (
        <>Scanning Paused until {transformDate(until)}</>
      ) : (
        <>Running</>
      )}
    </StatusIndicatorWrapper>
  );
};

const Popup: React.FC = () => {
  const [scanPaused, setScanPaused] = useStorage<BlowfishPausedOptionType>(
    PREFERENCES_BLOWFISH_PAUSED
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
      <Row>
        <StatusIndicator
          paused={isScanPaused ?? false}
          until={scanPausedUntil ?? null}
        />
        <ExtensionVersion>v.{BLOWFISH_EXTENSION_VERSION}</ExtensionVersion>
      </Row>
      <WalletHeroImage
        src={walletHero}
        alt="wallet"
        width={160}
        height={160}
        isScanPaused={isScanPaused ?? false}
      />
      <Row gap="sm">
        <BlowfishIcon />
        <TextXL>Blowfish</TextXL>
      </Row>
      <Column flex={1}>
        <StyledOl>
          <Text as="li">Invoke a transaction on web3</Text>
          <Text as="li">Check Blowfish before your wallet</Text>
          <Text as="li">Confirm transaction with confidence</Text>
        </StyledOl>
        <ScannerActionsContainer gap="md">
          <ScannerActionButton
            paused={isScanPaused ?? false}
            onClick={onActionClick}
          >
            {showDurationSelector ? (
              <CloseIcon />
            ) : isScanPaused ? (
              <PlayIcon />
            ) : (
              <PauseIcon />
            )}
          </ScannerActionButton>
          {!showDurationSelector && (
            <InfoContainer>
              {isScanPaused && <Text>Click to start scanning</Text>}
              {!isScanPaused && <Text>Click to pause scanning</Text>}
            </InfoContainer>
          )}
          {showDurationSelector && (
            <PauseDurationSelector
              onClick={(period) => onDurationSelect(period)}
            />
          )}
        </ScannerActionsContainer>
      </Column>
      {IS_IMPERSONATION_AVAILABLE && <Impersonator />}
      <PopupFooter />
    </StyledPopupContainer>
  );
};

const Page: React.FC = () => (
  <Providers>
    <Popup />
  </Providers>
);

export default Page;
