import { ConnectKitButton } from "connectkit";
import { ConnectButton } from "./ConnectButton";

export const CustomConnectkitButton: React.FC = () => (
  <ConnectKitButton.Custom>
    {({ show, address, ensName, isConnecting, isConnected }) => {
      return (
        <ConnectButton
          show={show}
          address={address}
          ensName={ensName}
          isConnecting={isConnecting}
          isConnected={isConnected}
        />
      );
    }}
  </ConnectKitButton.Custom>
);
