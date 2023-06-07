import {
  DappRequest,
  Message,
  parseRequestFromMessage,
} from "@blowfish/utils/types";
import useSWR from "swr";

import { useQueryParams } from "~hooks/useParsedRequestScanUrl";
import {
  ChainMetadata,
  useChainMetadata,
} from "~modules/common/hooks/useChainMetadata";
import { getScanRequestFromMessageChannel } from "~utils/messages";
import { MessageError, checkVersionAndTransformMessage } from "~utils/utils";

type HexString = `0x${string}`;

export type ScanParamsSuccess = {
  message: Message<DappRequest["type"], DappRequest>;
  request: DappRequest;
  userAccount: HexString;
  chain: ChainMetadata;
  isImpersonating: boolean;
};

export type ScanParams =
  | ScanParamsSuccess
  | { error: MessageError | undefined; id: string | undefined }
  | undefined;

async function fetcher([messageId]: [string]): Promise<
  | {
      error: MessageError;
    }
  | {
      message: Message<DappRequest["type"], DappRequest>;
    }
> {
  if (!messageId) {
    return Promise.resolve({ error: MessageError.PARAMS_NOT_OK });
  }
  const message = await getScanRequestFromMessageChannel(messageId).then(
    checkVersionAndTransformMessage
  );
  return { message };
}

export function useScanParams(): ScanParams {
  const chain = useChainMetadata();
  const { id } = useQueryParams<{ id?: string }>();
  const { data, error: fetchError } = useSWR([id, "request-message"], fetcher);
  if (fetchError) {
    return { error: MessageError.PARAMS_NOT_OK, id };
  }
  if (!data) {
    return undefined; // loading
  }
  if ("error" in data) {
    return { error: data.error, id };
  }
  const { message } = data;
  const dappRequest = parseRequestFromMessage(message);
  if (!dappRequest || !message.origin) {
    return { error: MessageError.PARAMS_NOT_OK, id };
  }
  const { isImpersonatingWallet, userAccount } = dappRequest;

  return {
    message,
    request: dappRequest,
    userAccount: userAccount as HexString,
    chain,
    isImpersonating: !!isImpersonatingWallet,
  };
}
