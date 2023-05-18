import { styled } from "styled-components";
import {
  PrimaryButton,
  Row,
  SecondaryButton,
  Text,
  device,
} from "@blowfish/ui/core";

const CardWrapper = styled.div<{ $removePaddingBottom?: boolean }>`
  flex: 1;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.backgroundPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 32px 0;

  padding: 32px 0
    ${({ $removePaddingBottom }) => ($removePaddingBottom ? "0" : "32px")};
`;

const CardContent = styled.div`
  padding: 0 16px;
  box-sizing: border-box;

  @media (${device.lg}) {
    padding: 0 32px;
  }
`;

interface DividerProps {
  margin?: string;
  orientation?: "horizontal" | "vertical";
}

const Divider = styled.div<DividerProps>`
  background-color: ${({ theme }) => theme.colors.foregroundPrimary};
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
  color: ${({ theme }) => theme.colors.foregroundPrimary};
  font-size: 14px;

  @media (${device.lg}) {
    font-size: 16px;
    line-height: 25.76px;
  }
`;

const CardSecondaryButton = styled(SecondaryButton)`
  font-size: 16px;

  @media (${device.lg}) {
    font-size: 20px;
  }
`;

const CardPrimaryButton = styled(PrimaryButton)`
  font-size: 16px;

  @media (${device.lg}) {
    font-size: 20px;
  }
`;

const CardSmallSecondaryButton = styled(CardSecondaryButton)`
  width: 120px;
`;

const CardRow = styled(Row)`
  margin: 25px 0 20px;
`;

const CardGrayLink = styled.a`
  color: ${({ theme }) => theme.colors.foregroundSecondary};
`;

const CardBlackTextLink = styled.a`
  color: ${({ theme }) => theme.colors.foregroundPrimary};
`;

export {
  CardWrapper,
  CardContent,
  Divider,
  CardText,
  CardSmallSecondaryButton,
  CardSecondaryButton,
  CardPrimaryButton,
  CardRow,
  CardGrayLink,
  CardBlackTextLink,
};
