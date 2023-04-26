import { styled } from "styled-components";
import { Row, SecondaryButton, Text, size } from "@blowfish/ui/core";

const CardWrapper = styled.div`
  flex: 1;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 2rem 0;

  @media only screen and (max-width: ${size.md}) {
    min-width: 100%;
  }
`;

const CardContent = styled.div`
  padding: 0 2rem;
  box-sizing: border-box;
`;

const Divider = styled.div<{ margin?: string }>`
  width: 100%;
  height: 1px;
  background-color: #000000;
  opacity: 0.05;
  margin: ${({ margin }) => margin};
`;

const StyledText = styled(Text)<{ alignText?: string }>`
  color: rgba(0, 0, 0, 0.75);
  line-height: 25.76px;
`;

const SmallSecondaryButton = styled(SecondaryButton)`
  width: 120px;
`;

const StyledRow = styled(Row)`
  margin: 25px 0 20px;
`;

const GrayLink = styled.a`
  color: #808080;
`;

export {
  CardWrapper,
  CardContent,
  Divider,
  StyledText,
  SmallSecondaryButton,
  StyledRow,
  GrayLink,
};
