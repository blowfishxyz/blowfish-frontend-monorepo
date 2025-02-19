import React from "react";
import { Row, Column } from "~/common/layout";
import { Text } from "~/common/text";
import { AssetPrice } from "~/simulation-result/components/AssetPrice";
import { Divider } from "~/simulation-result/components/Divider";
import { ImageBase } from "~/simulation-result/components/ImageBase";
import { Icon } from "~/common/icon";
import { PreviewTooltipContent } from "~/simulation-result/components/PreviewTooltip";

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
  verified: boolean;
}

export const PreviewTokens: React.FC<PreviewTokensProps> = ({
  imageUrl,
  name,
  symbol,
  price,
  tokenList,
  verified,
}) => {
  return (
    <PreviewTooltipContent>
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
    </PreviewTooltipContent>
  );
};
