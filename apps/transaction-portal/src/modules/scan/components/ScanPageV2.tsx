import { ChainInfo } from "@blowfish/utils/chains";
import { DappRequest, Message, isSignMessageRequest } from "@blowfish/utils/types";
import { useMemo } from "react";
import { useAccount, useSwitchNetwork } from "wagmi";
import { ScanResults } from "~components/ScanResults";
import { useScanDappRequest } from "~hooks/useScanDappRequest";
import {
  ScanParamsSuccess,
  useScanParams,
} from "~modules/scan/hooks/useScanParams";
import { MessageError } from "~utils/utils";
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

export const ScanPageV2Inner: React.FC = () => {
  const data = useScanParams();

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

  return <FullfieldView data={data} />;
};

const FullfieldView: React.FC<{ data: ScanParamsSuccess }> = ({ data }) => {
  const { message, request, chain, isImpersonating, userAccount } = data;
  const { reject } = useUserDecision({
    chainId: chain?.chainId,
    message,
    request,
  });

  const isUnsupportedDangerousRequest =
    message && isSignMessageRequest(message.data)
      ? message?.data.payload.method === "eth_sign"
      : false;

  if (isUnsupportedDangerousRequest) {
    return <UnsupportedTransactionModal closeWindow={reject} />;
  }

  if (!chain?.chainInfo) {
    return <UnsupportedChainModal closeWindow={reject} />;
  }

  return (
    <ResultsView
      message={message}
      request={request}
      chainInfo={chain.chainInfo}
      chainId={chain.chainId}
      isImpersonating={isImpersonating}
      userAccount={userAccount}
      reject={reject}
    />
  );
};

const ResultsView: React.FC<{
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
  const simulationError = scanResults?.simulationResults?.error;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const overlay = useMemo(() => {
    if (scanResults?.action === "BLOCK") {
      return <BlockedTransactionModal closeWindow={reject} />;
    }
    if (simulationError) {
      if (simulationError.kind === "SIMULATION_FAILED") {
        return (
          <TransactionRevertedModal
            // HACK(Alex): Remove after API version update
            error={
              simulationError.humanReadableError ||
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (simulationError as any).parsedErrorMessage
            }
          />
        );
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
  }, [scanResults?.action, simulationError, reject, mutate]);

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
      <ScanResults
        request={request}
        scanResults={scanResults}
        dappUrl={message.origin || ""}
        chainFamily={chainFamily}
        chainNetwork={chainNetwork}
      />
    </>
  );
};

export const ScanPageV2: React.FC = () => {
  return (
    <Layout>
      <ScanPageV2Inner />
    </Layout>
  );
};

export default ScanPageV2;
