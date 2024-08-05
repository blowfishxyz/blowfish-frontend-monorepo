import React from "react";
import dynamic from "next/dynamic";
import { Spinner } from "@blowfishxyz/ui";
import { DappRequest } from "@blowfish/utils/types";
import {
  ScanMessageEvm200Response,
  ScanTransactionsEvmRequest,
  ScanTransactionsEvm200Response,
  ScanTransactionsSolana200Response,
  ScanTransactionsSolanaRequest,
} from "@blowfishxyz/api-client/.";

const DynamicJsonViewer = dynamic(
  () => import("./JsonViewerV2").then((mod) => mod.JsonViewer),
  { ssr: false, loading: () => <Spinner /> }
);

interface RawResponseViewerProps {
  request:
    | DappRequest
    | ScanTransactionsEvmRequest
    | ScanTransactionsSolanaRequest
    | undefined;
  scanResults?:
    | ScanMessageEvm200Response
    | ScanTransactionsEvm200Response
    | ScanTransactionsSolana200Response;
}

const RawResponseViewer: React.FC<RawResponseViewerProps> = ({
  request,
  scanResults,
}) => {
  const content = { request, scanResults };

  return <DynamicJsonViewer data={content} enableClipboard={true} />;
};

export default RawResponseViewer;
