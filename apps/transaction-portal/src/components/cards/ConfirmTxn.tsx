import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { Button, Column, Row, Text } from "@blowfish/ui/core";
import { ContinueIcon, ReportIcon } from "@blowfish/ui/icons";
import { PendingView } from "~components/txn-views/PendingView";
import { ConfirmingView } from "~components/txn-views/ConfirmingView";
import { UIWarning } from "~modules/scan/components/ScanResultsV2";
import { Severity } from "@blowfish/utils/types";

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
  onReport: () => void;
  onCancel: () => void;
  warnings: UIWarning[] | undefined;
  severity: Severity | undefined;
}

export const ConfirmTxn: React.FC<ConfirmTxnProps> = ({
  onContinue,
  onCancel,
  onReport,
  warnings,
  severity,
}) => {
  const [viewState, setViewState] = useState<ViewStateType>(ViewState.WARNING);
  const [animating, setAnimating] = useState(false);

  const handleContinueClick = useCallback(() => {
    setAnimating(true);
    onContinue();
    setTimeout(() => {
      setAnimating(false);
      setViewState(ViewState.CONFIRMING);
    }, animationDuration);
  }, [onContinue]);

  const getContent = () => {
    switch (viewState) {
      case ViewState.WARNING:
        return (
          <DefaultView
            severity={severity}
            onContinue={handleContinueClick}
            onCancel={onCancel}
            onReport={onReport}
          />
        );
      case ViewState.CONFIRMING:
        return <ConfirmingView onCancel={onCancel} />;
      case ViewState.PENDING:
        return <PendingView />;
      default:
        return null;
    }
  };

  return (
    <Row backgroundColor="backgroundSecondary" borderRadius={12} width="100%">
      <Wrapper
        padding={24}
        width="100%"
        className={
          animating
            ? viewState === ViewState.WARNING
              ? "fade-exit-active"
              : "fade-enter-active"
            : ""
        }
      >
        {getContent()}
      </Wrapper>
    </Row>
  );
};

const DefaultView: React.FC<{
  severity: Severity | undefined;
  onContinue: () => void;
  onCancel: () => void;
  onReport: () => void;
}> = ({ severity, onContinue, onCancel, onReport }) => {
  const title = useMemo(() => {
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
  }, [severity]);

  const description = useMemo(() => {
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
  }, [severity]);

  const buttons = useMemo(() => {
    if (severity === "WARNING" || severity === "CRITICAL") {
      return (
        <>
          <Row gap="md">
            <Button stretch onClick={onReport}>
              <ReportIcon />
              Report
            </Button>
          </Row>
          <Row gap="md">
            <Button size="sm" stretch design="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button size="sm" stretch design="danger" onClick={onContinue}>
              Continue
            </Button>
          </Row>
        </>
      );
    }

    return (
      <>
        <Row gap="md">
          <Button stretch onClick={onContinue}>
            <ContinueIcon />
            Continue
          </Button>
        </Row>
        <Row gap="md">
          <Button size="sm" stretch design="danger" onClick={onCancel}>
            Cancel
          </Button>
          <Button size="sm" stretch design="secondary" onClick={onReport}>
            Report
          </Button>
        </Row>
      </>
    );
  }, [severity, onCancel, onContinue, onReport]);

  return (
    <Row
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      gap="lg"
    >
      <Column gap="xs" flex={1}>
        {title}
        {description}
      </Column>
      <Column gap="md" flex={1}>
        {buttons}
      </Column>
    </Row>
  );
};
