import React from "react";
import { styled } from "styled-components";
import { TextXL, Column, GrayText, SecondaryButton } from "@blowfish/ui/core";
import { StyledText, GrayLink } from "../cards/CardCommonStyles";

const CancelButton = styled(SecondaryButton)`
  margin-top: 15px;
`;

const ConfirmingView = () => {
  return (
    <Column gap="md">
      <TextXL>Confirm in wallet</TextXL>
      <StyledText>
        We have forwarded this signature request to your wallet. Please confirm
        it if you want to proceed with this signature.
      </StyledText>
      <GrayText>
        Make sure that the request is coming from{" "}
        <GrayLink href="">blowfish.xyz</GrayLink>!
      </GrayText>
      <CancelButton>Cancel</CancelButton>
    </Column>
  );
};

export default ConfirmingView;
