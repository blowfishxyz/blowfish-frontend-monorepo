import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import {
  Button,
  Column,
  PrimaryButton,
  Row,
  SecondaryButton,
  Text,
} from "@blowfish/ui/core";
import { ContinueIcon, ReportIcon } from "@blowfish/ui/icons";
import { PendingView } from "~components/txn-views/PendingView";
import { ConfirmingView } from "~components/txn-views/ConfirmingView";
import { UIWarning } from "~modules/scan/components/ScanResultsV2";
import { Severity } from "@blowfish/utils/types";

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

const Wrapper = styled(Row)`
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
  severity: Severity | undefined;
}

export const ConfirmTxn: React.FC<ConfirmTxnProps> = ({
  onContinue,
  onCancel,
  warnings,
  severity,
}) => {
  const [viewState, setViewState] = useState<ViewStateType>(ViewState.WARNING);
  const [animating, setAnimating] = useState(false);

  const handleContinueClick = useCallback(() => {
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      setViewState(ViewState.CONFIRMING);
    }, animationDuration);
  }, []);

  const getWarningTitle = () => {
    if (severity === "CRITICAL") {
      return (
        <Text size="xl" weight="semi-bold">
          Do not proceed!
        </Text>
      );
    } else if (severity === "WARNING") {
      return (
        <Text size="xl" weight="semi-bold">
          This seems{" "}
          <Text design="warning" size="xl" weight="semi-bold">
            fishy...
          </Text>
        </Text>
      );
    } else {
      return (
        <Text size="xl" weight="semi-bold">
          This is low risk
        </Text>
      );
    }
  };

  const getDescription = () => {
    if (severity === "CRITICAL") {
      return (
        <Text size="sm">
          We believe this transaction is malicious and unsafe to sign, and is
          likely to steal funds.
        </Text>
      );
    } else if (severity === "WARNING") {
      return (
        <Text size="sm">
          This transaction does not appear to be safe. We strongly recommend
          that you do not proceed.
        </Text>
      );
    } else {
      return (
        <Text size="sm">
          This signature request seems to be trustworthy. If something feels
          fishy, you should report it.
        </Text>
      );
    }
  };

  const getContent = () => {
    switch (viewState) {
      case ViewState.WARNING:
        return (
          <Row
            width="100%"
            justifyContent="space-between"
            alignItems="center"
            gap="lg"
          >
            <Column gap="xs" flex={1}>
              {getWarningTitle()}
              {getDescription()}
            </Column>
            <Column gap="md" flex={1}>
              <Row gap="md">
                {severity === "INFO" ? (
                  <Button stretch onClick={onContinue}>
                    <ContinueIcon />
                    Continue
                  </Button>
                ) : (
                  <Button stretch>
                    <ReportIcon />
                    Report
                  </Button>
                )}
              </Row>
              <Row gap="md">
                <Button stretch design="secondary" onClick={onCancel}>
                  Cancel
                </Button>
                {severity === "INFO" ? (
                  <Button
                    stretch
                    design="primary"
                    onClick={handleContinueClick}
                  >
                    Report
                  </Button>
                ) : (
                  <Button stretch design="danger" onClick={handleContinueClick}>
                    Continue
                  </Button>
                )}
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
    <Wrapper
      className={
        animating
          ? viewState === ViewState.WARNING
            ? "fade-exit-active"
            : "fade-enter-active"
          : ""
      }
      backgroundColor="backgroundSecondary"
      borderRadius={12}
      padding={24}
      width="100%"
    >
      {getContent()}
    </Wrapper>
  );
};
