import { ConnectKitButton } from "connectkit";
import { PrimaryButton } from "~components/Buttons";

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
