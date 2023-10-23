import { Button, Column, Row, Text } from "@blowfishxyz/ui";
import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { useAccount } from "wagmi";
import { Layout, useLayoutConfig } from "~components/layout/Layout";
import { AccountNotConnectedModal } from "~components/modals";
import { useSimulateByTxnHash } from "~hooks/useSimulateByTxnHash";

const HistoricalDataPage: React.FC = () => {
  const [txnHash, setTxnHash] = useState<string>("");
  const [dappDomain, setDappDomain] = useState<string>("");
  const [error, setError] = useState<{
    txnHashError?: string;
    dappDomainError?: string;
    genericError?: string;
  }>({});
  const { isConnected } = useAccount();
  const [, setLayoutConfig] = useLayoutConfig();

  useLayoutEffect(() => {
    setLayoutConfig((prev) => ({
      ...prev,
      hasRequestParams: false,
      isHistoricalScan: true,
    }));
  }, [setLayoutConfig]);

  const handleTxnHashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({
      txnHashError: "",
      genericError: "",
    });
    setTxnHash(e.target.value);
  };

  const handleDappDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({
      dappDomainError: "",
      genericError: "",
    });
    setDappDomain(e.target.value);
  };

  const simulateByTxnHash = useSimulateByTxnHash();

  const handleSimulateClick = async () => {
    try {
      new URL(dappDomain);
    } catch (_) {
      setError({ ...error, dappDomainError: "Invalid Dapp Domain URL." });
      setDappDomain("");
      return;
    }

    try {
      await simulateByTxnHash(txnHash, dappDomain);
      setError({});
    } catch (_) {
      setError({
        ...error,
        genericError:
          "An error occurred while simulating. Check your input and try again.",
      });
    }
  };

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
              {error.dappDomainError && (
                <HistoricalInputErrorMessage>
                  {error.dappDomainError}
                </HistoricalInputErrorMessage>
              )}
              {error.genericError && (
                <HistoricalInputErrorMessage>
                  {error.genericError}
                </HistoricalInputErrorMessage>
              )}
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

const HistoricalInputErrorMessage = styled(Text).attrs({
  size: "xs",
  weight: "bold",
})`
  width: 400px;
  max-width: 100%;
  color: ${({ theme }) => theme.colors.foregroundDanger};
`;

export default HistoricalDataPage;
