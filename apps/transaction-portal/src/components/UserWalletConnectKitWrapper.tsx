import { ConnectKitButton } from "connectkit";
import { UserWallet } from "~components/UserWallet";

export const UserWalletConnectKitWrapper: React.FC<{
  hideConnect?: boolean;
}> = ({ hideConnect }) => {
  return (
    <ConnectKitButton.Custom>
      {({
        show,
        truncatedAddress,
        ensName,
        isConnecting,
        isConnected,
        chain,
      }) => {
        if (hideConnect && isConnected) {
          return null;
        }
        return (
          <UserWallet
            show={show}
            truncatedAddress={truncatedAddress}
            ensName={ensName}
            isConnecting={isConnecting}
            isConnected={isConnected}
            chain={chain}
          />
        );
      }}
    </ConnectKitButton.Custom>
  );
};
