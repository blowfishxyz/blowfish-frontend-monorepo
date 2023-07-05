import React from "react";
import { storiesOf } from "@storybook/react";
import { styled } from "styled-components";
import { PreviewNfts } from "@blowfishxyz/ui";

const PreviewNftContainer = styled.div`
  position: absolute;
  background-color: white;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 1;
  top: 0;
  left: 60px;
  width: 237px;
  border-radius: 12px;
`;

const PreviewNFTStory = () => (
  <PreviewNftContainer>
    <PreviewNfts
      imageUrl="/placeholder/placeholder-nft.svg"
      name="NFT Name"
      type="ERC-721"
      tokenId="123"
      price={100}
    />
  </PreviewNftContainer>
);

storiesOf("Components/PreviewNft", module).add("NFT", () => (
  <PreviewNFTStory />
));
