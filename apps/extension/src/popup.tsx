import walletHero from "data-base64:~assets/wallet-hero.png";
import React, { useState } from "react";
import styled from "styled-components";

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
import { PauseIcon } from "~components/icons/PauseIcon";
import { PlayIcon } from "~components/icons/PlayIcon";
import { IS_IMPERSONATION_AVAILABLE } from "~config";
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
  padding: 20px 0;
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

const StatusIndicatorWrapper = styled(Row)<{ paused: boolean }>`
  font-size: 12px;

  ${Indicator} {
    background-color: ${({ paused, theme }) =>
      paused
        ? `${opacify(80, theme.palette.yellow)}`
        : `${opacify(80, theme.palette.green)}`};
  }

  color: ${({ paused, theme }) =>
    paused
      ? `${opacify(80, theme.palette.yellow)}`
      : `${opacify(80, theme.palette.green)}`};
`;

const InfoContainer = styled.div`
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
        <>Paused until {transformDate(until)}</>
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
      <StatusIndicator
        paused={isScanPaused ?? false}
        until={scanPausedUntil ?? null}
      />
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
            disabled={showDurationSelector}
          >
            {isScanPaused ? <PlayIcon /> : <PauseIcon />}
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
