import { Column } from "~/Column";
import { Row } from "~/Row";
import { Text } from "~/Text";
import React from "react";
import { DataRowComponent } from "./PreviewTokens";
import { ImageBase } from "~/simulation-results/ImageBase";
import { AssetPrice } from "~/simulation-results/AssetPrice";
import { Divider } from "~/simulation-results/Divider";

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
      <Divider margin="13px 0" />
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
