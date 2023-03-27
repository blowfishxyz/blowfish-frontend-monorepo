import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div``;
export const ConnectKitProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <StyledWrapper>{children}</StyledWrapper>;
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
  return <StyledWrapper>{children}</StyledWrapper>;
};

const ConnectKitButtonCustom: React.FC<ConnectButtonRendererProps> = ({
  children,
}) => {
  return (
    <StyledWrapper>
      {children ? (
        children({
          show: () => {
            alert("Showing ConnectKit modal");
          },
          isConnected: true,
          isConnecting: false,
          address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
          ensName: undefined,
        })
      ) : (
        <div></div>
      )}
    </StyledWrapper>
  );
};

ConnectKitButton.Custom = ConnectKitButtonCustom;

export const useModal = () => ({
  setOpen: (value: boolean) => {
    alert(`Toggling ConnectKit modal: ${value}`);
  },
});
