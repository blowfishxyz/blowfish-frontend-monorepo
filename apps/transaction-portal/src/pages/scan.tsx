import qs from "qs";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { ethers } from "ethers";
import {
  sendTransaction,
  prepareSendTransaction,
  signTypedData,
  signMessage,
} from "@wagmi/core";
import { InjectedConnector } from "wagmi/connectors/injected";

import { ApproveBottomMenu, SlimBottomMenu } from "../components/BottomMenus";
import {
  SimulationErrorScreen,
  TransactionBlockedScreen,
  UnknownErrorScreen,
  UnsupportedChainScreen,
} from "../components/InformationScreens";
import { LoadingScreen } from "../components/LoadingScreen";
import { PopupContainer } from "../components/PopupContainer";
import { Providers } from "../components/Providers";
import { ScanResults } from "../components/ScanResults";
import { useScanDappRequest } from "../hooks/useScanDappRequest";
import { sendResult, sendAbort } from "../utils/messages";
import {
  DappRequest,
  Message,
  UntypedMessageData,
  actionToSeverity,
  isSignMessageRequest,
  isSignTypedDataRequest,
  isTransactionRequest,
  parseRequestFromMessage,
  Severity,
} from "@blowfish/utils/types";
import { ChainFamily, ChainNetwork } from "@blowfish/utils/BlowfishApiClient";
import { chainIdToSupportedChainMapping } from "../utils/chains";
import { logger } from "../utils/logger";

const ScanPageContainer = styled.div<{ severity?: Severity }>`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${({ severity, theme }) =>
    theme.contextBackgroundColors[severity ?? "INFO"]};
`;

const ScanResult: React.FC = () => {
  const [chainNetwork, setChainNetwork] = useState<ChainNetwork | undefined>(
    undefined
  );
  const [chainFamily, setChainFamily] = useState<ChainFamily | undefined>(
    undefined
  );
  const [userAccount, setUserAccount] = useState<string | undefined>(undefined);
  const [chainId, setChainId] = useState<number | undefined>(undefined);
  const [message, setMessage] = useState<
    Message<UntypedMessageData> | undefined
  >(undefined);
  const [request, setRequest] = useState<DappRequest | undefined>(undefined);
  const [hasDismissedScreen, setHasDismissedScreen] = useState<boolean>(false);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);

  const { address } = useAccount();
  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnectAsync } = useDisconnect();

  useEffect(() => {
    const windowQs = window.location.search;
    const cleanedQs = windowQs.startsWith("?") ? windowQs.slice(1) : windowQs;
    // NOTE: We only pass Message through the query params
    const _message = qs.parse(cleanedQs) as unknown as Message<DappRequest>;
    const _request = parseRequestFromMessage(_message);
    const _chainId = _message.data.chainId.toString();

    setChainId(parseInt(_chainId));
    setMessage(_message);
    setRequest(_request);
    setUserAccount(_request.userAccount);

    // NOTE: This should never happen since we verify
    // that the chain is supported before we create this page
    if (!chainIdToSupportedChainMapping[_chainId]) {
      logger.debug(`Blowfish unsupported chainId ${_chainId}`);
      return;
    }
    const { chainFamily: _chainFamily, chainNetwork: _chainNetwork } =
      chainIdToSupportedChainMapping[_chainId];
    setChainFamily(_chainFamily);
    setChainNetwork(_chainNetwork);
  }, []);

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

  const closeWindow = useCallback(() => window.close(), []);

  const handleUserDecision = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
          const { payload } = request;
          try {
            const signedTypedMessage = await signTypedData({
              domain: payload.domain,
              types: payload.types,
              value: payload.message,
            });
            logger.debug("signTypedMessage", signedTypedMessage);
            await sendResult(message.id, signedTypedMessage);
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
            const decoded = ethers.utils.toUtf8String(payload.message);
            try {
              const signedMessage = await signMessage({
                message: decoded,
              });
              logger.debug("signedMessage", signedMessage);
              await sendResult(message.id, signedMessage);
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
              const errMessage = err.message || err.toString();
              if (/rejected request/i.test(errMessage)) {
                await sendAbort(message.id);
              } else {
                throw err;
              }
            }
          } else {
            // TODO(kimpers): Handle this is we want to support it or inform the user
            alert("ETH_SIGN IS DANGEROUS AND THEREFORE NOT SUPPORTED");
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

    [message, request, chainId, closeWindow]
  );

  logger.debug(message);
  logger.debug(request);

  const severity = useMemo(
    () =>
      scanResults?.action ? actionToSeverity(scanResults?.action) : undefined,
    [scanResults?.action]
  );

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

  const maybeInformationScreen = useMemo(() => {
    const isLoading = !scanResults && !scanError;
    const isError = !isLoading && scanError;
    const shouldShowBlockScreen = scanResults?.action === "BLOCK";
    const simulationError = scanResults && scanResults.simulationResults?.error;
    const isUnsupportedChain = !chainFamily || !chainNetwork;
    const isWrongAccount = address && userAccount && address !== userAccount;

    if (isError) {
      logger.error(scanError);
    }

    // NOTE(kimpers): We make th assumption that one tx can only generate one error screen
    // currently this holds true but it may not be the case in the future
    const onContinue = () => setHasDismissedScreen(true);

    const onRetry = () => {
      setIsRetrying(true);
      mutate();
    };

    // TODO(kimpers): Actual screens HERE
    // FIXME: Proper info screens
    // TODO: handle chainId mismatch
    if (!address) {
      return (
        <>
          <UnknownErrorScreen
            onRetry={async () => {
              await connectAsync();
            }}
            isRetrying={isRetrying}
          />
          <SlimBottomMenu onClick={closeWindow} buttonLabel="Close" />
        </>
      );
    } else if (isWrongAccount) {
      return (
        <>
          <UnknownErrorScreen
            onRetry={async () => {
              await disconnectAsync();
              await connectAsync();
            }}
            isRetrying={isRetrying}
          />
          <SlimBottomMenu onClick={closeWindow} buttonLabel="Close" />
        </>
      );
    } else if (isUnsupportedChain && message) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const onToggleShowUnsupportedChain = async (_value: boolean) => {
        const chainId = message?.data?.chainId as string | undefined;
        if (!chainId) {
          logger.error(`No chainId found in message ${message}`);
          return;
        }
        // await setUnsupportedChainDismissed(chainId, value);
      };

      return (
        <>
          <UnsupportedChainScreen
            onDismissUnsupportedChain={onToggleShowUnsupportedChain}
          />
          <SlimBottomMenu
            onClick={() => handleUserDecision(true)}
            buttonLabel="Close"
          />
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
              errorMessage={simulationError.parsedErrorMessage}
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
    hasDismissedScreen,
    closeWindow,
    isMessageSignatureRequest,
    mutate,
    chainFamily,
    chainNetwork,
    message,
    handleUserDecision,
    isRetrying,
    connectAsync,
    disconnectAsync,
    userAccount,
    address,
  ]);

  return (
    <ScanPageContainer severity={severity}>
      <PopupContainer
        userAccount={userAccount}
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
                  onContinue={() => handleUserDecision(true)}
                  onCancel={() => handleUserDecision(false)}
                />
              </>
            )}
      </PopupContainer>
    </ScanPageContainer>
  );
};

const Page: React.FC = () => (
  <Providers>
    <ScanResult />
  </Providers>
);

export default Page;
