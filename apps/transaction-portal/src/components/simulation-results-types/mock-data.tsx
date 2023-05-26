import { EvmExpectedStateChangesInner } from "@blowfish/api-client";
import {
  receiveErc20,
  sendErc20,
  sendErc721,
} from "~components/fixtures/state-changes";

const dummyTxnSimulationData = [sendErc721, sendErc20, receiveErc20];

type TxnSimulationDataType = EvmExpectedStateChangesInner;

type SignatureDataType = {
  imageUrl: string;
  dappUrl: URL;
  state: string;
  message: string | undefined;
  account: string;
};

export { dummyTxnSimulationData };
export type { TxnSimulationDataType, SignatureDataType };
