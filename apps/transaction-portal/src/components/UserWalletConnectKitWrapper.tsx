import { ConnectKitButton } from "connectkit";
import { UserWallet } from "~components/UserWallet";
import { shortenHex } from "~utils/hex";

export const UserWalletConnectKitWrapper: React.FC<{
  hideConnect?: boolean;
  onlyConnected?: boolean;
}> = ({ hideConnect, onlyConnected }) => {
  return (
    <ConnectKitButton.Custom>
      {({ show, address, ensName, isConnecting, isConnected, chain }) => {
        if (onlyConnected && !isConnected) {
          return null;
        }
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
