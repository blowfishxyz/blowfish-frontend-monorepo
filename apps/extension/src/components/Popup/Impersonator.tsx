import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { SmallButtonPrimary } from "~components/Buttons";
import { Input } from "~components/Input";
import Toggle from "~components/Toggle";
import { Text } from "~components/Typography";
import { shortenHex } from "~utils/hex";
import {
  getBlowfishImpersonationWallet,
  setBlowfishImpersonationWallet,
} from "~utils/storage";
import { isENS } from "~utils/utils";

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

const ImpersonatorWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 100%;
  margin: 8px 0;
`;

const WalletInformationContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1em;
`;

const GreenText = styled(Text)`
  color: ${({ theme }) => theme.palette.green};
`;

const Impersonator: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [impersonationWalletAddress, setImpersonationWalletAddress] =
    useState("");
  const [currentImpersonationWallet, setCurrentImpersonationWallet] =
    useState("");
  const isAddressValid =
    ethers.utils.isAddress(impersonationWalletAddress) ||
    isENS(impersonationWalletAddress);

  useEffect(() => {
    (async () => {
      const storedWallet = await getBlowfishImpersonationWallet();
      setCurrentImpersonationWallet(storedWallet);
      setImpersonationWalletAddress(storedWallet);
      setIsEnabled(!!storedWallet);
      if (!storedWallet) {
        updateImpersonationWallet("");
      }
    })();
  }, []);

  const updateImpersonationWallet = (address: string) => {
    setCurrentImpersonationWallet(address);
    setBlowfishImpersonationWallet(address);
  };

  return (
    <ImpersonatorWrapper>
      <Row>
        {currentImpersonationWallet ? (
          <GreenText semiBold>
            Impersonating:{" "}
            {isENS(currentImpersonationWallet)
              ? currentImpersonationWallet
              : shortenHex(currentImpersonationWallet)}
          </GreenText>
        ) : (
          <Text semiBold>Impersonate Account</Text>
        )}
        <Toggle
          initialState={isEnabled}
          isActive={isEnabled}
          toggle={() => {
            if (isEnabled) {
              setImpersonationWalletAddress("");
              updateImpersonationWallet("");
            }
            setIsEnabled(!isEnabled);
          }}
        />
      </Row>
      {isEnabled && (
        <WalletInformationContainer>
          <Input
            error={!isAddressValid}
            type="text"
            value={impersonationWalletAddress || ""}
            onChange={(e) => setImpersonationWalletAddress(e.target.value)}
          />
          <SmallButtonPrimary
            disabled={!isAddressValid}
            onClick={() =>
              updateImpersonationWallet(impersonationWalletAddress)
            }
          >
            Update
          </SmallButtonPrimary>
        </WalletInformationContainer>
      )}
    </ImpersonatorWrapper>
  );
};

export default Impersonator;
