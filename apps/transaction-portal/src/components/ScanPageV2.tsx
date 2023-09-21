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
import { MessageError, normalizeData } from "~utils/utils";
import {
  AccountNotConnectedModal,
  BlockedTransactionModal,
  OutdatedExtensionModal,
  SimulationErrorModal,
  TransactionNotFoundModal,
  TransactionRevertedModal,
  UnknownErrorModal,
  UnsupportedChainModal,
  UnsupportedTransactionModal,
  WrongAccountModal,
  WrongNetworkModal,
} from "./modals";
import { Layout } from "~components/layout/Layout";
import { ProtectLoadingScreen } from "~components/ProtectLoadingScreen";
import { useUserDecision } from "../hooks/useUserDecision";
import { useConnectedChainId } from "~utils/wagmi";
import ScanResultsV2 from "./ScanResultsV2";
import { getErrorFromScanResponse } from "@blowfishxyz/ui";

export const ScanPageV2Inner: React.FC<{
  data: ScanParams;
  isRequestParam: boolean;
}> = ({ data, isRequestParam }) => {
  const normalizedData = normalizeData(data);

  if (!normalizedData) {
    return <ProtectLoadingScreen key="loading" />;
  }

  if ("error" in normalizedData) {
    if (normalizedData.error === MessageError.PARAMS_NOT_OK) {
      return <TransactionNotFoundModal />;
    }
    if (normalizedData.error === MessageError.OUTDATED_EXTENSION) {
      return <OutdatedExtensionModal />;
    }

    return <TransactionNotFoundModal />;
  }

  return (
    <FullfieldView data={normalizedData} isRequestParam={isRequestParam} />
  );
};

const FullfieldView: React.FC<{
  data: ScanParamsSuccess;
  isRequestParam: boolean;
}> = ({ data, isRequestParam }) => {
  const { message, request, chain, isImpersonating, userAccount } = data;

  const { reject } = useUserDecision({
    chainId: isRequestParam ? undefined : chain?.chainId,
    message,
    request,
  });

  if (message && isBatchRequests(message.data)) {
    return (
      <UnsupportedTransactionModal type="batch_requests" closeWindow={reject} />
    );
  }

  if (!isRequestParam && !chain?.chainInfo) {
    return <UnsupportedChainModal closeWindow={reject} />;
  }

  return (
    <ResultsView
      message={message}
      request={request}
      chainInfo={chain?.chainInfo}
      chainId={chain?.chainId}
      isImpersonating={isImpersonating}
      userAccount={userAccount}
      reject={reject}
      isRequestParam={isRequestParam}
    />
  );
};

const ResultsView: React.FC<{
  message: Message<DappRequest["type"], DappRequest>;
  request: DappRequest;
  chainInfo: ChainInfo | undefined;
  chainId: number | undefined;
  userAccount: string;
  isImpersonating: boolean;
  isRequestParam: boolean;
  reject?: () => Promise<void>;
}> = ({
  chainInfo,
  chainId,
  userAccount,
  isImpersonating,
  message,
  reject,
  request,
  isRequestParam,
}) => {
  const { address, isConnected } = useAccount();
  const connectedChainId = useConnectedChainId();

  const { switchNetworkAsync } = useSwitchNetwork({
    throwForSwitchChainNotSupported: true,
  });
  let chainFamily, chainNetwork;
  if (chainInfo) {
    ({ chainFamily, chainNetwork } = chainInfo);
  }
  const {
    data: scanResults,
    error: scanError,
    mutate,
  } = useScanDappRequest(chainFamily, chainNetwork, request, message.origin);
  const error = getErrorFromScanResponse(scanResults?.simulationResults);

  const isUnsupportedDangerousRequest =
    message && isSignMessageRequest(message.data)
      ? message?.data.payload.method === "eth_sign"
      : false;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const overlay = useMemo(() => {
    if (scanResults?.action === "BLOCK") {
      return <BlockedTransactionModal closeWindow={reject} />;
    }

    if (isUnsupportedDangerousRequest) {
      return (
        <UnsupportedTransactionModal type="eth_sign" closeWindow={reject} />
      );
    }

    if (error) {
      if (error.kind === "SIMULATION_FAILED") {
        return <TransactionRevertedModal error={error.humanReadableError} />;
      }

      return (
        <SimulationErrorModal
          onRetry={async () => {
            await mutate();
          }}
        />
      );
    }

    return null;
  }, [
    scanResults?.action,
    error,
    reject,
    mutate,
    isUnsupportedDangerousRequest,
  ]);

  if (!isConnected || !connectedChainId) {
    return <AccountNotConnectedModal />;
  }

  if (address !== userAccount && !isImpersonating) {
    return <WrongAccountModal correctAddress={userAccount} />;
  }

  if (!isRequestParam && chainId !== connectedChainId) {
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

export const ScanPageV2: React.FC<{
  data: ScanParams;
  isRequestParam: boolean;
}> = ({ data, isRequestParam }) => {
  return (
    <Layout>
      <ScanPageV2Inner data={data} isRequestParam={isRequestParam} />
    </Layout>
  );
};

export default ScanPageV2;
