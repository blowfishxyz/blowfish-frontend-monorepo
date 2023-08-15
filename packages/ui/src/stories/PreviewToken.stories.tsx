import { storiesOf } from "@storybook/react";
import { styled } from "styled-components";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/common/tooltip";
import { Text } from "~/common/text";
import { PreviewTokens } from "~/simulation-result/components/PreviewTokens";

const PreviewTokenContainer = styled.div`
  margin-left: 40px;
  height: 400px;
  width: 400px;
`;

const PreviewTokensStory = () => (
  <PreviewTokenContainer>
    <Tooltip initialOpen open>
      <TooltipTrigger>
        <Text></Text>
      </TooltipTrigger>
      <TooltipContent showArrow={false}>
        <PreviewTokens
          imageUrl="https://d1ts37qlq4uz4s.cloudfront.net/evm__evm%3A%3Aethereum__evm%3A%3Aethereum%3A%3Amainnet__0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png"
          name="Ether"
          symbol="ETH"
          verified
          tokenList={null}
          price={1945}
        />
      </TooltipContent>
    </Tooltip>
  </PreviewTokenContainer>
);

storiesOf("Internal/PreviewTokens", module).add("Default", () => (
  <PreviewTokensStory />
));
