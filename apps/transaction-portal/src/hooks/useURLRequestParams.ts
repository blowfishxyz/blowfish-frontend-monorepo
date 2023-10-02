import { MessageError } from "~utils/utils";
import { useQueryParams } from "./useQueryParams";
import { ChainMetadata, useChainMetadata } from "./useChainMetadata";
import {
  EvmSignMessage,
  ScanMessageEvmRequest,
  ScanTransactionsEvmRequest,
} from "@blowfishxyz/api-client/.";
import { ScanParams } from "./useScanParams";
import { DappRequest, Message } from "@blowfish/utils/types";

export function useURLRequestParams(): ScanParams {
  const chain = useChainMetadata();
  const { request: requestParam } = useQueryParams<{
    request?: string;
  }>();

  let parsedRequest;

  try {
    if (requestParam) {
      parsedRequest = JSON.parse(decodeURIComponent(requestParam));
    }
  } catch {
    return { error: MessageError.PARAMS_NOT_OK, id: undefined };
  }

  if (!parsedRequest) {
    return {
      error: MessageError.PARAMS_NOT_OK,
      id: undefined,
    };
  }

  const data: (
    | ScanTransactionsEvmRequest
    | ScanMessageEvmRequest
    | EvmSignMessage
  ) & { chain: ChainMetadata } = { ...parsedRequest, chain };

  if ("txObjects" in data) {
    const transaction = data.txObjects[0];

    return {
      message: {
        data: {
          type: "TRANSACTION",
          payload: {
            data: transaction.data,
            from: transaction.from,
            to: transaction.to,
          },
          userAccount: data.userAccount,
        },
        origin: data.metadata.origin,
        type: "TRANSACTION",
      } as Message<DappRequest["type"], DappRequest>,
      userAccount: data.userAccount as `0x${string}`,
      request: {
        type: "TRANSACTION",
        payload: {
          data: transaction.data,
          from: transaction.from,
          to: transaction.to,
        },
        userAccount: data.userAccount,
      } as DappRequest,
      chain: data.chain,
      isImpersonating: false,
    };
  }

  if ("message" in data) {
    if (data.message && data.message.kind === "SIGN_TYPED_DATA") {
      return {
        message: {
          data: {
            type: "SIGN_TYPED_DATA",
            payload: data.message.data,
            userAccount: data.userAccount,
          },
          origin: data.metadata.origin,
        } as Message<DappRequest["type"], DappRequest>,
        userAccount: data.userAccount as `0x${string}`,
        request: {
          type: "SIGN_TYPED_DATA",
          payload: data.message.data,
          userAccount: data.userAccount,
        } as DappRequest,
        chain: data.chain,
        isImpersonating: false,
      };
    }

    if (data.message && data.message.kind === "SIGN_MESSAGE") {
      return {
        message: {
          data: {
            type: "SIGN_MESSAGE",
            payload: {
              message: data.message.rawMessage,
            },
            userAccount: data.userAccount,
          },
          origin: data.metadata.origin,
        } as Message<DappRequest["type"], DappRequest>,
        userAccount: data.userAccount as `0x${string}`,
        request: {
          type: "SIGN_MESSAGE",
          payload: {
            message: data.message.rawMessage,
          },
          userAccount: data.userAccount,
        } as DappRequest,
        chain: data.chain,
        isImpersonating: false,
      };
    }
  }
}
