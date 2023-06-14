import { Column, Row, Text } from "@blowfish/ui/core";
import React from "react";
import styled from "styled-components";
import { Divider } from "./common";
import { VerifiedIcon } from "@blowfish/ui/icons";
import { AssetPriceV2 } from "~components/common/AssetPriceV2";
import { ImageBase } from "~components/common/ImageBase";

const PreviewTokenContainer = styled.div``;

interface DataRowProps {
  label: string;
  value: React.ReactNode;
}

export const DataRowComponent: React.FC<DataRowProps> = ({ label, value }) => (
  <Row justifyContent="space-between" marginBottom={8}>
    <Text design="secondary" size="xs">
      {label}
    </Text>
    <Text size="xs">{value}</Text>
  </Row>
);

interface PreviewTokensProps {
  imageUrl: string | null;
  name: string | undefined;
  symbol?: string | undefined;
  price: number | null;
  tokenList: number | null;
}

export const PreviewTokens: React.FC<PreviewTokensProps> = ({
  imageUrl,
  name,
  symbol,
  price,
  tokenList,
}) => {
  return (
    <PreviewTokenContainer>
      <ImageBase
        src={imageUrl || undefined}
        alt={name || "Token preview"}
        width={48}
        height={48}
        borderRadius="100%"
      />
      <Column marginTop={10}>
        <Row alignItems="flex-start">
          <Text weight="semi-bold" size="md" marginBottom={5} marginRight={3}>
            {name}
          </Text>
          <VerifiedIcon />
        </Row>
        <Text design="secondary" size="xs">
          {symbol}
        </Text>
      </Column>
      <Divider margin="13px 0" />
      <div>
        {price ? (
          <DataRowComponent
            label="Price"
            value={<AssetPriceV2 totalValue={price} />}
          />
        ) : null}
        {tokenList ? (
          <DataRowComponent label="Token Lists" value={tokenList} />
        ) : null}
      </div>
    </PreviewTokenContainer>
  );
};
