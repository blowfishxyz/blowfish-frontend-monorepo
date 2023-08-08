import React from "react";
import { styled } from "styled-components";
import { Row, Column } from "~/common/layout";
import { Text } from "~/common/text";
import { AssetPrice } from "~/simulation-result-solana/components/AssetPrice";
import { Divider } from "~/simulation-result-solana/components/Divider";
import { Icon } from "~/common/icon";

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
  name: string | undefined;
  symbol?: string | undefined;
  price: number | null;
  tokenList: number | null;
  verified: boolean;
}

export const PreviewTokens: React.FC<PreviewTokensProps> = ({
  name,
  symbol,
  price,
  tokenList,
  verified,
}) => {
  return (
    <PreviewTokenContainer>
      <Column marginTop={10}>
        <Row alignItems="flex-start">
          <Text weight="semi-bold" size="md" marginBottom={5} marginRight={3}>
            {name}
          </Text>
          {verified && <Icon variant="verified" size={19} />}
        </Row>
        <Text design="secondary" size="xs">
          {symbol}
        </Text>
      </Column>
      <Divider $margin="13px 0" />
      <div>
        {price ? (
          <DataRowComponent
            label="Price"
            value={<AssetPrice totalValue={price} />}
          />
        ) : null}
        {tokenList ? (
          <DataRowComponent label="Token Lists" value={tokenList} />
        ) : null}
      </div>
    </PreviewTokenContainer>
  );
};
