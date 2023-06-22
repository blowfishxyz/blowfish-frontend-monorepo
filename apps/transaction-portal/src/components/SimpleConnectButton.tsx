import { ButtonsGrid, ConnectorButton } from "./client/StartPage";
import { useConnectors } from "~utils/wagmi";

const SimpleConnectButton = () => {
  const displayedConnectors = useConnectors();

  return (
    <ButtonsGrid>
      {displayedConnectors.map((connector) => (
        <ConnectorButton key={connector.id} connector={connector} />
      ))}
    </ButtonsGrid>
  );
};
export default SimpleConnectButton;
