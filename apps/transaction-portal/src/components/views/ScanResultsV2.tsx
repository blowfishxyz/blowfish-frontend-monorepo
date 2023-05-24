import { Row } from "@blowfish/ui/core";
import React from "react";
import { styled } from "styled-components";
import { PreviewTxn } from "~components/cards/PreviewTxn";
import { dummySignatureData } from "~components/simulation-results-types/mock-data";

const ScanResultsWrapper = styled(Row)`
  height: 100%;
`;

const ScanResults = () => {
  return (
    <ScanResultsWrapper justifyContent="center" alignItems="center">
      <PreviewTxn
        simulationType="signature"
        signatureData={dummySignatureData}
      />
    </ScanResultsWrapper>
  );
};

export default ScanResults;
