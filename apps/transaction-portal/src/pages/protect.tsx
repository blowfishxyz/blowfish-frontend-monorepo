import React from "react";
import { styled } from "styled-components";
import { Row, size } from "@blowfish/ui/core";
import ConfirmTxn from "~components/cards/ConfirmTxn";
import PreviewTxn from "~components/cards/PreviewTxn";

const ProtectContainer = styled(Row)`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  background: #efefef;
  padding: 5rem;

  @media only screen and (max-width: ${size.lg}) {
    flex-wrap: wrap;
    padding: 2.5rem;
  }
`;

const Protect = () => {
  return (
    <ProtectContainer gap="lg">
      <PreviewTxn />
      <ConfirmTxn />
    </ProtectContainer>
  );
};

export default Protect;
