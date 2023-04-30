import { styled } from "styled-components";
import { Row, SecondaryButton, Text, size } from "@blowfish/ui/core";

const CardWrapper = styled.div<{ removePaddingBottom?: boolean }>`
  flex: 1;
  box-sizing: border-box;
  background: ${({ theme }) => theme.palette.white};
  border: 1px solid ${({ theme }) => theme.palette.border};
  border-radius: 12px;
  padding: 32px 0
    ${({ removePaddingBottom }) => (removePaddingBottom ? "0" : "32px")};

  @media only screen and (max-width: ${size.md}) {
    min-width: 100%;
  }
`;
const CardContent = styled.div`
  padding: 0 32px;
  box-sizing: border-box;
`;

interface DividerProps {
  margin?: string;
  orientation?: "horizontal" | "vertical";
}

const Divider = styled.div<DividerProps>`
  background-color: ${({ theme }) => theme.palette.black};
  opacity: 0.05;
  margin: ${({ margin }) => margin};

  ${({ orientation = "horizontal", margin }) =>
    orientation === "horizontal"
      ? `
          width: 100%;
          height: 1px;
        `
      : `
          align-self: stretch;
          width: 1px;
          margin: ${margin || "0 15px"};
        `}
`;

const CardText = styled(Text)<{ alignText?: string }>`
  color: ${({ theme }) => theme.colors.primaryText};
  line-height: 25.76px;
`;

const CardSmallSecondaryButton = styled(SecondaryButton)`
  width: 120px;
`;

const CardRow = styled(Row)`
  margin: 25px 0 20px;
`;

const CardGrayLink = styled.a`
  color: ${({ theme }) => theme.palette.gray};
`;

const CardBlackTextLink = styled.a`
  color: ${({ theme }) => theme.palette.black};
`;

export {
  CardWrapper,
  CardContent,
  Divider,
  CardText,
  CardSmallSecondaryButton,
  CardRow,
  CardGrayLink,
  CardBlackTextLink,
};
