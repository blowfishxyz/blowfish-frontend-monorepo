import { SmallButtonPrimary, Text } from "@blowfish/ui/core";
import { isENS } from "@blowfish/utils/helpers";
import { shortenHex } from "@blowfish/utils/hex";
import { logger } from "@blowfish/utils/logger";
import { ethers } from "ethers";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Input } from "~components/Input";
import Toggle from "~components/Toggle";
import {
  getBlowfishImpersonationWallet,
  setBlowfishImpersonationWallet,
} from "~utils/storage";

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

const WalletInformationContainer = styled.form`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1em;
`;

const mainnetProvider = new ethers.providers.JsonRpcProvider(
  "https://rpc.ankr.com/eth"
);

const Impersonator: React.FC = () => {
  const walletImpersonatorInputRef = useRef<HTMLInputElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [impersonationWalletAddress, setImpersonationWalletAddress] =
    useState("");
  const [currentImpersonationWallet, setCurrentImpersonationWallet] =
    useState("");
  const isAddressValid =
    ethers.utils.isAddress(impersonationWalletAddress) ||
    isENS(impersonationWalletAddress);
  const [updatingImpersonatingWallet, setUpdatingImpersonatingWallet] =
    useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await getBlowfishImpersonationWallet();
      if (result) {
        const { address, ens } = result;
        setCurrentImpersonationWallet(ens ?? address);
        setIsEnabled(!!address);
      }
      setIsLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (isEnabled && walletImpersonatorInputRef.current) {
      walletImpersonatorInputRef.current.focus();
    }
  }, [isEnabled]);

  const updateImpersonationWallet = async (addressOrEns: string) => {
    try {
      setUpdatingImpersonatingWallet(true);
      if (!addressOrEns) {
        setCurrentImpersonationWallet("");
        setBlowfishImpersonationWallet("", "");
        return;
      }
      const [address, ens] = isENS(addressOrEns)
        ? [await mainnetProvider.resolveName(addressOrEns), addressOrEns]
        : [addressOrEns, await mainnetProvider.lookupAddress(addressOrEns)];

      if (!address) {
        throw new Error(`No address found for the given ENS: ${ens}`);
      }

      setCurrentImpersonationWallet(ens || address);
      setBlowfishImpersonationWallet(address, ens);
    } catch (error) {
      // TODO(Andrei) - add an error message in the UI
      logger.error(error);
    } finally {
      setUpdatingImpersonatingWallet(false);
      setImpersonationWalletAddress("");
    }
  };

  if (!isLoaded) return null;

  return (
    <ImpersonatorWrapper>
      <Row>
        {currentImpersonationWallet ? (
          <Text weight="semi-bold" design="success">
            Impersonating:{" "}
            {isENS(currentImpersonationWallet)
              ? currentImpersonationWallet
              : shortenHex(currentImpersonationWallet)}
          </Text>
        ) : (
          <Text weight="semi-bold">Impersonate Account</Text>
        )}
        <Toggle
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
        <WalletInformationContainer
          onSubmit={(e) => {
            e.preventDefault();
            updateImpersonationWallet(impersonationWalletAddress);
          }}
        >
          <Input
            error={!isAddressValid && impersonationWalletAddress.length > 0}
            type="text"
            value={impersonationWalletAddress || ""}
            onChange={(e) => setImpersonationWalletAddress(e.target.value)}
            ref={walletImpersonatorInputRef}
            placeholder="Enter address or ENS"
          />
          <SmallButtonPrimary
            type="submit"
            disabled={!isAddressValid || updatingImpersonatingWallet}
          >
            {updatingImpersonatingWallet ? <>Updating...</> : <>Update</>}
          </SmallButtonPrimary>
        </WalletInformationContainer>
      )}
    </ImpersonatorWrapper>
  );
};

export default Impersonator;
