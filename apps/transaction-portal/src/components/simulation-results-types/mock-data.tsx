import { EvmExpectedStateChangesInner } from "@blowfish/api-client";
import { sendErc721 } from "~components/fixtures/state-changes";

const dummyTxnSimulationData = [sendErc721];

const dummySignatureData = [
  {
    imageUrl: "/placeholder/placeholder-signature-image.svg",
    url: "blur.io",
    challenge: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    message: "Sign in to Blur",
  },
];

type TxnSimulationDataType = EvmExpectedStateChangesInner;

type SignatureDataType = {
  imageUrl: string;
  url: string;
  challenge: string;
  message: string;
};

export { dummyTxnSimulationData, dummySignatureData };
export type { TxnSimulationDataType, SignatureDataType };
