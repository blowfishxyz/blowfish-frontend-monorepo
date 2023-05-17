import React from "react";
import { storiesOf } from "@storybook/react";
import PreviewTokens from "~components/cards/PreviewTokens";

const PreviewTokensStory = () => (
  <PreviewTokens
    imageUrl="/placeholder/placeholder-token.svg"
    name="Token Name"
    isNft={true}
    symbol="TKN"
  />
);

storiesOf("Components/PreviewTokens", module).add("Default", () => (
  <PreviewTokensStory />
));
