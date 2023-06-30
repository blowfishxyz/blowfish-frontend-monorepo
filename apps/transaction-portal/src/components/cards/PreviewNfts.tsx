import { Column, Row, Text } from "@blowfish/ui";
import React from "react";
import { Divider } from "./common";
import { DataRowComponent } from "./PreviewTokens";
import { ImageBase } from "~components/common/ImageBase";
import { AssetPriceV2 } from "~components/common/AssetPriceV2";

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
            value={<AssetPriceV2 totalValue={price} />}
          />
        ) : null}
      </div>
    </div>
  );
};
