import React from "react";
import { GrayText, Row, Text } from "@blowfish/ui/core";
import { styled } from "styled-components";
import Chip from "../chips/Chip";
import { CardWrapper, CardContent, Divider } from "./CardCommonStyles";

const Title = styled(Text)`
  font-size: 22px;
  font-weight: 400;
  line-height: 25px;
`;

const SmallGrayText = styled(GrayText)`
  font-size: 13px;
`;

const PreviewTxn = () => {
  return (
    <CardWrapper>
      <CardContent>
        <Row justify="space-between">
          <Title>Preview</Title>
          <Chip
            text={
              <p>
                <b>Low</b> Risk
              </p>
            }
            variant="primary"
          />
        </Row>
      </CardContent>
      <Divider margin="1rem 0" />
      <CardContent>
        <Row justify="space-between">
          <SmallGrayText>Simulation</SmallGrayText>

          {/* // TODO: Conditionally display */}
          <SmallGrayText>Value</SmallGrayText>
        </Row>
      </CardContent>
    </CardWrapper>
  );
};

export default PreviewTxn;
