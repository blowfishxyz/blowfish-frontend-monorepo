import { styled } from "styled-components";
import {
  PrimaryButton,
  SecondaryButton,
  Text,
  device,
} from "@blowfish/ui/core";

const CardWrapper = styled.div<{ $removePaddingBottom?: boolean }>`
  width: 100%;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.backgroundPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 32px 0;

  padding: 32px 0
    ${({ $removePaddingBottom }) => ($removePaddingBottom ? "0" : "32px")};

  @media (${device.lg}) {
    width: 55%;
  }
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

const CardText = styled(Text).attrs({ size: "md", design: "primary" })`
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

const CardGrayLink = styled.a`
  color: ${({ theme }) => theme.colors.foregroundSecondary};
`;

const CardBlackTextLink = styled.a`
  color: ${({ theme }) => theme.colors.foregroundPrimary};
  text-decoration: none;
`;

interface SimulationImageProps {
  $width?: string;
  $height?: string;
}

const SimulationImage = styled.img<SimulationImageProps>`
  width: ${({ $width }) => ($width ? $width : "38px")};
  height: ${({ $height }) => ($height ? $height : "38px")};
  object-fit: cover;
  border-radius: 6px;
`;

const PlaceholderSimulationImage = styled.div<SimulationImageProps>`
  width: ${({ $width }) => ($width ? $width : "38px")};
  height: ${({ $height }) => ($height ? $height : "38px")};
  background: ${({ theme }) => theme.colors.base10};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;

  svg {
    height: 24px;
    width: 24px;

    path {
      fill: ${({ theme }) => theme.colors.border};
    }
  }
`;

export {
  CardWrapper,
  CardContent,
  Divider,
  CardText,
  CardSecondaryButton,
  CardPrimaryButton,
  CardGrayLink,
  CardBlackTextLink,
  SimulationImage,
  PlaceholderSimulationImage,
};
