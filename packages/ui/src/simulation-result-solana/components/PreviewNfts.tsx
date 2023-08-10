import { Column, Row } from "~/common/layout";
import { Text } from "~/common/text";
import React from "react";
import { DataRowComponent } from "~/simulation-result-solana/components/PreviewTokens";
import { AssetPrice } from "~/simulation-result-solana/components/AssetPrice";
import { Divider } from "~/simulation-result-solana/components/Divider";
import { MetaplexTokenStandard } from "@blowfishxyz/api-client";
import { formatMetaplexStandard } from "~/simulation-result-solana/utils";

interface PreviewNftProps {
  name: string | undefined | null;
  symbol?: string | undefined;
  tokenId: string | null;
  type: MetaplexTokenStandard;
  price: number | null;
}

export const PreviewNfts: React.FC<PreviewNftProps> = ({
  name,
  tokenId,
  price,
  symbol,
  type,
}) => {
  return (
    <div>
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
        <DataRowComponent label="Type" value={formatMetaplexStandard(type)} />
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
