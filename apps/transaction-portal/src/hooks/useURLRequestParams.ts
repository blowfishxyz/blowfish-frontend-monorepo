import { MessageError } from "~utils/utils";
import { useQueryParams } from "./useQueryParams";
import { useChainMetadata } from "./useChainMetadata";
import { ScanParams } from "./useScanParams";
import { DappRequest, Message, RequestType } from "@blowfish/utils/types";
import {
  EvmSimulatorConfig,
  ScanTransactionsSolanaRequest,
  RequestSimulatorConfig,
} from "@blowfishxyz/api-client";
import { fromUrlParam } from "~utils/url";

export type UrlParsedRequest = {
  metadata: {
    origin: string;
  };
  userAccount: string;
} & (
  | {
      txObjects: [
        {
          from: string;
          to: string | undefined;
          data: string;
          value: string;
        }
      ];
      simulatorConfig: EvmSimulatorConfig;
    }
  | {
      message?: {
        kind: RequestType.SignTypedData;
        data: unknown;
      };
    }
  | {
      message?: {
        kind: RequestType.SignMessage;
        rawMessage: string;
      };
    }
  | {
      transactions: string[];
      simulatorConfig?: RequestSimulatorConfig;
      messageId?: string;
    }
);

export type SolanaSuccessParams = {
  request: ScanTransactionsSolanaRequest;
  userAccount: string;
  isImpersonating: boolean;
  isSolana: boolean;
  messageId?: string;
};

export type SolanaScanParams =
  | SolanaSuccessParams
  | { error: MessageError | undefined; id: string | undefined }
  | undefined;

export function useURLRequestParams(): ScanParams | SolanaScanParams {
  const chain = useChainMetadata();
  const { request: requestParam } = useQueryParams<{
    request?: string;
  }>();

  let parsedRequest: UrlParsedRequest | undefined;

  try {
    if (requestParam) {
      parsedRequest = fromUrlParam<UrlParsedRequest>(requestParam);
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

  if ("txObjects" in parsedRequest) {
    const transaction = parsedRequest.txObjects[0];

    return {
      message: {
        data: {
          type: "TRANSACTION",
          payload: {
            data: transaction.data,
            from: transaction.from,
            to: transaction.to,
            value: transaction.value,
          },
          userAccount: parsedRequest.userAccount,
        },
        origin: parsedRequest.metadata.origin,
        type: "TRANSACTION",
      } as Message<DappRequest["type"], DappRequest>,
      userAccount: parsedRequest.userAccount as `0x${string}`,
      request: {
        type: "TRANSACTION",
        payload: {
          data: transaction.data,
          from: transaction.from,
          to: transaction.to,
          value: transaction.value,
        },
        simulatorConfig: parsedRequest.simulatorConfig,
        userAccount: parsedRequest.userAccount,
      } as DappRequest,
      chain: chain,
      isImpersonating: true,
    };
  }

  if ("message" in parsedRequest) {
    if (
      parsedRequest.message &&
      parsedRequest.message.kind === "SIGN_TYPED_DATA"
    ) {
      return {
        message: {
          data: {
            type: "SIGN_TYPED_DATA",
            payload: parsedRequest.message.data,
            userAccount: parsedRequest.userAccount,
          },
          origin: parsedRequest.metadata.origin,
        } as Message<DappRequest["type"], DappRequest>,
        userAccount: parsedRequest.userAccount as `0x${string}`,
        request: {
          type: "SIGN_TYPED_DATA",
          payload: parsedRequest.message.data,
          userAccount: parsedRequest.userAccount,
        } as DappRequest,
        chain: chain,
        isImpersonating: true,
      };
    }

    if (
      parsedRequest.message &&
      parsedRequest.message.kind === "SIGN_MESSAGE"
    ) {
      return {
        message: {
          data: {
            type: "SIGN_MESSAGE",
            payload: {
              message: parsedRequest.message.rawMessage,
            },
            userAccount: parsedRequest.userAccount,
          },
          origin: parsedRequest.metadata.origin,
        } as Message<DappRequest["type"], DappRequest>,
        userAccount: parsedRequest.userAccount as `0x${string}`,
        request: {
          type: "SIGN_MESSAGE",
          payload: {
            message: parsedRequest.message.rawMessage,
          },
          userAccount: parsedRequest.userAccount,
        } as DappRequest,
        chain: chain,
        isImpersonating: true,
      };
    }
  }

  if ("transactions" in parsedRequest) {
    return {
      request: {
        transactions: parsedRequest.transactions,
        userAccount: parsedRequest.userAccount,
        metadata: {
          origin: parsedRequest.metadata.origin,
        },
        simulatorConfig: parsedRequest.simulatorConfig,
      } as ScanTransactionsSolanaRequest,
      isImpersonating: true,
      userAccount: parsedRequest.userAccount as `0x${string}`,
      messageId: parsedRequest.messageId,
      isSolana: true,
    };
  }
}
