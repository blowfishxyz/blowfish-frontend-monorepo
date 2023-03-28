import React from "react";
import { ConnectButton } from "../components/ConnectButton";
export const CustomConnectkitButton: React.FC = () => (
  <ConnectButton
    show={() => {
      alert("Showing ConnectKit modal");
    }}
    isConnected={true}
    isConnecting={false}
    address="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
    ensName={undefined}
  />
);
