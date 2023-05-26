import { Modal } from "~components/common/Modal";
import useSWR from "swr";
import { capitalize, getExtensionInstallationUrl, sleep } from "~utils/utils";
import { Text } from "@blowfish/ui/core";
import { useCallback, useMemo } from "react";
import { shortenHex } from "~utils/hex";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { chainIdToSupportedChainMapping } from "@blowfish/utils/chains";
import { useLocalStorage } from "react-use";
import {
  BlowfishOption,
  BlowfishPausedOptionType,
} from "@blowfish/utils/types";
import {
  PAUSE_DURATIONS,
  PauseDuration,
  useTransactionScannerPauseResume,
} from "@blowfish/hooks";
import { sendAbort, sendPauseResumeSelection } from "~utils/messages";
import { useRouter } from "next/router";
import { logger } from "~utils/logger";

export const TransactionNotFoundModal: React.FC<{
  messageId: string | undefined;
}> = ({ messageId }) => {
  return (
    <Modal
      title="Something went wrong"
      description="Please close the window and try again"
      action={
        messageId
          ? {
              cb: async () => {
                try {
                  await sendAbort(messageId);
                } catch (e) {
                  logger.debug("Error sending abort message: " + e);
                }
              },
              closeOnComplete: true,
              title: "Close",
            }
          : undefined
      }
    />
  );
};

export const OutdatedExtensionModal: React.FC = () => {
  const { data: extensionUrl } = useSWR(
    "extension-url",
    getExtensionInstallationUrl
  );
  return (
    <Modal
      title="Outdated extension"
      description="Please update the Blowfish extension to the latest version and retry
      the transaction"
      options={{ blocking: true }}
      action={{
        closeOnComplete: false,
        title: "Update",
        cb: async () => {
          window.location.replace(
            extensionUrl || "https://extension.blowfish.xyz"
          );
        },
      }}
    />
  );
};

export const UnsupportedChainModal: React.FC = () => {
  return (
    <Modal
      title="Unsupported Chain"
      description="This chain is currently not supported. More chains coming soon!"
    />
  );
};

export const WrongAccountModal: React.FC<{ correctAddress: string }> = ({
  correctAddress,
}) => {
  const { address } = useAccount();
  const { disconnectAsync } = useDisconnect();
  return (
    <Modal
      title="Switch account"
      description={
        <>
          You are connected to the account{" "}
          <Text design="primary">
            {shortenHex(address || "").toLowerCase()}
          </Text>
          , but the transaction was initiated by{" "}
          <Text design="primary">
            {shortenHex(correctAddress.toLowerCase()).toLowerCase()}
          </Text>
          . Change account to continue
        </>
      }
      action={{ cb: disconnectAsync, title: "Disconnect" }}
      options={{ blocking: true }}
    />
  );
};

export const WrongNetworkModal: React.FC<{
  targetChainId: number;
  connectedChainId: number;
  switchNetwork: (chainId: number) => Promise<void>;
}> = ({ targetChainId, connectedChainId, switchNetwork }) => {
  const targetChain = chainIdToSupportedChainMapping[targetChainId];
  const connectedChain = chainIdToSupportedChainMapping[connectedChainId];

  const description = useMemo(() => {
    if (!connectedChain) {
      return (
        <>
          You are connected to an unsupported network. Connect to{" "}
          <Text design="primary">
            {capitalize(targetChain.chainFamily)}{" "}
            {capitalize(targetChain.chainNetwork)}
          </Text>{" "}
        </>
      );
    }

    if (connectedChain.chainFamily !== targetChain.chainFamily) {
      return (
        <>
          You are connected to{" "}
          <Text design="primary">{capitalize(connectedChain.chainFamily)}</Text>{" "}
          but attempting to perform an action on{" "}
          <Text design="primary">{capitalize(targetChain.chainFamily)}</Text>
        </>
      );
    }

    return (
      <>
        You are connected to
        <Text design="primary">
          {capitalize(connectedChain.chainNetwork)}
        </Text>{" "}
        but attempting to perform an action on{" "}
        <Text design="primary">{capitalize(targetChain.chainNetwork)}</Text> to
        continue
      </>
    );
  }, [connectedChain, targetChain]);

  const actionText = useMemo(() => {
    if (!connectedChain) {
      return "Connect";
    }

    if (connectedChain.chainFamily !== targetChain.chainFamily) {
      return `Switch to ${capitalize(targetChain.chainFamily)}`;
    }

    return `Switch to ${capitalize(targetChain.chainNetwork)}`;
  }, [connectedChain, targetChain]);

  const action = useCallback(() => {
    return switchNetwork(targetChainId);
  }, [switchNetwork, targetChainId]);

  return (
    <Modal
      title="Switch network"
      description={description}
      action={{ cb: action, title: actionText, closeOnComplete: true }}
      options={{ blocking: true }}
    />
  );
};

export const UnsupportedTransactionModal: React.FC<{
  closeWindow: () => void;
}> = ({ closeWindow }) => {
  const router = useRouter();
  const [scanPaused, setScanPaused] = useLocalStorage<BlowfishPausedOptionType>(
    BlowfishOption.PREFERENCES_BLOWFISH_PAUSED
  );
  const { pauseScan } = useTransactionScannerPauseResume(
    scanPaused,
    setScanPaused
  );

  const pauseScannerAndCloseWindow = async () => {
    await sleep(1000);
    pauseScan(PauseDuration.OneHour);
    sendPauseResumeSelection({
      isPaused: true,
      until: Date.now() + PAUSE_DURATIONS[PauseDuration.OneHour],
    });
    closeWindow();
  };

  return (
    <Modal
      width={480}
      title="Dangerous unsupported action"
      description={
        <>
          Signing messages with the <b>eth_sign method</b> is dangerous. This
          dApp is trying to get you to sign a message that looks like a
          transaction. We cannot scan the transaction and have no way of knowing
          what it does.
          <br />
          <br />{" "}
          <b>
            Do not sign it unless you’re absolutely sure of what you’re doing.
          </b>
        </>
      }
      onCancel={() => router.replace("/dashboard")}
      action={{
        closeOnComplete: false,
        title: "Pause for 1 hour",
        design: "danger",
        cb: pauseScannerAndCloseWindow,
      }}
    />
  );
};

export const AccountNotConnectedModal: React.FC = () => {
  const router = useRouter();

  return (
    <Modal
      title="Connect account"
      description="To scan transactions, you need to connect your account"
      action={{
        cb: async () => {
          router.push(`/start?redirect=${encodeURIComponent(router.asPath)}`);
        },
        title: "Continue",
        closeOnComplete: true,
      }}
      options={{ blocking: true }}
    />
  );
};

export const UnknownErrorModal: React.FC<{ onRetry: () => Promise<void> }> = ({
  onRetry,
}) => {
  return (
    <Modal
      title="Something went wrong"
      description="Something unexpected happened. Please try again later."
      action={{ cb: onRetry, title: "Retry", closeOnComplete: false }}
    />
  );
};
