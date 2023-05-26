import { ConnectKitButton } from "connectkit";
import { UserWallet } from "~components/UserWallet";

export const UserWalletConnectKitWrapper = () => {
  return (
    <ConnectKitButton.Custom>
      {({
        show,
        truncatedAddress,
        ensName,
        isConnecting,
        isConnected,
        chain,
      }) =>
        isConnected ? (
          <UserWallet
            show={show}
            truncatedAddress={truncatedAddress}
            ensName={ensName}
            isConnecting={isConnecting}
            isConnected={isConnected}
            chain={chain}
          />
        ) : null
      }
    </ConnectKitButton.Custom>
  );
};
