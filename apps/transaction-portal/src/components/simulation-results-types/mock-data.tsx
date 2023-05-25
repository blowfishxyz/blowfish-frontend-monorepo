import { EvmExpectedStateChangesInner } from "@blowfish/api-client";
import {
  receiveErc20,
  sendErc20,
  sendErc721,
} from "~components/fixtures/state-changes";

const dummyTxnSimulationData = [sendErc721, sendErc20, receiveErc20];

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
  dappUrl: URL;
  state: string;
  message: string;
  challenge: string;
  account: string;
};

export { dummyTxnSimulationData, dummySignatureData };
export type { TxnSimulationDataType, SignatureDataType };
