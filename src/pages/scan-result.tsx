import React, { useEffect, useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";
import { JsonViewer } from "@textea/json-viewer";
import qs from "qs";

import {
  Message,
  DappRequest,
  parseRequestFromMessage,
  isTransactionRequest,
  isSignTypedDataRequest,
  isSignMessageRequest,
  UntypedMessageData,
} from "../types";
import { BlowfishApiClient, ScanResponse } from "../utils/BlowfishApiClient";
import { chainIdToSupportedChainMapping } from "../utils/constants";
import { PrimaryButton, SecondaryButton } from "../components/Buttons";
import { respondWithUserDecision } from "./page-utils";

const ResultContainer = styled.div``;

const BLOWFISH_API_KEY = process.env.BLOWFISH_API_KEY as string;
const BLOWFISH_API_BASE_URL = process.env.BLOWFISH_API_BASE_URL as string;

const ScanResult: React.FC = () => {
  const [message, setMessage] = useState<
    Message<UntypedMessageData> | undefined
  >(undefined);
  const [client, setClient] = useState<BlowfishApiClient | undefined>(
    undefined
  );
  const [request, setRequest] = useState<DappRequest | undefined>(undefined);
  const [scanResults, setScanResults] = useState<ScanResponse | undefined>(
    undefined
  );

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
      console.error(`Blowfish unsupported chainId ${chainId}`);
      return;
    }

    const { chainFamily, chainNetwork } =
      chainIdToSupportedChainMapping[chainId];

    const _client = new BlowfishApiClient(
      chainFamily,
      chainNetwork,
      BLOWFISH_API_KEY,
      BLOWFISH_API_BASE_URL
    );
    setMessage(_message);
    setRequest(_request);
    setClient(_client);
  }, []);

  useEffect(() => {
    if (!request || !message || !client) {
      return;
    }
    const scanRequest = async () => {
      if (isTransactionRequest(request)) {
        const _scanResults = await client.scanTransaction(
          request.payload,
          request.userAccount,
          { origin: message.origin! }
        );

        setScanResults(_scanResults);
      } else if (isSignTypedDataRequest(request)) {
        const _scanResults = await client.scanSignTypedData(
          request.payload,
          request.userAccount,
          { origin: message.origin! }
        );

        setScanResults(_scanResults);
      } else if (isSignMessageRequest(request)) {
        const _scanResults = await client.scanSignTypedData(
          request.payload,
          request.userAccount,
          { origin: message.origin! }
        );

        setScanResults(_scanResults);
      }
    };

    scanRequest().catch((err) => console.error(err));
  }, [client, message, request]);

  const handleUserDecision = useCallback(
    async (shouldProceed: boolean) => {
      if (!scanResults || !message) {
        return;
      }
      await respondWithUserDecision(message.id, shouldProceed);
      window.close();
    },

    [scanResults, message]
  );

  console.log(message);
  console.log(request);
  return (
    <ResultContainer>
      {!scanResults && <p>Scanning dApp interaction...</p>}
      {scanResults && (
        <div>
          <h1>Scan Result</h1>
          <JsonViewer
            value={scanResults}
            collapseStringsAfterLength={false}
            rootName={false}
            indentWidth={2}
            defaultInspectDepth={4}
          />
          <PrimaryButton onClick={() => handleUserDecision(true)}>
            Proceed
          </PrimaryButton>
          <SecondaryButton onClick={() => handleUserDecision(false)}>
            Cancel
          </SecondaryButton>
        </div>
      )}
    </ResultContainer>
  );
};

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(<ScanResult />);
