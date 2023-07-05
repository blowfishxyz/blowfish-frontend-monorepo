import { Layout } from "~components/layout/Layout";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Column, Row, Spinner, Text, device } from "@blowfishxyz/ui";
import styled from "styled-components";
import { useConnect, useAccount, Connector } from "wagmi";
import { getConnectorMetadata, useConnectors } from "~utils/wagmi";
import { useEffect } from "react";
import { useQueryParams } from "~hooks/useQueryParams";
import { breakpoint } from "~utils/breakpoints";
import { UserWalletConnectKitWrapper } from "~components/UserWalletConnectKitWrapper";
import { EthereumIcon } from "@blowfish/protect-ui/icons";

const StartPage = () => {
  const router = useRouter();
  const { redirect } = useQueryParams<{
    redirect?: string;
  }>();

  useEffect(() => {
    if (redirect) {
      router.replace(decodeURIComponent(redirect));
    }
  }, [redirect, router]);

  return (
    <Layout>
      <Content justifyContent="space-between" alignItems="center">
        <ConnectWalletView />
        <VideoOuterContainer>
          <Video
            src="/videos/wallet.mp4"
            loop
            autoPlay
            muted
            playsInline
          ></Video>
        </VideoOuterContainer>
      </Content>
    </Layout>
  );
};

const ConnectWalletView: React.FC = () => {
  const { isConnected } = useAccount();
  const displayedConnectors = useConnectors();

  return (
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
      {isConnected ? (
        <Column marginTop={28}>
          <UserWalletConnectKitWrapper />
        </Column>
      ) : (
        <>
          <Text size="md" design="secondary" marginBottom={28}>
            Connect a wallet to continue...
          </Text>
          <ButtonsGrid>
            {displayedConnectors.map((connector) => (
              <ConnectorButton key={connector.id} connector={connector} />
            ))}
          </ButtonsGrid>
        </>
      )}
    </Column>
  );
};

export const ConnectorButton: React.FC<{
  connector: Connector;
}> = ({ connector }) => {
  const { status, connect } = useConnect();
  const { label, logoPath, installLink } = getConnectorMetadata(connector);
  const text = connector.ready ? label : `Install ${label}`;
  const handleClick = () => {
    if (connector.ready) {
      connect({ connector });
      return;
    }
    if (installLink) {
      window.open(installLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <StyledButton key={connector.id} onClick={handleClick}>
      {status === "loading" ? (
        <Spinner design="contrast" />
      ) : typeof logoPath === "string" ? (
        <Image src={logoPath} alt={`${label} logo`} width={22} height={22} />
      ) : (
        <EthereumIcon
          style={{
            width: 28,
            height: 28,
            padding: "4px",
            borderRadius: "100%",
            background: "white",
          }}
        />
      )}
      {text}
    </StyledButton>
  );
};

const Content = styled(Row)`
  height: 100%;
  flex-direction: column;
  justify-content: center;
  gap: 40px;

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

export const ButtonsGrid = styled.div`
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

const VideoOuterContainer = styled.div`
  margin-left: 48px;
  overflow: hidden;
  position: relative;
  height: 363px;
  width: 363px;
  mix-blend-mode: darken;

  @media only screen and (${breakpoint.device.lg}) {
    width: 500px;
    height: 500px;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
`;

export default StartPage;
