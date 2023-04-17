import { PrimaryButton } from "@blowfish/ui/core";
import { ConnectKitButton } from "connectkit";

const SimpleConnectButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ show, isConnecting }) => {
        return (
          <PrimaryButton onClick={show} disabled={isConnecting}>
            {isConnecting ? <>Connecting...</> : <>Connect Wallet</>}
          </PrimaryButton>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
export default SimpleConnectButton;
