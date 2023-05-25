import { logger } from "@blowfish/utils/logger";
import {
  Severity,
  SignTypedDataVersion,
  actionToSeverity,
  isSignMessageRequest,
  isSignTypedDataRequest,
  isTransactionRequest,
} from "@blowfish/utils/types";
import {
  prepareSendTransaction,
  sendTransaction,
  signTypedData,
} from "@wagmi/core";
import { useModal } from "connectkit";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useAccount, useChainId, useDisconnect, useSwitchNetwork } from "wagmi";

import { useGetRequestParams } from "~hooks/useGetRequestParams";
import { useScanDappRequest } from "~hooks/useScanDappRequest";
import { sendAbort, sendResult } from "~utils/messages";

import { ApproveBottomMenu, SlimBottomMenu } from "../BottomMenus";
import {
  AccountNotConnectedScreen,
  OutdatedExtensionCTAScreen,
  SimulationErrorScreen,
  TransactionBlockedScreen,
  TransactionNotFoundScreen,
  TransactionUnsupportedScreen,
  UnknownErrorScreen,
  UnsupportedChainScreen,
  WrongChainScreen,
} from "../InformationScreens";
import { LoadingScreen } from "../LoadingScreen";
import { PopupContainer } from "../PopupContainer";
import { ScanResults } from "../ScanResults";

const ScanPageContainer = styled.div<{ severity?: Severity }>`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${({ severity, theme }) =>
    theme.severityColors[severity ?? "INFO"].background};
`;

