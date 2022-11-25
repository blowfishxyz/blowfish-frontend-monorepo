import React, { useEffect, useState, useCallback, useMemo } from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";
import { Providers } from "../components/Providers";
import qs from "qs";

import {
  Message,
  DappRequest,
  parseRequestFromMessage,
  isTransactionRequest,
  isSignTypedDataRequest,
  isSignMessageRequest,
  UntypedMessageData,
  TransactionPayload,
  actionToSeverity,
} from "../types";
import {
  BlowfishApiClient,
  EvmTransactionScanResult,
  EvmMessageScanResult,
  ChainNetwork,
  ChainFamily,
} from "../utils/BlowfishApiClient";
import { chainIdToSupportedChainMapping } from "../utils/constants";
import { respondWithUserDecision } from "./page-utils";
import { logger } from "../utils/logger";
import { PopupContainer } from "../components/PopupContainer";
import { ScanResults } from "../components/ScanResults";
import { TransactionBlockedScreen } from "../components/InformationScreens";
import { SlimBottomMenu } from "../components/BottomMenus";

const BLOWFISH_API_BASE_URL = process.env.BLOWFISH_API_BASE_URL as string;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const ScanResult: React.FC = () => {
  const [chainNetwork, setChainNetwork] = useState<ChainNetwork | undefined>(
    undefined
  );
  const [chainFamily, setChainFamily] = useState<ChainFamily | undefined>(
    undefined
  );
  const [userAccount, setUserAccount] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<
    Message<UntypedMessageData> | undefined
  >(undefined);
  const [client, setClient] = useState<BlowfishApiClient | undefined>(
    undefined
  );
  const [request, setRequest] = useState<DappRequest | undefined>(undefined);
  const [scanResults, setScanResults] = useState<
    EvmMessageScanResult | EvmTransactionScanResult | undefined
  >(undefined);
  const [scanError, setScanError] = useState<Error | undefined>(undefined);
  const [hasDismissedBlockScreen, setHasDismissedBlockScreen] =
    useState<boolean>(false);

  useEffect(() => {
    const windowQs = window.location.search;
    const cleanedQs = windowQs.startsWith("?") ? windowQs.slice(1) : windowQs;
    // NOTE: We only pass Message through the query params
    const _message = qs.parse(cleanedQs) as unknown as Message<DappRequest>;
    const _request = parseRequestFromMessage(_message);
    const chainId = _message.data.chainId.toString();

    // NOTE: This should never happen since we verify
    // that the chain is supported before we create this page
    if (!chainIdToSupportedChainMapping[chainId]) {
      logger.error(`Blowfish unsupported chainId ${chainId}`);
      return;
    }

    const { chainFamily: _chainFamily, chainNetwork: _chainNetwork } =
      chainIdToSupportedChainMapping[chainId];

    const _client = new BlowfishApiClient(
      _chainFamily,
      _chainNetwork,
      undefined,
      BLOWFISH_API_BASE_URL
    );
    setMessage(_message);
    setRequest(_request);
    setClient(_client);
    setChainFamily(_chainFamily);
    setChainNetwork(_chainNetwork);
  }, []);

  useEffect(() => {
    if (!request || !message || !client) {
      return;
    }
    const scanRequest = async () => {
      if (isTransactionRequest(request)) {
        setUserAccount(request.userAccount);
        const _scanResults = await client.scanTransaction(
          request.payload,
          request.userAccount,
          { origin: message.origin! }
        );

        setScanResults(_scanResults);
      } else if (isSignTypedDataRequest(request)) {
        setUserAccount(request.userAccount);
        const _scanResults = await client.scanSignTypedData(
          request.payload,
          request.userAccount,
          { origin: message.origin! }
        );

        setScanResults(_scanResults);
      } else if (isSignMessageRequest(request)) {
        setUserAccount(request.userAccount);
        const _scanResults = await client.scanSignMessage(
          request.payload.message,
          request.userAccount,
          { origin: message.origin! }
        );

        setScanResults(_scanResults);
      }
    };

    scanRequest().catch((err) => {
      setScanError(err);
      logger.error(err);
    });
  }, [client, message, request]);

  const handleUserDecision = useCallback(
    async (shouldProceed: boolean) => {
      if (!message) {
        logger.error("Error: Cannot proceed, no message to respond to ");
        return;
      }
      await respondWithUserDecision(message.id, shouldProceed);
      window.close();
    },

    [message]
  );

  logger.debug(message);
  logger.debug(request);

  const hasResultsLoaded =
    scanResults &&
    request &&
    message &&
    chainFamily &&
    chainNetwork &&
    userAccount;

  const severity = useMemo(
    () =>
      scanResults?.action ? actionToSeverity(scanResults?.action) : undefined,
    [scanResults?.action]
  );

  const shouldShowBlockScreen =
    scanResults?.action === "BLOCK" && !hasDismissedBlockScreen;

  return (
    <PopupContainer
      userAccount={userAccount}
      chainNetwork={chainNetwork}
      chainFamily={chainFamily}
      severity={severity}
      bottomMenuType={shouldShowBlockScreen ? "SLIM" : "NONE"}
    >
      {!scanResults && !scanError && <p>Scanning dApp interaction...</p>}
      {scanError && (
        <ErrorMessage>Scan failed: {scanError.message}</ErrorMessage>
      )}
      {hasResultsLoaded &&
        (shouldShowBlockScreen ? (
          <>
            <TransactionBlockedScreen
              onProceed={() => setHasDismissedBlockScreen(true)}
            />
            <SlimBottomMenu
              onClick={() => alert("ABORTED...")}
              buttonLabel="Close"
            />
          </>
        ) : (
          // TODO(kimpers): support for messages and other interactions
          <ScanResults
            transaction={request.payload as TransactionPayload}
            scanResults={scanResults as EvmTransactionScanResult}
            dappUrl={message.origin!}
            onContinue={() => handleUserDecision(true)}
            onCancel={() => handleUserDecision(false)}
            chainFamily={chainFamily}
            chainNetwork={chainNetwork}
          />
        ))}
    </PopupContainer>
  );
};

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <Providers>
    <ScanResult />
  </Providers>
);
