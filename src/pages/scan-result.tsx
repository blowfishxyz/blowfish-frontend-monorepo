import React, { useEffect, useState, useMemo } from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";
import { JsonViewer } from "@textea/json-viewer";
import qs from "qs";

import {
  Message,
  DappRequest,
  parseRequestFromMessage,
  isTransactionRequest,
} from "../types";
import {
  BlowfishApiClient,
  TransactionScanResponse,
} from "../utils/BlowfishApiClient";
import { PrimaryButton, SecondaryButton } from "../components/Buttons";

const ResultContainer = styled.div``;

const BLOWFISH_API_KEY = process.env.BLOWFISH_API_KEY as string;
const BLOWFISH_API_BASE_URL = process.env.BLOWFISH_API_BASE_URL as string;

const ScanResult: React.FC = () => {
  const [message, setMessage] = useState<Message | undefined>(undefined);
  const [request, setRequest] = useState<DappRequest | undefined>(undefined);
  const [scanResults, setScanResults] = useState<
    TransactionScanResponse | undefined
  >(undefined);

  useEffect(() => {
    const windowQs = window.location.search;
    const cleanedQs = windowQs.startsWith("?") ? windowQs.slice(1) : windowQs;
    // NOTE: We only pass Message through the query params
    const _message = qs.parse(cleanedQs) as unknown as Message;
    const _request = parseRequestFromMessage(_message);
    setMessage(_message);
    setRequest(_request);
  }, []);

  const client = useMemo(
    () => new BlowfishApiClient(BLOWFISH_API_KEY, BLOWFISH_API_BASE_URL),
    []
  );

  useEffect(() => {
    if (!request || !message) {
      return;
    }
    const scanRequest = async () => {
      if (isTransactionRequest(request)) {
        const _scanResults = await client.scanTransaction(
          request.payload,
          // TODO(kimpers): pass user current account separately
          request.payload.from,
          { origin: message.origin! }
        );

        setScanResults(_scanResults);
      }
    };

    scanRequest().catch((err) => console.error(err));
  }, [client, message, request]);

  console.log(message);
  console.log(request);
  return (
    <ResultContainer>
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
          <PrimaryButton>Proceed</PrimaryButton>
          <SecondaryButton>Cancel</SecondaryButton>
        </div>
      )}
    </ResultContainer>
  );
};

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(<ScanResult />);
