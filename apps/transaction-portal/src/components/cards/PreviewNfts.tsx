import { Column, Row, Text } from "@blowfish/ui/core";
import React from "react";
import styled from "styled-components";
import { TxnImage } from "~components/simulation-results-types/common";
import { Divider } from "./common";
import { VerifiedIcon } from "@blowfish/ui/icons";
import { DataRowComponent } from "./PreviewTokens";

const PreviewTokenContainer = styled.div``;

interface PreviewNftProps {
  imageUrl: string | undefined;
  name: string | undefined;
  symbol?: string | undefined;
}

export const PreviewNfts: React.FC<PreviewNftProps> = ({ imageUrl, name }) => {
  return (
    <PreviewTokenContainer>
      <TxnImage
        src={imageUrl}
        alt={name}
        $width={"120px"}
        $height={"120px"}
      />
      <Column marginTop={10}>
        <Row alignItems="flex-start">
          <Text weight="semi-bold" size="md" marginBottom={5} marginRight={3}>
            {name}
          </Text>
          <VerifiedIcon />
        </Row>
        <Text size="xs">
          #2831{" "}
          <Text design="secondary" size="xs">
            of 10,000
          </Text>
        </Text>
      </Column>
      <Divider margin="13px 0" />
      <div>
        <DataRowComponent label="Value (est.)" value="93.33 ETH" />
        <DataRowComponent
          label="Rarity"
          value={
            <>
              <Text size="xs">3,345</Text>
              <Text design="secondary" size="sm">
                / 10,000
              </Text>
            </>
          }
        />
        <DataRowComponent label="Floor Price" value="28.99 ETH" />
        <DataRowComponent label="Owners" value="1,899" />
      </div>
    </PreviewTokenContainer>
  );
};
