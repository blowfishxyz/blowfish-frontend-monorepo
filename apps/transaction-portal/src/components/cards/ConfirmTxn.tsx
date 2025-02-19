import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Row, UIWarning } from "@blowfishxyz/ui";
import { PendingView } from "~components/txn-views/PendingView";
import { ConfirmingView } from "~components/txn-views/ConfirmingView";
import { Severity } from "@blowfish/utils/types";
import { sleep } from "~utils/utils";
import { SendTransactionResult } from "@wagmi/core";
import { SuccessView } from "~components/txn-views/SuccessView";
import { DefaultView } from "~components/txn-views/DefaultView";
import { useLayoutConfig } from "~components/layout/Layout";

const ViewState = {
  WARNING: "warning",
  CONFIRMING: "confirming",
  PENDING: "pending",
  SUCCESS: "success",
} as const;

type ViewStateType = (typeof ViewState)[keyof typeof ViewState];

const animationDuration = 300;

const Wrapper = styled(Row)`
  width: 100%;

  @media (min-width: 800px) {
    width: auto;
    min-width: 460px;
  }
`;

const WrapperInner = styled(Row)`
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
  onContinue: () => Promise<SendTransactionResult | void>;
  onReport: () => Promise<void>;
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
  const [txHash, setTxHash] = useState<string | undefined>(undefined);
  const [layoutConfig] = useLayoutConfig();

  const handleContinueClick = useCallback(async () => {
    if (!layoutConfig.canConfirmTxn) {
      return;
    }
    setAnimating(true);
    await sleep(animationDuration);
    setAnimating(false);
    setViewState(ViewState.CONFIRMING);

    const result = await onContinue();

    if (result) {
      const { hash, wait } = result;
      setTxHash(hash);
      setAnimating(true);
      await sleep(animationDuration);
      setAnimating(false);
      setViewState(ViewState.PENDING);

      await wait(1);

      setAnimating(true);
      await sleep(animationDuration);
      setAnimating(false);
      setViewState(ViewState.SUCCESS);
    }
  }, [onContinue, layoutConfig.canConfirmTxn]);

  const getContent = () => {
    switch (viewState) {
      case ViewState.WARNING:
        return (
          <DefaultView
            severity={severity}
            warnings={warnings}
            onContinue={
              layoutConfig.canConfirmTxn ? handleContinueClick : undefined
            }
            onCancel={onCancel}
            onReport={onReport}
          />
        );
      case ViewState.CONFIRMING:
        return <ConfirmingView onCancel={onCancel} />;
      case ViewState.PENDING:
        return <PendingView onReport={onReport} txHash={txHash || ""} />;
      case ViewState.SUCCESS:
        return <SuccessView onReport={onReport} txHash={txHash || ""} />;
      default:
        return null;
    }
  };

  return (
    <Wrapper
      borderRadius={12}
      backgroundColor="backgroundPrimary"
      flex={1}
      marginBottom={32}
    >
      <WrapperInner
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
      </WrapperInner>
    </Wrapper>
  );
};
