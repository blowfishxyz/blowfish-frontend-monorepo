import { Modal } from "~components/common/Modal";
import useSWR from "swr";
import { capitalize, getExtensionInstallationUrl, sleep } from "~utils/utils";
import { Column, Text } from "@blowfish/ui/core";
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
import { sendPauseResumeSelection } from "~utils/messages";
import { useRouter } from "next/router";
import {
  BlowfishInvertedWarningIcon,
  BlowfishWarningIcon,
} from "@blowfish/ui/icons";
import styled from "styled-components";
import { getConnectorMetadata } from "~utils/wagmi";
import { ContentToggle } from "~components/ContentToggle";

export const TransactionNotFoundModal: React.FC = () => {
  const router = useRouter();
  return (
    <Modal
      title="Something went wrong"
      description="Please close the window and try again"
      content={<InvertedWarningIcon />}
      onCancel={() => {
        router.push("/v2");
      }}
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
      content={<InvertedWarningIcon />}
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

export const UnsupportedChainModal: React.FC<{
  closeWindow: () => Promise<void>;
}> = ({ closeWindow }) => {
  return (
    <Modal
      title="Unsupported Chain"
      description="This chain is currently not supported. More chains coming soon!"
      content={<InvertedWarningIcon />}
      options={{ blocking: true }}
      action={{ cb: closeWindow, title: "Close" }}
    />
  );
};

export const WrongAccountModal: React.FC<{ correctAddress: string }> = ({
  correctAddress,
}) => {
  const { address } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const description = useMemo(() => {
    if (!address) {
      return (
        <>
          You are disconnected, but the transaction was initiated by{" "}
          <Text design="primary">
            {shortenHex(correctAddress.toLowerCase()).toLowerCase()}
          </Text>
          . Change account to continue
        </>
      );
    }
    return (
      <>
        You are connected to the account{" "}
        <Text design="primary">{shortenHex(address || "").toLowerCase()}</Text>,
        but the transaction was initiated by{" "}
        <Text design="primary">
          {shortenHex(correctAddress.toLowerCase()).toLowerCase()}
        </Text>
        . Change account to continue
      </>
    );
  }, [address, correctAddress]);
  return (
    <Modal
      title="Switch account"
      content={<InvertedWarningIcon />}
      description={description}
      action={{ cb: () => disconnectAsync(), title: "Disconnect" }}
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
      content={<InvertedWarningIcon />}
      action={{ cb: action, title: actionText, closeOnComplete: true }}
      options={{ blocking: true }}
    />
  );
};

export const UnsupportedTransactionModal: React.FC<{
  closeWindow: () => void;
  type: "eth_sign" | "batch_requests";
}> = ({ closeWindow, type }) => {
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

  const description = useMemo(() => {
    if (type === "batch_requests") {
      return (
        <>
          We currently don’t support <b>batch requests</b>.
          <br /> Do not proceed unless you’re absolutely sure of what you’re
          doing.
        </>
      );
    }
    if (type === "eth_sign") {
      return (
        <>
          Signing messages with the <b>eth_sign method</b> is dangerous. This
          dApp is trying to get you to sign a message that looks like a
          transaction. We cannot scan the transaction and have no way of knowing
          what it does.
          <br />
          <br />{" "}
          <b>
            Do not proceed unless you’re absolutely sure of what you’re doing.
          </b>
        </>
      );
    }
  }, [type]);

  return (
    <Modal
      width={480}
      title={
        type === "batch_requests"
          ? "Unsupported action"
          : "Dangerous unsupported action"
      }
      content={<WarningIcon />}
      description={description}
      options={{ blocking: true }}
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
  const { connectors } = useConnect();
  const { connectAsync } = useConnect();
  const connector = connectors.filter((x) => x.ready)[0];
  const { label, installLink } = getConnectorMetadata({
    id: connector?.id,
    name: connector?.name,
  });

  const action = useMemo(() => {
    if (!connector) {
      return {
        cb: async () => {
          router.push(
            `/v2/start?redirect=${encodeURIComponent(router.asPath)}`
          );
        },
        title: "Continue",
        closeOnComplete: true,
      };
    }

    return {
      cb: async (hide: () => void) => {
        if (connector.ready) {
          await connectAsync({ connector });
          hide();
          return;
        }
        if (installLink) {
          window.open(installLink, "_blank", "noopener,noreferrer");
        }
      },
      closeOnComplete: false,
      title: connector.ready ? `Connect to ${label}` : `Install ${label}`,
    };
  }, [connectAsync, connector, installLink, label, router]);

  return (
    <Modal
      title="Connect account"
      description="To scan transactions, you need to connect your account"
      action={action}
      options={{ blocking: true }}
    />
  );
};

export const BlockedTransactionModal: React.FC<{
  closeWindow: undefined | (() => Promise<void>);
}> = ({ closeWindow }) => {
  return (
    <Modal
      title="Transaction Flagged"
      description={
        <>
          We believe this transaction is malicious and unsafe to sign. <br />
          <b>Approving may lead to loss of funds</b>
        </>
      }
      content={<WarningIcon />}
      onCancel={() => closeWindow?.()}
      options={{ blocking: true }}
      action={{
        closeOnComplete: true,
        title: "Ignore warning",
        design: "danger",
        cb: () => Promise.resolve(),
        primaryAction: true,
        priority: "primary",
      }}
    />
  );
};

const WarningIcon = styled(BlowfishWarningIcon)`
  width: 92px;
  height: 92px;
`;

const InvertedWarningIcon = styled(BlowfishInvertedWarningIcon)`
  width: 92px;
  height: 92px;
`;

export const UnknownErrorModal: React.FC<{ onRetry: () => Promise<void> }> = ({
  onRetry,
}) => {
  return (
    <Modal
      title="Something went wrong"
      content={<InvertedWarningIcon />}
      description="Something unexpected happened. Please try again later."
      action={{ cb: onRetry, title: "Retry", closeOnComplete: false }}
    />
  );
};

export const TransactionRevertedModal: React.FC<{
  error: string | undefined;
}> = ({ error }) => {
  return (
    <Modal
      title="Transaction Reverted"
      content={<InvertedWarningIcon />}
      description={
        <>
          The transaction reverted when we simulated it. Approving may lead to
          loss of funds
          <br />
          <br />
          {error ? (
            <ContentToggle message="View error message">
              <WarningMessageWrapper>
                <Text design="danger">{error}</Text>
              </WarningMessageWrapper>
            </ContentToggle>
          ) : null}
        </>
      }
    />
  );
};

const WarningMessageWrapper = styled(Column).attrs({
  padding: 12,
  borderRadius: 12,
})`
  background: ${(p) => p.theme.severityColors.CRITICAL.backgroundLight};
  word-break: break-word;
`;

export const SimulationErrorModal: React.FC<{
  onRetry: () => Promise<void>;
}> = ({ onRetry }) => {
  return (
    <Modal
      title="Simulation Failed"
      content={<InvertedWarningIcon />}
      description="We are unable to simulate this transaction. Approving may lead to loss of funds"
      action={{ cb: onRetry, title: "Retry", closeOnComplete: false }}
    />
  );
};
