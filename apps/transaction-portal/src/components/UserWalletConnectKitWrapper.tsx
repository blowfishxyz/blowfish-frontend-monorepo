import { ConnectKitButton } from "connectkit";
import { UserWallet } from "~components/UserWallet";
import { shortenHex } from "~utils/hex";

export const UserWalletConnectKitWrapper: React.FC<{
  hideConnect?: boolean;
}> = ({ hideConnect }) => {
  return (
    <ConnectKitButton.Custom>
      {({ show, address, ensName, isConnecting, isConnected, chain }) => {
        if (hideConnect && isConnected) {
          return null;
        }
        return (
          <UserWallet
            show={show}
            truncatedAddress={address ? shortenHex(address) : undefined}
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
