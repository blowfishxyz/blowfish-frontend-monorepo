import { ChainInfo } from "@blowfish/utils/chains";
import {
  DappRequest,
  Message,
  isBatchRequests,
  isSignMessageRequest,
} from "@blowfish/utils/types";
import { useMemo } from "react";
import { useAccount, useSwitchNetwork } from "wagmi";
import { useScanDappRequest } from "~hooks/useScanDappRequest";
import { ScanParams, ScanParamsSuccess } from "~hooks/useScanParams";
import { MessageError } from "~utils/utils";
import {
  AccountNotConnectedModal,
  BlockedTransactionModal,
  OutdatedExtensionModal,
  TransactionNotFoundModal,
  UnknownErrorModal,
  UnsupportedChainModal,
  UnsupportedTransactionModal,
  WrongAccountModal,
  WrongNetworkModal,
} from "./modals";
import { Layout, useLayoutConfig } from "~components/layout/Layout";
import { ProtectLoadingScreen } from "~components/ProtectLoadingScreen";
import { useUserDecision } from "../hooks/useUserDecision";
import { useConnectedChainId } from "~utils/wagmi";
import ScanResultsV2 from "./ScanResultsV2";
import { ApiClientProvider } from "~hooks/useClient";
import { ScanTransactionsSolanaRequest } from "@blowfishxyz/api-client/.";
import { useScanTransactionsSolana } from "~hooks/useScanTransactionSolana";
import ScanResultsSolana from "./ScanResultsSolana";
import {
  SolanaScanParams,
  SolanaSuccessParams,
} from "~hooks/useURLRequestParams";

export const ScanPageV2Inner: React.FC<{
  data: ScanParams | SolanaScanParams;
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

  if ("isSolana" in data && data.isSolana) {
    return <SolanaFullfieldView data={data} />;
  } else {
    return <EvmFullfieldView data={data as ScanParamsSuccess} />;
  }
};

const SolanaFullfieldView: React.FC<{ data: SolanaSuccessParams }> = ({
  data,
}) => {
  const { request, userAccount, isImpersonating } = data;

  return (
    <ApiClientProvider
      config={{
        basePath: process.env.NEXT_PUBLIC_BLOWFISH_API_BASE_URL as string,
      }}
    >
      <SolanaResultsView
        request={request}
        userAccount={userAccount}
        isImpersonating={isImpersonating}
      />
    </ApiClientProvider>
  );
};

const EvmFullfieldView: React.FC<{
  data: ScanParamsSuccess;
}> = ({ data }) => {
  const { message, request, chain, isImpersonating, userAccount } = data;
  const { reject } = useUserDecision({
    chainId: chain?.chainId,
    message,
    request,
  });

  if (message && isBatchRequests(message.data)) {
    return (
      <UnsupportedTransactionModal type="batch_requests" closeWindow={reject} />
    );
  }

  if (!chain?.chainInfo) {
    return <UnsupportedChainModal closeWindow={reject} />;
  }

  return (
    <ApiClientProvider
      config={{
        basePath: process.env.NEXT_PUBLIC_BLOWFISH_API_BASE_URL as string,
      }}
    >
      <EvmResultsView
        message={message}
        request={request}
        chainInfo={chain.chainInfo}
        chainId={chain.chainId}
        isImpersonating={isImpersonating}
        userAccount={userAccount}
        reject={reject}
      />
    </ApiClientProvider>
  );
};

const EvmResultsView: React.FC<{
  message: Message<DappRequest["type"], DappRequest>;
  request: DappRequest;
  chainInfo: ChainInfo;
  chainId: number;
  userAccount: string;
  isImpersonating: boolean;
  reject?: () => Promise<void>;
}> = ({
  chainInfo,
  chainId,
  userAccount,
  isImpersonating,
  message,
  reject,
  request,
}) => {
  const { address, isConnected } = useAccount();
  const connectedChainId = useConnectedChainId();

  const { switchNetworkAsync } = useSwitchNetwork({
    throwForSwitchChainNotSupported: true,
  });
  const { chainFamily, chainNetwork } = chainInfo;
  const {
    data: scanResults,
    error: scanError,
    mutate,
  } = useScanDappRequest(chainFamily, chainNetwork, request, message.origin);
  const [{ hasRequestParams }] = useLayoutConfig();

  const isUnsupportedDangerousRequest =
    message && isSignMessageRequest(message.data)
      ? message?.data.payload.method === "eth_sign"
      : false;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const overlay = useMemo(() => {
    if (!hasRequestParams && scanResults?.action === "BLOCK") {
      return <BlockedTransactionModal closeWindow={reject} />;
    }

    if (isUnsupportedDangerousRequest) {
      return (
        <UnsupportedTransactionModal type="eth_sign" closeWindow={reject} />
      );
    }

    return null;
  }, [
    scanResults?.action,
    reject,
    isUnsupportedDangerousRequest,
    hasRequestParams,
  ]);

  if (!hasRequestParams) {
    if (!isConnected || !connectedChainId) {
      return <AccountNotConnectedModal />;
    }

    if (address !== userAccount && !isImpersonating) {
      return <WrongAccountModal correctAddress={userAccount} />;
    }

    if (chainId !== connectedChainId) {
      return (
        <WrongNetworkModal
          targetChainId={chainId}
          connectedChainId={connectedChainId}
          switchNetwork={async (chainId) => {
            await switchNetworkAsync?.(chainId);
          }}
        />
      );
    }
  }

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
    <>
      {overlay}
      <ScanResultsV2
        request={request}
        scanResults={scanResults}
        message={message}
        dappUrl={message.origin || ""}
        chainFamily={chainFamily}
        chainNetwork={chainNetwork}
        impersonatingAddress={isImpersonating ? userAccount : undefined}
      />
    </>
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
    <>
      <ScanResultsSolana
        request={request}
        scanResults={scanResults}
        impersonatingAddress={isImpersonating ? userAccount : undefined}
        chainNetwork="mainnet"
      />
    </>
  );
};

export const ScanPageV2: React.FC<{
  data: ScanParams | SolanaScanParams;
}> = ({ data }) => {
  return (
    <Layout>
      <ScanPageV2Inner data={data} />
    </Layout>
  );
};

export default ScanPageV2;