const ScanPage: React.FC = () => {
  const {
    message,
    request,
    chainId,
    userAccount,
    chainFamily,
    chainNetwork,
    isImpersonatingWallet,
    impersonatingWallet,
    isExtensionOutdated,
    paramError,
  } = useGetRequestParams();
  const connectedChainId = useChainId();
  const { address, isConnected } = useAccount();
  const { switchNetworkAsync, isLoading: isSwitchingNetworks } =
    useSwitchNetwork({ throwForSwitchChainNotSupported: true });
  const { disconnectAsync } = useDisconnect();
  const { setOpen: setConnectWalletModalOpen } = useModal();

  const [hasDismissedScreen, setHasDismissedScreen] = useState<boolean>(false);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [skipUnsupportedChainWarning, setSkipUnsupportedChainWarning] =
    useState<boolean>(false);
  const [connectedAddress, setConnectedAddress] = useState<
    string | undefined
  >();

  const {
    data: scanResults,
    error: scanError,
    mutate,
    isValidating,
  } = useScanDappRequest(chainFamily, chainNetwork, request, message?.origin);

  // Reset-retry state when we are no longer validating
  useEffect(() => {
    if (isRetrying && !isValidating) {
      setIsRetrying(false);
    }
  }, [isValidating, isRetrying]);

  useEffect(() => {
    if (isImpersonatingWallet) {
      setConnectedAddress(impersonatingWallet);
    } else {
      setConnectedAddress(address as string);
    }
  }, [address, impersonatingWallet, isImpersonatingWallet]);

  const closeWindow = useCallback(() => window.close(), []);

  const handleUserDecision = useCallback(
    async (shouldProceed: boolean) => {
      if (!message) {
        logger.error("Error: Cannot proceed, no message to respond to ");
        return;
      }
      if (!request) {
        logger.error("Error: Cannot proceed, no request to respond to ");
        return;
      }

      logger.debug(request);

      if (shouldProceed) {
        if (isTransactionRequest(request)) {
          const { payload } = request;
          const { from, to, data, value, gas } = payload;
          const config = await prepareSendTransaction({
            request: {
              from,
              to,
              data: data ?? undefined,
              value: value || undefined,
              gasLimit: gas || undefined,
            },
            chainId,
          });
          try {
            const { hash } = await sendTransaction(config);
            // TODO(kimpers): We need UI affordances for waiting for the tx to confirm
            //await waitForTransaction({ chainId, hash, confirmations: 1 });
            logger.debug("tx hash", hash);
            await sendResult(message.id, hash);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (err: any) {
            const errMessage = err.message || err.toString();
            if (/rejected request/i.test(errMessage)) {
              await sendAbort(message.id);
            } else {
              throw err;
            }
          }
        } else if (isSignTypedDataRequest(request)) {
          try {
            let signTypedMessage;

            if (request.signTypedDataVersion === SignTypedDataVersion.V1) {
              signTypedMessage = (await window.ethereum?.request({
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                method: "eth_signTypedData" as any,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                params: [request.payload, request.userAccount] as any,
              })) as unknown as string;
            } else {
              const { domain, types, message } = request.payload;

              signTypedMessage = await signTypedData({
                domain,
                types,
                value: message,
              });
            }

            logger.debug("signTypedMessage", signTypedMessage);
            await sendResult(message.id, signTypedMessage);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (err: any) {
            const errMessage = err.message || err.toString();
            if (/rejected request/i.test(errMessage)) {
              await sendAbort(message.id);
            } else {
              throw err;
            }
          }
        } else if (isSignMessageRequest(request)) {
          const { payload } = request;
          if (payload.method === "personal_sign") {
            // NOTE: domain mismatch on SIWE, so we just pass the message back to the dapp
            logger.debug("personal_sign - send message back to dapp");
            await sendResult(message.id, payload.message);
          }
        } else {
          // TODO(kimpers): This should never happen
          logger.error("Unsupported operation ", request);
          alert("UNSUPPORTED OPERATION");
        }
      } else {
        await sendAbort(message.id);
      }
      closeWindow();
    },

    [message, request, closeWindow, chainId]
  );

  logger.debug(message);
  logger.debug(request);

  const severity = useMemo(() => {
    if (
      request?.payload &&
      "method" in request.payload &&
      request?.payload?.method === "eth_sign"
    ) {
      return actionToSeverity("BLOCK");
    }
    return scanResults?.action
      ? actionToSeverity(scanResults?.action)
      : undefined;
  }, [request?.payload, scanResults?.action]);

  const hasAllData =
    scanResults &&
    request &&
    message &&
    chainFamily &&
    chainNetwork &&
    userAccount;
  const isMessageSignatureRequest = useMemo(
    () =>
      request &&
      (isSignMessageRequest(request) || isSignTypedDataRequest(request)),
    [request]
  );
  const isConnectedToWrongAccount =
    connectedAddress && userAccount && connectedAddress !== userAccount;

  useEffect(() => {
    // NOTE: We only want to disconnect if we are connected to the wrong account and NOT impersonating a wallet
    if (isConnectedToWrongAccount && !isImpersonatingWallet) {
      disconnectAsync().catch((err) =>
        logger.error("Error disconnecting wallet", err)
      );
    }
  }, [isConnectedToWrongAccount, disconnectAsync, isImpersonatingWallet]);

  const maybeInformationScreen = useMemo(() => {
    const isLoading = !scanResults && !scanError;
    const isError = !isLoading && scanError;
    const shouldShowBlockScreen = scanResults?.action === "BLOCK";
    const simulationError = scanResults && scanResults.simulationResults?.error;
    const isUnsupportedChain = !chainFamily || !chainNetwork;
    const isWrongChainId =
      !!(chainId && connectedChainId) &&
      !isUnsupportedChain &&
      chainId !== connectedChainId;
    const isUnsupportedDangerousRequest =
      message && isSignMessageRequest(message.data)
        ? message?.data.payload.method === "eth_sign"
        : false;

    if (isError) {
      logger.error(scanError);
    }

    // NOTE(kimpers): We make the assumption that one tx can only generate one error screen
    // currently this holds true but it may not be the case in the future
    const onContinue = () => setHasDismissedScreen(true);

    const onRetry = () => {
      setIsRetrying(true);
      mutate();
    };

    if (paramError) {
      return (
        <>
          <TransactionNotFoundScreen />
          <SlimBottomMenu onClick={closeWindow} buttonLabel="Close" />
        </>
      );
    } else if (isExtensionOutdated) {
      return <OutdatedExtensionCTAScreen />;
    } else if (isUnsupportedChain && message) {
      // NOTE: First check if the chain is supported
      // No need to ask them to connect if not
      const onToggleShowUnsupportedChain = (value: boolean) => {
        setSkipUnsupportedChainWarning(value);
      };

      const chainId = message?.data?.chainId as string | undefined;
      return (
        <>
          <UnsupportedChainScreen
            onDismissUnsupportedChain={onToggleShowUnsupportedChain}
          />
          <SlimBottomMenu
            onClick={async () => {
              const opts = chainId
                ? { skipUnsupportedChainWarning, chainId }
                : undefined;
              // NOTE: For unsupported chains we don't differentiate between proceed and abort
              await sendAbort(message.id, opts);
              closeWindow();
            }}
            marker="unsupported-chain"
            buttonLabel="Continue"
          />
        </>
      );
    } else if (!connectedAddress || !isConnected) {
      return (
        <>
          <AccountNotConnectedScreen
            impersonatingWallet={impersonatingWallet}
            accountToConnect={userAccount ?? ""}
            onRetry={async () => {
              setConnectWalletModalOpen(true);
            }}
          />
          <SlimBottomMenu onClick={closeWindow} buttonLabel="Close" />
        </>
      );
    } else if (isUnsupportedDangerousRequest) {
      return (
        <TransactionUnsupportedScreen
          closeWindow={() => handleUserDecision(false)}
        />
      );
    } else if (isWrongChainId && chainId) {
      return (
        <>
          <WrongChainScreen
            currentChainId={connectedChainId}
            chainIdToConnect={chainId}
            isRetrying={isSwitchingNetworks}
            onRetry={async () => {
              try {
                await switchNetworkAsync?.(chainId);
              } catch (err) {
                logger.error(err);
              }
            }}
          />
          <SlimBottomMenu onClick={closeWindow} buttonLabel="Close" />
        </>
      );
    } else if (isLoading) {
      return (
        <LoadingScreen
          type={isMessageSignatureRequest ? "message" : "transaction"}
        />
      );
    } else if (isError && !hasDismissedScreen) {
      // TODO(kimpers): Error message propagation from the API
      return (
        <>
          <UnknownErrorScreen onRetry={onRetry} isRetrying={isRetrying} />
          <SlimBottomMenu onClick={closeWindow} buttonLabel="Close" />
        </>
      );
    } else if (shouldShowBlockScreen && !hasDismissedScreen) {
      return (
        <>
          <TransactionBlockedScreen onContinue={onContinue} />
          <SlimBottomMenu onClick={closeWindow} buttonLabel="Close" />
        </>
      );
    } else if (simulationError && !hasDismissedScreen) {
      if (simulationError.kind === "SIMULATION_FAILED") {
        return (
          <>
            <SimulationErrorScreen
              headline="Transaction Reverted"
              message="The transaction reverted when we simulated it. Approving may lead to loss of funds"
              // HACK(Alex): Remove after API version update
              errorMessage={
                simulationError.humanReadableError ||
                (simulationError as any).parsedErrorMessage
              }
            />
            <SlimBottomMenu onClick={onContinue} buttonLabel="Continue" />
          </>
        );
      } else {
        return (
          <>
            <SimulationErrorScreen
              headline="Simulation Failed"
              message="We are unable to simulate this transaction. Approving may lead to loss of funds"
              onRetry={onRetry}
              isRetrying={isRetrying}
            />
            <SlimBottomMenu onClick={onContinue} buttonLabel="Continue" />
          </>
        );
      }
    }
  }, [
    scanResults,
    scanError,
    chainFamily,
    chainNetwork,
    chainId,
    connectedChainId,
    message,
    paramError,
    isExtensionOutdated,
    connectedAddress,
    isConnected,
    hasDismissedScreen,
    mutate,
    closeWindow,
    skipUnsupportedChainWarning,
    impersonatingWallet,
    userAccount,
    setConnectWalletModalOpen,
    handleUserDecision,
    isSwitchingNetworks,
    switchNetworkAsync,
    isMessageSignatureRequest,
    isRetrying,
  ]);

  return (
    <ScanPageContainer severity={severity}>
      <PopupContainer
        impersonatingWallet={impersonatingWallet}
        chainNetwork={chainNetwork}
        chainFamily={chainFamily}
        severity={severity}
        bottomMenuType={maybeInformationScreen ? "SLIM" : "NONE"}
      >
        {maybeInformationScreen
          ? maybeInformationScreen
          : hasAllData && (
              <>
                <ScanResults
                  request={request}
                  scanResults={scanResults}
                  dappUrl={message.origin || ""}
                  chainFamily={chainFamily}
                  chainNetwork={chainNetwork}
                />
                <ApproveBottomMenu
                  isImpersonatingWallet={!!isImpersonatingWallet}
                  onContinue={() => handleUserDecision(true)}
                  onCancel={() => handleUserDecision(false)}
                />
              </>
            )}
      </PopupContainer>
    </ScanPageContainer>
  );
};

export default ScanPage;
