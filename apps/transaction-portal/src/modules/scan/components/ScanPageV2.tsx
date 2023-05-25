import { useCallback, useMemo, useState } from "react";
import { ChainInfo } from "@blowfish/utils/chains";
import {
  Message,
  DappRequest,
  isSignMessageRequest,
} from "@blowfish/utils/types";
import { useModal } from "connectkit";
import { useAccount, useChainId, useDisconnect, useSwitchNetwork } from "wagmi";
import { useScanDappRequest } from "~hooks/useScanDappRequest";
import { useScanParams } from "~modules/scan/hooks/useScanParams";
import { MessageError } from "~utils/utils";
import ScanResultsV2 from "./ScanResultsV2";
import { logger } from "@blowfish/utils/logger";
import { sendAbort, sendResult } from "~utils/messages";

export const ScanPageV2: React.FC = () => {
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
      return <div>TransactionNotFoundScreen</div>;
    }
    if (data.error === MessageError.OUTDATED_EXTENSION) {
      return <div>OutdatedExtensionScreen</div>;
    }
    if (data.error === MessageError.FETCH_ERROR) {
      return <div>UnknownErrorScreen with retry and try to show api error</div>;
    }

    return <div>unknown error</div>;
  }

  const { message, request, chain, isImpersonating, userAccount } = data;

  const isUnsupportedDangerousRequest =
    message && isSignMessageRequest(message.data)
      ? message?.data.payload.method === "eth_sign"
      : false;

  if (!chain?.chainInfo) {
    return <div>unsupported chain</div>;
  }

  if (!isConnected) {
    return <div>Account not connected</div>;
  }

  if (address !== userAccount && !isImpersonating) {
    return <div>wrong account, please change</div>;
  }

  if (chain.chainId !== connectedChainId) {
    return <div>wrong chain, please change</div>;
  }

  if (isUnsupportedDangerousRequest) {
    return <div>TransactionUnsupportedScreen</div>;
  }

  return (
    <ResultsView
      message={message}
      messageOrigin={message.origin}
      request={request}
      chainInfo={chain.chainInfo}
    />
  );
};

const ResultsView: React.FC<{
  message: any,
  messageOrigin: string | undefined;
  request: DappRequest;
  chainInfo: ChainInfo;
}> = ({ chainInfo, messageOrigin, request, message }) => {
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

  const handleUserAction = useCallback(
    async (shouldProceed: boolean) => {
      if (!message) {
        logger.error("Error: Cannot proceed, no message to respond to ");
        return;
      }
      if (!request) {
        logger.error("Error: Cannot proceed, no request to respond to ");
        return;
      }

      logger.debug(request);

      if (shouldProceed) {
        if (isSignMessageRequest(request)) {
          const { payload } = request;
          if (payload.method === "personal_sign") {
            // NOTE: domain mismatch on SIWE, so we just pass the message back to the dapp
            logger.debug("personal_sign - send message back to dapp");
            await sendResult(message.id, payload.message);
          }
        } else {
          // TODO: This should never happen
          logger.error("Unsupported operation ", request);
          alert("UNSUPPORTED OPERATION");
        }
      } else {
        await sendAbort(message.id);
      }
      window.close();
    },
    [message, request]
  );

  if (!scanResults) {
    return <div key="loading">loading...</div>;
  }

  return (
    <ScanResultsV2
      request={request}
      scanResults={scanResults}
      dappUrl={messageOrigin || ""}
      chainFamily={chainFamily}
      chainNetwork={chainNetwork}
      handleUserAction={handleUserAction}
    />
  );
};
