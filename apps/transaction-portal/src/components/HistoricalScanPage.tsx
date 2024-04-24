import { Button, Column, Row, Text } from "@blowfishxyz/ui";
import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { Layout, useLayoutConfig } from "~components/layout/Layout";
import { useSimulateByTxnHash } from "~hooks/useSimulateByTxnHash";

const HistoricalScanPage: React.FC = () => {
  const [txnHash, setTxnHash] = useState<string>("");
  const [dappDomain, setDappDomain] = useState<string>("");
  const [chainId, setChainId] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{
    txnHashError?: string;
    dappDomainError?: string;
    chainIdError?: string;
  }>({});
  const [, setLayoutConfig] = useLayoutConfig();

  useLayoutEffect(() => {
    setLayoutConfig((prev) => ({
      ...prev,
      hasRequestParams: false,
    }));
  }, [setLayoutConfig]);

  const handleTxnHashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({
      txnHashError: "",
    });
    setTxnHash(e.target.value);
  };

  const handleDappDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({
      dappDomainError: "",
    });
    setDappDomain(e.target.value);
  };

  const handleChainIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({
      chainIdError: "",
    });
    setChainId(parseInt(e.target.value, 10));
  };

  const simulateByTxnHash = useSimulateByTxnHash({ chainId });

  const handleSimulateClick = async () => {
    let dappDomainValidationError = undefined;
    let txnHashValidationError = undefined;

    try {
      if (dappDomain) {
        new URL(dappDomain);
      }
    } catch (_) {
      dappDomainValidationError =
        "Invalid URL. Make sure it's a full URL (ex: https://protect.blowfish.xyz)";
    }

    if (!txnHash) {
      txnHashValidationError = "Txn Hash cannot be empty.";
    }

    if (dappDomainValidationError || txnHashValidationError) {
      setError({
        dappDomainError: dappDomainValidationError,
        txnHashError: txnHashValidationError,
      });
      return;
    }

    try {
      setLoading(true);
      await simulateByTxnHash(txnHash, dappDomain);
      setError({});
    } catch (_) {
      setError({
        txnHashError: "An error occurred while fetching the transaction",
      });
    }
    setLoading(false);
  };

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
            {error.txnHashError && (
              <HistoricalInputErrorMessage>
                {error.txnHashError}
              </HistoricalInputErrorMessage>
            )}
          </Column>
          <Column gap="sm">
            <label htmlFor="dappDomain">dApp Domain: </label>
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
          </Column>
          <Column gap="sm">
            <label htmlFor="dappDomain">Chain ID: </label>
            <StyledHistoricalInput
              type="number"
              id="chainID"
              value={chainId}
              onChange={handleChainIdChange}
            />
          </Column>
          <Button
            stretch
            disabled={loading}
            loading={loading}
            onClick={handleSimulateClick}
          >
            Simulate
          </Button>
        </Column>
      </HistoricalFormWrapper>
    </Layout>
  );
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

export default HistoricalScanPage;
