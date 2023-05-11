import { Layout } from "~components/layout";
import Image from "next/image";
import { Column, PrimaryButton, Row, Text, device } from "@blowfish/ui/core";
import styled from "styled-components";

const StartPage = () => {
  return (
    <Layout>
      <Content justify="space-between" align="center">
        <Column>
          <Text size="xxl" weight="semi-bold" marginBottom={10}>
            Secure your assets
          </Text>
          <Text size="lg" design="secondary" marginBottom={28}>
            Start using Blowfish to prevent hacks & scams.
          </Text>
          <Column gap="lg" marginBottom={28}>
            <StepItem>
              <span>1</span> <span>Invoke transactions on web3 apps</span>
            </StepItem>
            <StepItem>
              <span>2</span>
              <span>Check Blowfish before approving in wallet</span>
            </StepItem>
            <StepItem>
              <span>3</span> <span>Simulate & confirm with confidence</span>
            </StepItem>
          </Column>
          <Text size="md" design="secondary" marginBottom={28}>
            Connect a wallet to continue...
          </Text>
          <ButtonsGrid>
            <PrimaryButton>Metamask</PrimaryButton>
            <PrimaryButton>Coinbase</PrimaryButton>
            <PrimaryButton>Phantom</PrimaryButton>
          </ButtonsGrid>
        </Column>
        <HeroImage
          src="/images/wallet-hero.webp"
          alt="Wallet protected by Blowfish"
          width={363}
          height={363}
        />
      </Content>
    </Layout>
  );
};

const Content = styled(Row)`
  height: 100%;
  flex-direction: column;

  @media (${device.md}) {
    flex-direction: row;
  }
`;

const StepItem = styled(Text).attrs({ size: "lg" })`
  span:first-child {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.1);
    margin-right: 10px;
  }
`;

const ButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 12px;
`;

const HeroImage = styled(Image)`
  width: 100%;
  height: 100%;

  @media (${device.md}) {
    width: 363px;
    height: 363px;
    margin-left: 48px;
  }
`;

export default StartPage;
