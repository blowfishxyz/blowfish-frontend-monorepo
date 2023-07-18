import { Column, Row } from "~/common/layout";
import { Text } from "~/common/text";
import React from "react";
import { DataRowComponent } from "~/simulation-result/components/PreviewTokens";
import { ImageBase } from "~/simulation-result/components/ImageBase";
import { AssetPrice } from "~/simulation-result/components/AssetPrice";
import { Divider } from "~/simulation-result/components/Divider";

interface PreviewNftProps {
  imageUrl: string | undefined;
  name: string | undefined;
  symbol?: string | undefined;
  tokenId: string | null;
  type: string;
  price: number | null;
}

export const PreviewNfts: React.FC<PreviewNftProps> = ({
  imageUrl,
  name,
  tokenId,
  price,
  symbol,
  type,
}) => {
  return (
    <div>
      <ImageBase
        src={imageUrl}
        alt={name || "Token preview"}
        width={120}
        height={120}
        borderRadius={6}
      />
      <Column marginTop={10}>
        <Row alignItems="flex-start">
          <Text weight="semi-bold" size="md" marginBottom={5} marginRight={3}>
            {name}
          </Text>
        </Row>
        <Text size="xs" truncate>
          #{tokenId}
        </Text>
      </Column>
      <Divider $margin="13px 0" />
      <div>
        <DataRowComponent label="Type" value={type} />
        {symbol ? <DataRowComponent label="Symbol" value={symbol} /> : null}
        {price ? (
          <DataRowComponent
            label="Floor Price"
            value={<AssetPrice totalValue={price} />}
          />
        ) : null}
      </div>
    </div>
  );
};
