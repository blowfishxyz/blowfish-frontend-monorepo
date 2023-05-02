import React, { useState, useEffect, useCallback } from "react";
import { styled } from "styled-components";
import { TextXL, Column, GrayText, device } from "@blowfish/ui/core";
import {
  CardWrapper,
  CardContent,
  CardText,
  CardSmallSecondaryButton,
  CardRow,
  CardPrimaryButton,
} from "./common";
import PendingView from "~components/txn-views/PendingView";
import ConfirmingView from "~components/txn-views/ConfirmingView";

const StyledCardWrapper = styled(CardWrapper)`
  flex: unset;
  width: 100%;

  @media (${device.lg}) {
    width: 45%;
  }
`;

const CenterContent = styled.div`
  text-align: center;
  width: 100%;
`;

const ConfirmTxnTitle = styled(TextXL)`
  font-size: 22px;

  @media (${device.lg}) {
    font-size: 26px;
  }
`;

const ConfirmTxnInstruction = styled(GrayText)`
  font-size: 14px;

  @media (${device.lg}) {
    font-size: 16px;
  }
`;

const ViewState = {
  WARNING: "warning",
  CONFIRMING: "confirming",
  PENDING: "pending",
} as const;

type ViewStateType = (typeof ViewState)[keyof typeof ViewState];

const animationDuration = 300;

const Fade = styled.div`
  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: opacity ${animationDuration}ms;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: opacity ${animationDuration}ms;
  }
`;

const ConfirmTxn: React.FC = () => {
  const [viewState, setViewState] = useState<ViewStateType>(ViewState.WARNING);
  const [animating, setAnimating] = useState(false);

  // NOTE: This is just to simulate an actual txn loading, it can/should be removed during integration
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (viewState === ViewState.CONFIRMING) {
      timeout = setTimeout(() => {
        setViewState(ViewState.PENDING);
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [viewState]);

  const handleContinueClick = useCallback(() => {
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      setViewState(ViewState.CONFIRMING);
    }, animationDuration);
  }, []);

  const renderContent = () => {
    switch (viewState) {
      case ViewState.WARNING:
        return (
          <>
            <Column gap="md">
              <ConfirmTxnTitle>This seems low risk.</ConfirmTxnTitle>
              <CardText>
                This application is requesting permission to exchange assets
                that are held in your wallet for others.
              </CardText>
            </Column>
            <CardRow gap="md">
              <CardSmallSecondaryButton>Flag</CardSmallSecondaryButton>
              <CardPrimaryButton onClick={handleContinueClick}>
                Continue
              </CardPrimaryButton>
            </CardRow>
            <CenterContent>
              <ConfirmTxnInstruction>
                Click Continue to proceed to your wallet.
              </ConfirmTxnInstruction>
            </CenterContent>
          </>
        );
      case ViewState.CONFIRMING:
        return <ConfirmingView />;
      case ViewState.PENDING:
        return <PendingView />;
      default:
        return null;
    }
  };

  return (
    <StyledCardWrapper>
      <CardContent>
        <Fade
          className={
            animating
              ? viewState === ViewState.WARNING
                ? "fade-exit-active"
                : "fade-enter-active"
              : ""
          }
        >
          {renderContent()}
        </Fade>
      </CardContent>
    </StyledCardWrapper>
  );
};

export default React.memo(ConfirmTxn);
