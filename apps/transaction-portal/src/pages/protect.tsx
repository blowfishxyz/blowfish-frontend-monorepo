import React from "react";
import { styled } from "styled-components";
import { Row, size } from "@blowfish/ui/core";
import ConfirmTxn from "~components/cards/ConfirmTxn";
import PreviewTxn from "~components/cards/PreviewTxn";
import {
  dummyTxnSimulationData,
  // dummySignatureData,
} from "~components/simulation-results-types/mock-data";

const ProtectContainer = styled(Row)`
  flex-grow: 1;
  background: #efefef;
  padding: 80px;

  @media only screen and (max-width: ${size.lg}) {
    padding: 40px;
  }

  @media only screen and (max-width: ${size.md}) {
    flex-wrap: wrap;
    padding: 24px;
  }
`;

const Protect = () => {
  return (
    <ProtectContainer gap="lg" align="flex-start">
      {/* NOTE: One is the screen when you have a txn simulation result and the other shows when it's a signature (e.g wallet connect) */}
      <PreviewTxn
        txnSimulationData={dummyTxnSimulationData}
        simulationType="transaction"
      />
      {/* <PreviewTxn
        signatureData={dummySignatureData}
        simulationType="signature"
      /> */}
      <ConfirmTxn />
    </ProtectContainer>
  );
};

export default Protect;
