import { ChainInfo } from "@blowfish/utils/chains";
import { DappRequest, isSignMessageRequest } from "@blowfish/utils/types";
import { useLayoutEffect, useMemo, useState } from "react";
import { useAccount, useChainId, useSwitchNetwork } from "wagmi";
import { ScanResults } from "~components/ScanResults";
import { useScanDappRequest } from "~hooks/useScanDappRequest";
import {
  ScanParamsSuccess,
  useScanParams,
} from "~modules/scan/hooks/useScanParams";
import { MessageError } from "~utils/utils";
import {
  OutdatedExtensionModal,
  TransactionNotFoundModal,
  UnknownErrorModal,
  UnsupportedChainModal,
  UnsupportedTransactionModal,
  WrongAccountModal,
  WrongNetworkModal,
} from "./modals";
import { Layout } from "~components/layout/Layout";
import { useRouter } from "next/router";
import { ProtectLoadingScreen } from "~components/ProtectLoadingScreen";
import { useUserDecision } from "../hooks/useUserDecision";

export const ScanPageV2Inner: React.FC = () => {
  const data = useScanParams();

  if (!data) {
    return <ProtectLoadingScreen key="loading" />;
  }

  if ("error" in data) {
    if (data.error === MessageError.PARAMS_NOT_OK) {
      // return <UnsupportedChainModal />;
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
    return <UnsupportedChainModal />;
  }

  return (
    <ResultsView
      messageOrigin={message.origin}
      request={request}
      chainInfo={chain.chainInfo}
      chainId={chain.chainId}
      isImpersonating={isImpersonating}
      userAccount={userAccount}
    />
  );
};

const ResultsView: React.FC<{
  messageOrigin: string | undefined;
  request: DappRequest;
  chainInfo: ChainInfo;
  chainId: number;
  userAccount: string;
  isImpersonating: boolean;
}> = ({
  chainInfo,
  chainId,
  userAccount,
  isImpersonating,
  messageOrigin,
  request,
}) => {
  const connectedChainId = useChainId();
  const { address, isConnected } = useAccount();
  const { switchNetworkAsync } = useSwitchNetwork({
    throwForSwitchChainNotSupported: true,
  });
  const { chainFamily, chainNetwork } = chainInfo;
  const {
    data: scanResults,
    error: scanError,
    mutate,
  } = useScanDappRequest(chainFamily, chainNetwork, request, messageOrigin);
  const simulationError = scanResults?.simulationResults?.error;

  const [hasDismissedScreen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const overlay = useMemo(() => {
    if (hasDismissedScreen) {
      return null;
    }
    if (scanResults?.action === "BLOCK") {
      return <div>block screen</div>;
    }
    if (simulationError) {
      if (simulationError.kind === "SIMULATION_FAILED") {
        return <div>transaction reverted</div>;
      } else {
        return <div>simulation failed</div>;
      }
    }

    return null;
  }, [scanResults?.action, hasDismissedScreen, simulationError]);

  if (!isConnected) {
    return <AccountNotConnected />;
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
    <ScanResults
      request={request}
      scanResults={scanResults}
      dappUrl={messageOrigin || ""}
      chainFamily={chainFamily}
      chainNetwork={chainNetwork}
    />
  );
};

const AccountNotConnected: React.FC = () => {
  const router = useRouter();
  useLayoutEffect(() => {
    router.push(`/start?redirect=${encodeURIComponent(router.asPath)}`);
  }, [router]);
  return null;
};

export const ScanPageV2: React.FC = () => {
  return (
    <Layout>
      <ScanPageV2Inner />
    </Layout>
  );
};

export default ScanPageV2;
