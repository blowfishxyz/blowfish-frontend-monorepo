import React from "react";
import { storiesOf } from "@storybook/react";
import PreviewTokens from "~components/cards/PreviewTokens";

const PreviewNFTTokensStory = () => (
  <PreviewTokens
    imageUrl="/placeholder/placeholder-nft.svg"
    name="NFT Name"
    isNft={false}
  />
);

storiesOf("Components/PreviewTokens", module).add("NFT", () => (
  <PreviewNFTTokensStory />
));
