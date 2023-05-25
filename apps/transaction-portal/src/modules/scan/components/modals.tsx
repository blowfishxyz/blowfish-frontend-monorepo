import { Modal } from "~components/common/Modal";
import useSWR from "swr";
import { MINIMUM_SUPPORTED_EXTENSION_VERSION } from "~config";
import { getExtensionInstallationUrl } from "~utils/utils";
import styled from "styled-components";
import { Row, Text } from "@blowfish/ui/core";
import { useState } from "react";
import { shortenHex } from "~utils/hex";
import { useAccount } from "wagmi";

export const TransactionNotFoundModal: React.FC = ({}) => {
  return (
    <Modal
      title="Something went wrong"
      description="Please close the window and try again"
    />
  );
};

export const OutdatedExtensionModal: React.FC = ({}) => {
  const { data: extensionUrl } = useSWR(
    "extension-url",
    getExtensionInstallationUrl
  );
  return (
    <Modal
      title="Outdated extension"
      closeAfterAction={false}
      description="Please update the Blowfish extension to the latest version and retry
      the transaction"
      action={() => {
        window.location.replace(
          extensionUrl || "https://extension.blowfish.xyz"
        );
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
  return (
    <Modal
      title="Switch account"
      description={
        <>
          You're currently connected with the account{" "}
          <Text design="primary">
            {shortenHex(address || "").toLowerCase()}
          </Text>
          , but the transaction was initiated by{" "}
          <Text design="primary">
            {shortenHex(correctAddress.toLowerCase()).toLowerCase()}
          </Text>
        </>
      }
      options={{ blocking: true }}
    />
  );
};

export const UnknownErrorModal: React.FC<{ onRetry: () => Promise<any> }> = ({
  onRetry,
}) => {
  return (
    <Modal
      title="Something went wrong"
      description="Something unexpected happened. Please try again later."
      action={onRetry}
      actionTitle="Retry"
      closeAfterAction={false}
    />
  );
};
