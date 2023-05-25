import React, { useCallback, useMemo } from "react";
import { styled } from "styled-components";
import { Row } from "@blowfish/ui/core";
import PreviewTxn from "~components/cards/PreviewTxn";
import {
  ChainFamily,
  ChainNetwork,
  EvmMessageScanResult,
  EvmTransactionScanResult,
} from "@blowfish/api-client";
import {
  DappRequest,
  Message,
  isSignMessageRequest,
} from "@blowfish/utils/types";
import { logger } from "@blowfish/utils/logger";
import { sendAbort, sendResult } from "~utils/messages";

const ScanResultsWrapper = styled(Row)`
  height: 100%;
`;

interface ScanResultsV2Props {
  request: DappRequest;
  scanResults: EvmMessageScanResult | EvmTransactionScanResult;
  chainNetwork: ChainNetwork;
  chainFamily: ChainFamily;
  dappUrl: string;
  message: Message<DappRequest["type"], DappRequest>;
}

const ScanResultsV2: React.FC<ScanResultsV2Props> = ({
  request,
  scanResults,
  message,
  ...props
}) => {
  const dappUrl = useMemo(() => new URL(props.dappUrl), [props.dappUrl]);

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

  const { parsedMessage, challenge } = useMemo(() => {
    if (!parsedMessageContent) {
      return { parsedMessage: "", challenge: "" };
    }

    const startIndex = parsedMessageContent.indexOf("\n\nChallenge: ");
    if (startIndex !== -1) {
      const parsedMessage = parsedMessageContent.substring(0, startIndex);
      const challenge = parsedMessageContent.substring(startIndex + 13);
      return { parsedMessage, challenge };
    }

    return { parsedMessage: parsedMessageContent, challenge: "" };
  }, [parsedMessageContent]);

  const signatureData = [
    {
      imageUrl: "/placeholder/placeholder-signature-image.svg",
      state: scanResults.simulationResults?.error
        ? simulationFailedMessage
        : "No state changes found. Proceed with caution",
      dappUrl,
      message: parsedMessage,
      challenge,
      account: request.userAccount,
    },
  ];

  const closeWindow = useCallback(() => window.close(), []);

  const handleUserAction = useCallback(
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
        if (isSignMessageRequest(request)) {
          const { payload } = request;
          if (payload.method === "personal_sign") {
            // NOTE: domain mismatch on SIWE, so we just pass the message back to the dapp
            logger.debug("personal_sign - send message back to dapp");
            await sendResult(message.id, payload.message);
          }
        } else {
          // TODO: This should never happen
          logger.error("Unsupported operation ", request);
          alert("UNSUPPORTED OPERATION");
        }
      } else {
        await sendAbort(message.id);
      }
      closeWindow();
    },
    [message, request, closeWindow]
  );

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
