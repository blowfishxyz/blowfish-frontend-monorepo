import { Button, Column, Row } from "@blowfishxyz/ui";
import React, { useState } from "react";
import styled from "styled-components";
import { useAccount } from "wagmi";
import { Layout } from "~components/layout/Layout";
import { AccountNotConnectedModal } from "~components/modals";
import { useSimulateByTxnHash } from "~hooks/useSimulateByTxnHash";

const HistoricalDataPage: React.FC = () => {
  const [txnHash, setTxnHash] = useState<string>("");
  const [dappDomain, setDappDomain] = useState<string>("");
  const { isConnected } = useAccount();

  const handleTxnHashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTxnHash(e.target.value);
  };

  const handleDappDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDappDomain(e.target.value);
  };

  const simulateByTxnHash = useSimulateByTxnHash();

  const handleSimulateClick = () => {
    simulateByTxnHash(txnHash, dappDomain);
  };

  const HistoricalFormWrapper = styled(Row).attrs({
    justifyContent: "center",
    alignItems: "center",
  })`
    height: 100%;
  `;

  const StyledHistoricalInput = styled.input`
    width: 400px;
    max-width: 100%;
    height: 40px;
    border-radius: 8px;
    border: ${({ theme }) => `1px solid ${theme.colors.border}`};
    padding: 0 10px;

    &:focus {
      outline: none;
    }
  `;

  if (!isConnected) {
    return <AccountNotConnectedModal />;
  } else {
    return (
      <Layout>
        <HistoricalFormWrapper>
          <Column gap="lg">
            <Column gap="sm">
              <label htmlFor="txnHash">Txn Hash: </label>
              <StyledHistoricalInput
                type="text"
                id="txnHash"
                value={txnHash}
                onChange={handleTxnHashChange}
              />
            </Column>
            <Column gap="sm">
              <label htmlFor="dappDomain">Dapp Domain: </label>
              <StyledHistoricalInput
                type="text"
                id="dappDomain"
                value={dappDomain}
                onChange={handleDappDomainChange}
              />
            </Column>
            <Button stretch onClick={handleSimulateClick}>
              Simulate
            </Button>
          </Column>
        </HistoricalFormWrapper>
      </Layout>
    );
  }
};

export default HistoricalDataPage;
