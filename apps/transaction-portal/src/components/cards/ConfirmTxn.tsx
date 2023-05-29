import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import {
  Column,
  PrimaryButton,
  Row,
  SecondaryButton,
  Text,
} from "@blowfish/ui/core";
import { ContinueIcon, ReportIcon } from "@blowfish/ui/icons";
import { CardWrapper, CardContent } from "./common";
import { PendingView } from "~components/txn-views/PendingView";
import { ConfirmingView } from "~components/txn-views/ConfirmingView";
import { UIWarning } from "~modules/scan/components/ScanResultsV2";

const StyledCardWrapper = styled(CardWrapper)`
  flex: unset;
  width: 100%;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

const CancelButton = styled(SecondaryButton)`
  height: 46px;
  font-size: 15px;
  border: 1px solid ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.danger};
`;

const ReportButton = styled(SecondaryButton)`
  height: 46px;
  font-size: 15px;
`;

const ContinueButton = styled(PrimaryButton)`
  height: 46px;
  font-size: 18px;
`;

const ConfirmTxnWarningMsg = styled(Text).attrs({
  size: "sm",
  design: "primary",
})`
  max-width: 300px;
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

export interface ConfirmTxnProps {
  onContinue: () => void;
  onCancel: () => void;
  warnings: UIWarning[] | undefined;
  severity: string | undefined;
}

export const ConfirmTxn: React.FC<ConfirmTxnProps> = ({
  onContinue,
  onCancel,
  warnings,
  severity,
}) => {
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

  const getWarningTitle = () => {
    if (severity === "CRITICAL") {
      return <Text size="xl">Do not proceed!</Text>;
    } else if (severity === "WARNING") {
      return (
        <Text size="xl">
          This seems{" "}
          <Text design="warning" size="xl" weight="semi-bold">
            fishy...
          </Text>
        </Text>
      );
    } else {
      return (
        <Text size="xl">
          This seems{" "}
          <Text design="success" size="xl" weight="semi-bold">
            low risk
          </Text>
        </Text>
      );
    }
  };

  const getContent = () => {
    switch (viewState) {
      case ViewState.WARNING:
        return (
          <Row justifyContent="space-between" alignItems="center" gap="lg">
            <Column gap="md" flex={1}>
              <Text size="xl">{getWarningTitle()}</Text>
              {warnings?.length ? (
                warnings?.map((warning, index) => (
                  <ConfirmTxnWarningMsg key={index}>
                    {warning.message}
                  </ConfirmTxnWarningMsg>
                ))
              ) : (
                <ConfirmTxnWarningMsg>
                  This signature request seems to be trustworthy. If something
                  feels fishy, you should report it.
                </ConfirmTxnWarningMsg>
              )}
            </Column>
            <Column gap="md" flex={0.7}>
              <Row gap="md">
                {severity === "INFO" ? (
                  <ContinueButton onClick={onContinue}>
                    <ContinueIcon />
                    Continue
                  </ContinueButton>
                ) : (
                  <ContinueButton>
                    <ReportIcon />
                    Report
                  </ContinueButton>
                )}
              </Row>
              <Row gap="md">
                <CancelButton onClick={onCancel}>Cancel</CancelButton>
                {severity === "INFO" ? (
                  <ReportButton onClick={handleContinueClick}>
                    Report
                  </ReportButton>
                ) : severity === "WARNING" ? (
                  <ReportButton onClick={handleContinueClick}>
                    Continue
                  </ReportButton>
                ) : null}
              </Row>
            </Column>
          </Row>
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
          {getContent()}
        </Fade>
      </CardContent>
    </StyledCardWrapper>
  );
};
