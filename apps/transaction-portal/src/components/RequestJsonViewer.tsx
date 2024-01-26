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
  const isSolana =
    "transactions" in request && Array.isArray(request.transactions);

  const content = useMemo(() => {
    if (isSolana) {
      return request;
    }

    const evmRequest = request as DappRequest;

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

    logger.error("AdvancedDetails: Unhandled request type", request);
    return null;
  }, [isSolana, request]);

  return content ? <DynamicJsonViewer data={content} /> : null;
};

export default RequestJsonViewer;
