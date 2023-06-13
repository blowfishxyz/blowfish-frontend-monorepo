import { Column, Row, Text } from "@blowfish/ui/core";
import React from "react";
import { Divider } from "./common";
import { VerifiedIcon } from "@blowfish/ui/icons";
import { DataRowComponent } from "./PreviewTokens";
import { TxnImage } from "~components/simulation-results/TxnImage";

interface PreviewNftProps {
  imageUrl: string | undefined;
  name: string | undefined;
  symbol?: string | undefined;
  tokenId: string | null;
  type: string;
  price: React.ReactNode;
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
      <TxnImage src={imageUrl} alt={name} $width={"120px"} $height={"120px"} />
      <Column marginTop={10}>
        <Row alignItems="flex-start">
          <Text weight="semi-bold" size="md" marginBottom={5} marginRight={3}>
            {name}
          </Text>
          <VerifiedIcon />
        </Row>
        <Text size="xs">#{tokenId}</Text>
      </Column>
      <Divider margin="13px 0" />
      <div>
        <DataRowComponent label="Type" value={type} />
        {symbol ? <DataRowComponent label="Symbol" value={symbol} /> : null}
        <DataRowComponent label="Floor Price" value={price} />
      </div>
    </div>
  );
};
