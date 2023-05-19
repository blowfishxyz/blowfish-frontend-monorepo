import { Column, Row, Text } from "@blowfish/ui/core";
import React from "react";
import styled from "styled-components";
import {
  SmallGrayText,
  TxnImage,
} from "~components/simulation-results-types/common";
import { Divider } from "./common";
import { VerifiedIcon } from "@blowfish/ui/icons";

const PreviewTokenContainer = styled.div``;

const PreviewTokenNameWrapper = styled(Column)`
  margin-top: 10px;
`;

const PreviewTokenName = styled(Text)`
  margin-bottom: 5px;
  margin-right: 3px;
  font-size: 15px;
`;

const PreviewTokenMoreInfo = styled(Text)`
  font-size: 12px;
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
    <SmallGrayText>{label}</SmallGrayText>
    <PreviewTokenMoreInfo>{value}</PreviewTokenMoreInfo>
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
          <PreviewTokenName weight="semi-bold">{name}</PreviewTokenName>
          <VerifiedIcon />
        </Row>
        {isNft ? (
          <PreviewTokenMoreInfo>
            #2831 <SmallGrayText>of 10,000</SmallGrayText>
          </PreviewTokenMoreInfo>
        ) : (
          <SmallGrayText>{symbol}</SmallGrayText>
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
                <PreviewTokenMoreInfo>3,345</PreviewTokenMoreInfo>
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
