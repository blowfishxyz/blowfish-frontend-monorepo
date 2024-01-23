import {
  OutdatedExtensionModal,
  TransactionNotFoundModal,
  UnknownErrorModal,
} from "./modals";
import { Layout } from "~components/layout/Layout";
import { ProtectLoadingScreen } from "~components/ProtectLoadingScreen";
import { ScanTransactionsSolanaRequest } from "@blowfishxyz/api-client/.";
import { useScanTransactionsSolana } from "~hooks/useScanTransactionSolana";
import ScanResultsSolana from "./ScanResultsSolana";
import {
  SolanaScanParams,
  SolanaSuccessParams,
} from "~hooks/useURLRequestParams";
import { MessageError } from "~utils/utils";

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
  const { request, userAccount, isImpersonating } = data;

  return (
    <SolanaResultsView
      request={request}
      userAccount={userAccount}
      isImpersonating={isImpersonating}
    />
  );
};

const SolanaResultsView: React.FC<{
  request: ScanTransactionsSolanaRequest;
  userAccount: string;
  isImpersonating: boolean;
}> = ({ request, userAccount, isImpersonating }) => {
  const {
    data: scanResults,
    error: scanError,
    mutate,
  } = useScanTransactionsSolana({
    transactions: request.transactions,
    userAccount: userAccount,
    metadata: request.metadata,
    chainNetwork: "mainnet",
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
      scanResults={scanResults}
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
