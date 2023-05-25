import React, { useMemo } from "react";
import { styled } from "styled-components";
import { Row } from "@blowfish/ui/core";
import PreviewTxn from "~components/cards/PreviewTxn";
import {
  ChainFamily,
  ChainNetwork,
  EvmMessageScanResult,
  EvmTransactionScanResult,
} from "@blowfish/api-client";
import { DappRequest, isSignMessageRequest } from "@blowfish/utils/types";

const ScanResultsWrapper = styled(Row)`
  height: 100%;
`;

interface ScanResultsV2Props {
  request: DappRequest;
  scanResults: EvmMessageScanResult | EvmTransactionScanResult;
  chainNetwork: ChainNetwork;
  chainFamily: ChainFamily;
  dappUrl: string;
  handleUserAction: (shouldProceed: boolean) => Promise<void>;
}

const ScanResultsV2: React.FC<ScanResultsV2Props> = ({
  request,
  scanResults,
  dappUrl,
  handleUserAction,
}) => {
  const parsedMessageContent = useMemo(() => {
    if (
      isSignMessageRequest(request) &&
      request.payload.method === "personal_sign"
    ) {
      const messageWithoutPrefix = request.payload.message.slice(2);
      return Buffer.from(messageWithoutPrefix, "hex").toString("utf8");
    }
    return undefined;
  }, [request]);

  const simulationFailedMessage = useMemo(() => {
    return (
      scanResults?.simulationResults?.error?.humanReadableError ||
      "Simulation failed"
    );
  }, [scanResults]);

  const { message, challenge } = useMemo(() => {
    if (!parsedMessageContent) {
      return { message: "", challenge: "" };
    }

    const startIndex = parsedMessageContent.indexOf("\n\nChallenge: ");
    if (startIndex !== -1) {
      const message = parsedMessageContent.substring(0, startIndex);
      const challenge = parsedMessageContent.substring(startIndex + 13);
      return { message, challenge };
    }

    return { message: parsedMessageContent, challenge: "" };
  }, [parsedMessageContent]);

  const signatureData = [
    {
      imageUrl: "/placeholder/placeholder-signature-image.svg",
      state: scanResults.simulationResults?.error
        ? simulationFailedMessage
        : "No state changes found. Proceed with caution",
      dappUrl: new URL(dappUrl),
      message,
      challenge,
      account: request.userAccount,
    },
  ];

  const simulationType =
    request.type === "SIGN_MESSAGE" ? "signature" : "transaction";

  return (
    <ScanResultsWrapper justifyContent="center" alignItems="center">
      <PreviewTxn
        simulationType={simulationType}
        signatureData={signatureData}
        onContinue={() => handleUserAction(true)}
        onCancel={() => handleUserAction(false)}
      />
    </ScanResultsWrapper>
  );
};

export default ScanResultsV2;
