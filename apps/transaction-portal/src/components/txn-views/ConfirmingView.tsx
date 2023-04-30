import React from "react";
import { styled } from "styled-components";
import { TextXL, Column, GrayText, SecondaryButton } from "@blowfish/ui/core";
import { CardText, CardGrayLink } from "../cards/common";

const CancelButton = styled(SecondaryButton)`
  margin-top: 15px;
`;

const ConfirmingView = () => {
  return (
    <Column gap="md">
      <TextXL>Confirm in wallet</TextXL>
      <CardText>
        We have forwarded this signature request to your wallet. Please confirm
        it if you want to proceed with this signature.
      </CardText>
      <GrayText>
        Make sure that the request is coming from{" "}
        <CardGrayLink href="">blowfish.xyz</CardGrayLink>!
      </GrayText>
      <CancelButton>Cancel</CancelButton>
    </Column>
  );
};

export default ConfirmingView;
