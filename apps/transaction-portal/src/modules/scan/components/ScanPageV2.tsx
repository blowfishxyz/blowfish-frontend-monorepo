import { ChainInfo } from "@blowfish/utils/chains";
import {
  Message,
  DappRequest,
  isSignMessageRequest,
} from "@blowfish/utils/types";
import { useModal } from "connectkit";
import { useLayoutEffect, useMemo, useState } from "react";
import { useAccount, useChainId, useDisconnect, useSwitchNetwork } from "wagmi";
import { ScanResults } from "~components/ScanResults";
import { useScanDappRequest } from "~hooks/useScanDappRequest";
import { useScanParams } from "~modules/scan/hooks/useScanParams";
import { MessageError } from "~utils/utils";
import {
  OutdatedExtensionModal,
  TransactionNotFoundModal,
  UnknownErrorModal,
  UnsupportedChainModal,
  WrongAccountModal,
} from "./modals";
import { Layout } from "~components/layout/Layout";
import { Row } from "@blowfish/ui/core";
import { useRouter } from "next/router";

export const ScanPageV2Inner: React.FC = () => {
  const data = useScanParams();
  const connectedChainId = useChainId();
  const { address, isConnected } = useAccount();
  const { switchNetworkAsync, isLoading: isSwitchingNetworks } =
    useSwitchNetwork({ throwForSwitchChainNotSupported: true });
  const { disconnectAsync } = useDisconnect();
  const { setOpen: setConnectWalletModalOpen } = useModal();

  if (!data) {
    return <div key="loading">loading...</div>;
  }

  if ("error" in data) {
    if (data.error === MessageError.PARAMS_NOT_OK) {
      // return <UnsupportedChainModal />;
      return <TransactionNotFoundModal />;
    }
    if (data.error === MessageError.OUTDATED_EXTENSION) {
      return <OutdatedExtensionModal />;
    }

    return <div>unknown error</div>;
  }

  const { message, request, chain, isImpersonating, userAccount } = data;

  const isUnsupportedDangerousRequest =
    message && isSignMessageRequest(message.data)
      ? message?.data.payload.method === "eth_sign"
      : false;

  // TODO move all checks inside ResultsView
  if (!chain?.chainInfo) {
    return <UnsupportedChainModal />;
  }

  if (!isConnected) {
    return <AccountNotConnected />;
  }

  if (address !== userAccount && !isImpersonating) {
    return <WrongAccountModal correctAddress={userAccount} />;
  }

  if (chain.chainId !== connectedChainId) {
    return <div>wrong chain, please change</div>;
  }

  if (isUnsupportedDangerousRequest) {
    return <div>TransactionUnsupportedScreen</div>;
  }

  return (
    <ResultsView
      messageOrigin={message.origin}
      request={request}
      chainInfo={chain.chainInfo}
    />
  );
};

const ResultsView: React.FC<{
  messageOrigin: string | undefined;
  request: DappRequest;
  chainInfo: ChainInfo;
}> = ({ chainInfo, messageOrigin, request }) => {
  const { chainFamily, chainNetwork } = chainInfo;
  const {
    data: scanResults,
    error: scanError,
    mutate,
    isValidating,
  } = useScanDappRequest(chainFamily, chainNetwork, request, messageOrigin);
  const simulationError = scanResults?.simulationResults?.error;

  const [hasDismissedScreen, setHasDismissedScreen] = useState(false);

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
  }, [scanResults?.action]);

  if (scanError) {
    return <UnknownErrorModal onRetry={mutate} />;
  }

  if (!scanResults) {
    return <div key="loading">loading...</div>;
  }

  // TODO: replace with new UI
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
  }, []);
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
