import { Column, GrayText, PrimaryButton, Row, Text } from "@blowfish/ui/core";
import React from "react";
import styled from "styled-components";
import {
  SmallGrayText,
  TxnImage,
} from "~components/simulation-results-types/common";
import { Divider } from "./common";
import { VerifiedIcon } from "@blowfish/ui/icons";

const PreviewTokenContainer = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.palette.white};
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 1;
  top: 0;
  left: 60px;
  width: 237px;
  border-radius: 12px;

  ${SmallGrayText} {
    font-size: 12px;
  }
`;

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

const SmallButtonPrimary = styled(PrimaryButton)`
  height: 40px;
  font-size: 15px;
  margin-top: 10px;
`;

const PreviewTokenSiteName = styled(Text)`
  color: ${({ theme }) => theme.palette.white};
`;

interface DataRowProps {
  label: string;
  value: React.ReactNode;
}

const DataRowComponent: React.FC<DataRowProps> = ({ label, value }) => (
  <DataRow justify="space-between">
    <SmallGrayText>{label}</SmallGrayText>
    <PreviewTokenMoreInfo>{value}</PreviewTokenMoreInfo>
  </DataRow>
);

interface PreviewTokensProps {
  imageUrl: string | undefined;
  name: string | undefined;
  isERC20: boolean;
  symbol: string | undefined;
}

const PreviewTokens: React.FC<PreviewTokensProps> = ({
  imageUrl,
  name,
  isERC20,
  symbol,
}) => {
  return (
    <PreviewTokenContainer>
      <TxnImage
        src={imageUrl}
        alt="Preview Token"
        $width={isERC20 ? "48px" : "120px"}
        $height={isERC20 ? "48px" : "120px"}
      />
      <PreviewTokenNameWrapper>
        <Row align="flex-start">
          <PreviewTokenName semiBold>{name}</PreviewTokenName>
          <VerifiedIcon />
        </Row>
        {isERC20 ? (
          <SmallGrayText>{symbol}</SmallGrayText>
        ) : (
          <PreviewTokenMoreInfo>
            #2831 <SmallGrayText>of 10,000</SmallGrayText>
          </PreviewTokenMoreInfo>
        )}
      </PreviewTokenNameWrapper>
      <Divider margin="13px 0" />
      {isERC20 ? (
        <div>
          <DataRowComponent label="Price" value="$1.00" />
          <DataRowComponent label="Market Cap." value="$38.4bn" />
          <DataRowComponent label="Trading Volume" value="$221.2m" />
          <DataRowComponent label="Token Lists" value="3" />
        </div>
      ) : (
        <div>
          <DataRowComponent label="Value (est.)" value="93.33 ETH" />
          <DataRowComponent
            label="Rarity"
            value={
              <>
                <PreviewTokenMoreInfo>3,345</PreviewTokenMoreInfo>
                <SmallGrayText>/ 10,000</SmallGrayText>
              </>
            }
          />
          <DataRowComponent label="Floor Price" value="28.99 ETH" />
          <DataRowComponent label="Owners" value="1,899" />
        </div>
      )}
      <SmallButtonPrimary>
        <PreviewTokenSiteName>
          <GrayText>View on </GrayText>
          {isERC20 ? "Etherscan" : "Blur"}
        </PreviewTokenSiteName>
      </SmallButtonPrimary>
    </PreviewTokenContainer>
  );
};

export default PreviewTokens;
