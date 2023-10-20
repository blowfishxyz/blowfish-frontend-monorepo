import React from "react";
import { storiesOf } from "@storybook/react";
import { styled } from "styled-components";
import { PreviewNfts } from "~/simulation-result/components/PreviewNfts";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/common/tooltip";
import { Text } from "~/common/text";

const PreviewNftContainer = styled.div`
  margin-left: 40px;
  height: 400px;
  width: 400px;
`;

const PreviewNFTStory = () => (
  <PreviewNftContainer>
    <Tooltip initialOpen open>
      <TooltipTrigger>
        <Text></Text>
      </TooltipTrigger>
      <TooltipContent showArrow={false}>
        <PreviewNfts
          imageUrl="https://ipfs.io/ipfs/QmYqXQb3xFNWDkNno34GNL435yMbjt4B8b89LvBA75A9VP"
          name="BoredApeYachtClub"
          type="ERC-721"
          tokenId="1726"
          price={100}
        />
      </TooltipContent>
    </Tooltip>
  </PreviewNftContainer>
);

storiesOf("Internal/PreviewNft", module).add("Default", () => (
  <PreviewNFTStory />
));
