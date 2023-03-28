import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useSwitchNetwork,
} from "wagmi";
import {
  prepareSendTransaction,
  sendTransaction,
  signTypedData,
} from "@wagmi/core";
import { InjectedConnector } from "wagmi/connectors/injected";

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
import { useScanDappRequest } from "~hooks/useScanDappRequest";
import { getTransactionToScan, sendAbort, sendResult } from "~utils/messages";
import {
  actionToSeverity,
  DappRequest,
  isSignMessageRequest,
  isSignTypedDataRequest,
  isTransactionRequest,
  Message,
  parseRequestFromMessage,
  Severity,
  SignTypedDataVersion,
} from "@blowfish/utils/types";
import { ChainFamily, ChainNetwork } from "@blowfish/utils/BlowfishApiClient";
import { chainIdToSupportedChainMapping } from "@blowfish/utils/chains";
import { logger } from "~utils/logger";
import { useRouter } from "next/router";
import {
  checkVersionAndTransformMessage,
  getTransactionToScanFromUrl,
  MessageError,
} from "~utils/utils";

const ScanPageContainer = styled.div<{ severity?: Severity }>`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${({ severity, theme }) =>
    theme.contextBackgroundColors[severity ?? "INFO"]};
`;

const ScanPage: React.FC = () => {
  const [chainNetwork, setChainNetwork] = useState<ChainNetwork | undefined>(
    undefined
  );
  const [chainFamily, setChainFamily] = useState<ChainFamily | undefined>(
    undefined
  );
  const [userAccount, setUserAccount] = useState<string | undefined>(undefined);
  const [chainId, setChainId] = useState<number | undefined>(undefined);
  const [message, setMessage] = useState<
    Message<DappRequest["type"], DappRequest> | undefined
  >(undefined);
  const [request, setRequest] = useState<DappRequest | undefined>(undefined);
  const [hasDismissedScreen, setHasDismissedScreen] = useState<boolean>(false);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [skipUnsupportedChainWarning, setSkipUnsupportedChainWarning] =
    useState<boolean>(false);
  const [impersonatingWallet, setImpersonatingWallet] = useState<
    string | undefined
  >();
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  const [isExtensionOutDated, setIsExtensionOutDated] =
    useState<boolean>(false);
  const [transactionNotFound, setTransactionNotFound] =
    useState<boolean>(false);

  const { address } = useAccount();
  const connectedChainId = useChainId();
  const { switchNetworkAsync, isLoading: isSwitchingNetworks } =
    useSwitchNetwork({ throwForSwitchChainNotSupported: true });
  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnectAsync } = useDisconnect();
  const router = useRouter();
  // NOTE: extensionVersion, origin, type only available on url scan
  const { id, extensionVersion, origin, type } = router.query;
  // NOTE: used to check if params are sent via URL
  const isUrlScan = type !== undefined;

  useEffect(() => {
    (async () => {
      if (!router.isReady) return;

      try {
        const _message = checkVersionAndTransformMessage(
          isUrlScan
            ? getTransactionToScanFromUrl(
                String(id),
                extensionVersion as string,
                origin as string
              )
            : await getTransactionToScan(String(id))
        );

        const _request = parseRequestFromMessage(_message);
        const _chainId = _message.data.chainId.toString();
        setUserAccount(_request.userAccount);

        setChainId(parseInt(_chainId));
        setMessage(_message);
        setRequest(_request);

        if (_request.isImpersonatingWallet) {
          setImpersonatingWallet(_request.userAccount);
        }

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        if (e.message === MessageError.NO_MESSAGE) {
          setTransactionNotFound(true);
        }
        if (e.message === MessageError.OUTDATED_EXTENSION) {
          setIsExtensionOutDated(true);
        }
      }
    })();
  }, [extensionVersion, id, isUrlScan, origin, router.isReady]);

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
    if (impersonatingWallet) {
      setConnectedAddress(impersonatingWallet);
    } else {
      setConnectedAddress(address as string);
    }
  }, [address, impersonatingWallet]);

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

  const maybeInformationScreen = useMemo(() => {
    const isLoading = !scanResults && !scanError;
    const isError = !isLoading && scanError;
    const shouldShowBlockScreen = scanResults?.action === "BLOCK";
    const simulationError = scanResults && scanResults.simulationResults?.error;
    const isUnsupportedChain = !chainFamily || !chainNetwork;
    const isWrongAccount =
      connectedAddress && userAccount && connectedAddress !== userAccount;
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

    if (transactionNotFound) {
      return (
        <>
          <TransactionNotFoundScreen />
          <SlimBottomMenu onClick={closeWindow} buttonLabel="Close" />
        </>
      );
    } else if (isExtensionOutDated) {
      return <OutdatedExtensionCTAScreen />;
    } else if (!connectedAddress) {
      return (
        <>
          <AccountNotConnectedScreen
            accountToConnect={userAccount ?? ""}
            isRetrying={isConnecting}
            onRetry={async () => {
              setIsConnecting(true);
              try {
                await connectAsync();
              } catch (err) {
                logger.error(err);
              } finally {
                setIsConnecting(false);
              }
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
    } else if (isWrongAccount) {
      return (
        <>
          <AccountNotConnectedScreen
            accountToConnect={userAccount ?? ""}
            connectedAccount={connectedAddress}
            isRetrying={isConnecting}
            onRetry={async () => {
              setIsConnecting(true);
              try {
                await disconnectAsync();
                await connectAsync();
                setConnectedAddress(null);
              } catch (err) {
                logger.error(err);
              } finally {
                setIsConnecting(false);
              }
            }}
          />
          <SlimBottomMenu onClick={closeWindow} buttonLabel="Close" />
        </>
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
    } else if (isUnsupportedChain && message) {
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
            buttonLabel="Continue"
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
    chainFamily,
    chainNetwork,
    connectedAddress,
    userAccount,
    chainId,
    connectedChainId,
    message,
    transactionNotFound,
    isExtensionOutDated,
    hasDismissedScreen,
    mutate,
    isConnecting,
    closeWindow,
    connectAsync,
    handleUserDecision,
    disconnectAsync,
    isSwitchingNetworks,
    switchNetworkAsync,
    skipUnsupportedChainWarning,
    isMessageSignatureRequest,
    isRetrying,
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
                  isImpersonatingWallet={!!request.isImpersonatingWallet}
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
