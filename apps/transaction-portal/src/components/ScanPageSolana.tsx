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
  const { request, userAccount, isImpersonating, method, messageId } = data;

  return (
    <SolanaResultsView
      request={request}
      userAccount={userAccount}
      isImpersonating={isImpersonating}
      messageId={messageId}
      method={method}
    />
  );
};

const SolanaResultsView: React.FC<{
  request: ScanTransactionsSolanaRequest;
  userAccount: string;
  isImpersonating: boolean;
  method?: string;
  messageId: string | undefined;
}> = ({ request, userAccount, isImpersonating, method, messageId }) => {
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
  // Show safeguard results if they exist, otherwise show original results
  // TODO: regenerate the API client to include this field
  const recommended =
    originalResults?.safeguard &&
    "recommended" in originalResults.safeguard &&
    originalResults.safeguard.recommended;
  // const scanResults =
  //   safeguardResults && recommended ? safeguardResults : originalResults;
  // const scanResults = safeguardResults ? safeguardResults : originalResults;
  const scanResults = originalResults;

  console.log("scanResults", {
    originalResults,
    safeguardResults,
    recommended,
  });

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
