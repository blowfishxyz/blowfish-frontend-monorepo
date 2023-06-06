import { Spinner } from "@blowfish/ui/core";
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

const DynamicJsonViewer = dynamic(
  () => import("../components/JsonViewerV2").then((mod) => mod.JsonViewer),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);

interface RequestJsonViewerProps {
  request: DappRequest;
}

const RequestJsonViewer = ({ request }: RequestJsonViewerProps) => {
  const content = useMemo(() => {
    if (isTransactionRequest(request)) {
      // NOTE: For display purposes we want to show 0 when value is null
      const { to, from, value, data } = request.payload;
      const displayTransaction: TransactionPayload = {
        to,
        from,
        value: new Decimal(value || 0).toString(),
        data,
      };
      return displayTransaction;
    } else if (isSignTypedDataRequest(request)) {
      const { domain, message } =
        request.signTypedDataVersion === SignTypedDataVersion.V1
          ? transformTypedDataV1FieldsToEIP712(request.payload, request.chainId)
          : request.payload;
      return { domain, message };
    } else if (isSignMessageRequest(request)) {
      const { message } = request.payload;
      return {
        message,
      };
    } else {
      logger.error("AdvancedDetails: Unhandled request type", request);
    }
  }, [request]);

  return content ? <DynamicJsonViewer data={content} /> : null;
};

export default RequestJsonViewer;
