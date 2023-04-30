import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import {
  PrimaryButton,
  TextXL,
  Column,
  GrayText,
  size,
} from "@blowfish/ui/core";
import {
  CardWrapper,
  CardContent,
  CardText,
  CardSmallSecondaryButton,
  CardRow,
} from "./common";
import PendingView from "~components/txn-views/PendingView";
import ConfirmingView from "~components/txn-views/ConfirmingView";

const StyledCardWrapper = styled(CardWrapper)`
  flex: unset;
  width: 45%;

  @media only screen and (max-width: ${size.lg}) {
    width: unset;
  }
`;

const CenterContent = styled.div`
  text-align: center;
  width: 100%;
`;

const ViewState = {
  WARNING: "warning",
  CONFIRMING: "confirming",
  PENDING: "pending",
} as const;

type ViewStateType = (typeof ViewState)[keyof typeof ViewState];

const ConfirmTxn: React.FC = () => {
  const [viewState, setViewState] = useState<ViewStateType>(ViewState.WARNING);

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

  const handleContinueClick = () => {
    setViewState(ViewState.CONFIRMING);
  };

  const renderContent = () => {
    switch (viewState) {
      case ViewState.WARNING:
        return (
          <>
            <Column gap="md">
              <TextXL>This seems low risk.</TextXL>
              <CardText>
                This application is requesting permission to exchange assets
                that are held in your wallet for others.
              </CardText>
            </Column>
            <CardRow gap="md">
              <CardSmallSecondaryButton>Flag</CardSmallSecondaryButton>
              <PrimaryButton onClick={handleContinueClick}>
                Continue
              </PrimaryButton>
            </CardRow>
            <CenterContent>
              <GrayText>Click Continue to proceed to your wallet.</GrayText>
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
      <CardContent>{renderContent()}</CardContent>
    </StyledCardWrapper>
  );
};

export default ConfirmTxn;
