import { storiesOf } from "@storybook/react";
import { styled } from "styled-components";
import { PreviewTokens } from "~/simulation-result/components/PreviewTokens";

const PreviewTokenContainer = styled.div`
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

const PreviewTokensStory = () => (
  <PreviewTokenContainer>
    <PreviewTokens
      imageUrl="/placeholder/placeholder-token.svg"
      name="Token Name"
      symbol="TKN"
      price={100}
      tokenList={3}
      verified
    />
  </PreviewTokenContainer>
);

storiesOf("Internal/PreviewTokens", module).add("Default", () => (
  <PreviewTokensStory />
));
