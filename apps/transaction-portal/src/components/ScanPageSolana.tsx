import {
  OutdatedExtensionModal,
  TransactionNotFoundModal,
  UnknownErrorModal,
} from "./modals";
import { Layout } from "~components/layout/Layout";
import { ProtectLoadingScreen } from "~components/ProtectLoadingScreen";
import { ScanTransactionsSolanaRequest } from "@blowfishxyz/api-client";
import ScanResultsSolana from "./ScanResultsSolana";
import {
  SolanaScanParams,
  SolanaSuccessParams,
} from "~hooks/useURLRequestParams";
import { MessageError } from "~utils/utils";
import { useScanTransactionsWithSafeguard } from "~hooks/useScanTransactionsWithSafeguard";

export const ScanPageSolanaV2Inner: React.FC<{
  data: SolanaScanParams;
}> = ({ data }) => {
  if (!data) {
    return <ProtectLoadingScreen key="loading" />;
  }

  if ("error" in data) {
    if (data.error === MessageError.PARAMS_NOT_OK) {
      return <TransactionNotFoundModal />;
    }
    if (data.error === MessageError.OUTDATED_EXTENSION) {
      return <OutdatedExtensionModal />;
    }
    return <TransactionNotFoundModal />;
  }

  return <SolanaFullfieldView data={data} />;
};

const SolanaFullfieldView: React.FC<{ data: SolanaSuccessParams }> = ({
  data,
}) => {
  const {
    request,
    userAccount,
    isImpersonating,
    method,
    forceSafeguard,
    messageId,
  } = data;

  return (
    <SolanaResultsView
      request={request}
      userAccount={userAccount}
      isImpersonating={isImpersonating}
      messageId={messageId}
      method={method}
      forceSafeguard={forceSafeguard}
    />
  );
};

const SolanaResultsView: React.FC<{
  request: ScanTransactionsSolanaRequest;
  userAccount: string;
  isImpersonating: boolean;
  method?: string;
  forceSafeguard?: boolean;
  messageId: string | undefined;
}> = ({
  request,
  userAccount,
  isImpersonating,
  method,
  forceSafeguard,
  messageId,
}) => {
  const {
    data,
    error: scanError,
    mutate,
  } = useScanTransactionsWithSafeguard({
    transactions: request.transactions,
    userAccount: userAccount,
    metadata: request.metadata,
    method,
    chainNetwork: "mainnet",
    simulatorConfig: request.simulatorConfig
      ? request.simulatorConfig
      : undefined,
  });
  const originalResults = data?.original;
  const safeguardResults = data?.safeguard;
  const scanResults = originalResults;

  if (scanError) {
    return (
      <UnknownErrorModal
        onRetry={async () => {
          await mutate();
        }}
      />
    );
  }

  if (!scanResults) {
    return <ProtectLoadingScreen key="loading" />;
  }

  return (
    <ScanResultsSolana
      request={request}
      messageId={messageId}
      forceSafeguard={forceSafeguard}
      scanResults={scanResults}
      safeguardScanResults={safeguardResults}
      impersonatingAddress={isImpersonating ? userAccount : undefined}
      chainNetwork="mainnet"
    />
  );
};

export const ScanPageSolana: React.FC<{
  data: SolanaScanParams;
}> = ({ data }) => {
  return (
    <Layout>
      <ScanPageSolanaV2Inner data={data} />
    </Layout>
  );
};

export default ScanPageSolana;
