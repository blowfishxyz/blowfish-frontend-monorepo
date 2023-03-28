import React from "react";

export const ConnectKitProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <>{children}</>;
};

// NOTE(kimpers): Lifted from https://github.com/family/connectkit/blob/main/packages/connectkit/src/components/ConnectButton/index.tsx#L101-L115
type ConnectButtonRendererProps = {
  children?: (renderProps: {
    show?: () => void;
    isConnected: boolean;
    isConnecting: boolean;
    address?: string;
    ensName?: string;
  }) => React.ReactNode;
};

export const ConnectKitButton: React.FC<React.PropsWithChildren> & {
  Custom: React.FC<ConnectButtonRendererProps>;
} = ({ children }) => {
  return <>{children}</>;
};

// TODO: Move Connect button to own component and mock the entire thing!
const ConnectKitButtonCustom: React.FC<ConnectButtonRendererProps> = ({
  children,
}) => {
  return (
    <>
      {children
        ? children({
            show: () => {
              alert("Showing ConnectKit modal");
            },
            isConnected: true,
            isConnecting: false,
            address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
            ensName: undefined,
          })
        : null}
    </>
  );
};

ConnectKitButton.Custom = ConnectKitButtonCustom;

export const useModal = () => ({
  setOpen: (value: boolean) => {
    alert(`Toggling ConnectKit modal: ${value}`);
  },
});
