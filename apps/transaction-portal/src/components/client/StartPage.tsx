import { Layout } from "~components/layout/Layout";
import Image from "next/image";
import { Button, Column, Row, Spinner, Text, device } from "@blowfish/ui/core";
import styled from "styled-components";
import { useConnect, useAccount, Connector } from "wagmi";
import { getConnectorMetadata } from "~utils/wagmi";

const StartPage = () => {
  const { connectors } = useConnect();
  const { isConnected } = useAccount();

  // TODO: Redirect to dashboard
  if (isConnected) {
    return <Layout>Dashboard (disconnect to get redirected to start)</Layout>;
  }

  return (
    <Layout>
      <Content justifyContent="space-between" alignItems="center">
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
            {connectors
              .filter((x) => x.id !== "injected")
              .map((connector) => (
                <ConnectorButton key={connector.id} connector={connector} />
              ))}
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

const ConnectorButton: React.FC<{
  connector: Connector;
}> = ({ connector }) => {
  const { status, connect } = useConnect();
  const { label, logoPath, id, installLink } = getConnectorMetadata(
    connector.id
  );
  const text = connector.ready ? label : `Install ${label}`;
  const handleClick = () => {
    if (connector.ready) {
      connect({ connector });
      return;
    }
    if (installLink) {
      window.open(installLink, "_blank");
    }
  };

  return (
    <StyledButton key={connector.id} onClick={handleClick}>
      {status === "loading" ? (
        <Spinner />
      ) : (
        <Image src={logoPath} alt={`${label} logo`} width={22} height={22} />
      )}
      {text}
    </StyledButton>
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

const StyledButton = styled(Button)``;

const ButtonsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  ${StyledButton} {
    width: 100%;
  }

  @media (${device.md}) {
    flex-direction: row;

    ${StyledButton} {
      max-width: 218px;
      width: 100%;
    }
  }
`;

const HeroImage = styled(Image)`
  display: none;

  @media (${device.md}) {
    width: 363px;
    height: 363px;
    display: initial;
    margin-left: 48px;
    position: relative;
  }
`;

export default StartPage;
