import { Column, Row, Text } from "@blowfish/ui/core";
import React from "react";
import styled from "styled-components";
import { TxnImage } from "~components/simulation-results-types/common";
import { Divider } from "./common";
import { VerifiedIcon } from "@blowfish/ui/icons";

const PreviewTokenContainer = styled.div``;

const PreviewTokenNameWrapper = styled(Column)`
  margin-top: 10px;
`;

const DataRow = styled(Row)`
  margin-bottom: 8px;
`;

interface DataRowProps {
  label: string;
  value: React.ReactNode;
}

const DataRowComponent: React.FC<DataRowProps> = ({ label, value }) => (
  <DataRow justifyContent="space-between">
    <Text design="secondary" size="xs">
      {label}
    </Text>
    <Text size="xs">{value}</Text>
  </DataRow>
);

interface PreviewTokensProps {
  imageUrl: string | undefined;
  name: string | undefined;
  isNft: boolean;
  symbol?: string | undefined;
}

export const PreviewTokens: React.FC<PreviewTokensProps> = ({
  imageUrl,
  name,
  isNft,
  symbol,
}) => {
  return (
    <PreviewTokenContainer>
      <TxnImage
        src={imageUrl}
        alt="Preview Token"
        $width={isNft ? "120px" : "48px"}
        $height={isNft ? "120px" : "48px"}
      />
      <PreviewTokenNameWrapper>
        <Row alignItems="flex-start">
          <Text weight="semi-bold" size="md" marginBottom={5} marginRight={3}>
            {name}
          </Text>
          <VerifiedIcon />
        </Row>
        {isNft ? (
          <Text size="xs">
            #2831{" "}
            <Text design="secondary" size="xs">
              of 10,000
            </Text>
          </Text>
        ) : (
          <Text design="secondary" size="xs">
            {symbol}
          </Text>
        )}
      </PreviewTokenNameWrapper>
      <Divider margin="13px 0" />
      {isNft ? (
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
      ) : (
        <div>
          <DataRowComponent label="Price" value="$1.00" />
          <DataRowComponent label="Market Cap." value="$38.4bn" />
          <DataRowComponent label="Trading Volume" value="$221.2m" />
          <DataRowComponent label="Token Lists" value="3" />
        </div>
      )}
    </PreviewTokenContainer>
  );
};
