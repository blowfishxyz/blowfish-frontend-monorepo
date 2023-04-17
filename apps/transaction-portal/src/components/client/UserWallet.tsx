import { Column, Row, Text } from "@blowfish/ui/core";
import { ConnectKitButton, ChainIcon } from "connectkit";
import styled from "styled-components";
import { SwitchIcon } from "~components/icons/SwitchIcon";
import { shortenEnsName } from "~utils/utils";

const StyledContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 58px;
  padding: 6px 9px;
  gap: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  height: 45px;
  width: 200px;
`;

const Connected = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  background: #00b94a;
  height: 8px;
  width: 8px;
  outline: 2px solid white;
`;

const ChainContainer = styled(Row)`
  position: relative;
  width: 30px;
`;

const AddressColumn = styled(Column)`
  text-align: left;
  line-height: 17px;

  span:nth-child(2) {
    opacity: 0.5;
    font-size: 11px;
    line-height: 13px;
  }
`;

const SwitchIconContainer = styled.div`
  width: 30px;
  height: 30px;
  min-width: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserWallet = () => {
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
        return (
          <StyledContainer onClick={show}>
            {!isConnected && isConnecting && <Text>Connecting...</Text>}
            {!isConnected && !isConnecting && <Text>Connect wallet</Text>}
            {isConnected && chain && (
              <>
                <ChainContainer>
                  <ChainIcon
                    id={chain.id}
                    unsupported={chain?.unsupported}
                    size={30}
                  />
                  {!chain?.unsupported && <Connected />}
                </ChainContainer>
                <AddressColumn>
                  {ensName && <Text>{shortenEnsName(ensName)}</Text>}
                  <Text>{truncatedAddress}</Text>
                </AddressColumn>
                <SwitchIconContainer>
                  <SwitchIcon />
                </SwitchIconContainer>
              </>
            )}
          </StyledContainer>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
export default UserWallet;
