import { Spinner } from "@blowfishxyz/ui";
import { logger } from "@blowfish/utils/logger";
import { transformTypedDataV1FieldsToEIP712 } from "@blowfish/utils/messages";
import {
  DappRequest,
  SignTypedDataVersion,
  TransactionPayload,
  isSignMessageRequest,
  isSignTypedDataRequest,
  isTransactionRequest,
} from "@blowfish/utils/types";
import Decimal from "decimal.js";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import {
  ScanTransactionEvmRequest,
  ScanTransactionsSolanaRequest,
} from "@blowfishxyz/api-client";
import { isSolanaTransaction } from "~utils/utils";

const DynamicJsonViewer = dynamic(
  () => import("../components/JsonViewerV2").then((mod) => mod.JsonViewer),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);

interface RequestJsonViewerProps {
  request:
    | DappRequest
    | ScanTransactionEvmRequest
    | ScanTransactionsSolanaRequest;
}

const RequestJsonViewer: React.FC<RequestJsonViewerProps> = ({ request }) => {
  const { isSolana, solanaRequest, evmRequest } = isSolanaTransaction(request);

  const content = useMemo(() => {
    if (isSolana) {
      console.log(solanaRequest);
      return solanaRequest;
    }

    if (evmRequest) {
      if (isTransactionRequest(evmRequest)) {
        const { to, from, value, data } = evmRequest.payload;
        return {
          to,
          from,
          value: new Decimal(value || 0).toFixed(),
          data,
        } as TransactionPayload;
      } else if (isSignTypedDataRequest(evmRequest)) {
        const transformedPayload =
          evmRequest.signTypedDataVersion === SignTypedDataVersion.V1
            ? transformTypedDataV1FieldsToEIP712(
                evmRequest.payload,
                evmRequest.chainId
              )
            : evmRequest.payload;
        return transformedPayload;
      } else if (isSignMessageRequest(evmRequest)) {
        return { message: evmRequest.payload.message };
      }
    }

    logger.error("AdvancedDetails: Unhandled request type", request);
    return null;
  }, [evmRequest, isSolana, solanaRequest, request]);

  return content ? <DynamicJsonViewer data={content} /> : null;
};

export default RequestJsonViewer;
