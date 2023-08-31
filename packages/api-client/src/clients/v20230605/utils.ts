import {
  ScanTransactionsEvm200Response as ScanTransactionsEvm200ResponseV20230517,
  ScanMessageEvm200Response as ScanMessageEvm200ResponseV20230517,
} from "../../generated/v20230517/models";
import {
  ScanMessageEvm200Response,
  EvmStateChangeErc721TransferData,
  EvmMessageStateChangeAnyNftFromCollectionTransferData,
  ScanMessageEvm200ResponseSimulationResults,
  EvmStateChangeErc1155TransferData,
  EvmMessageStateChangeErc20PermitData,
  EvmStateChangeErc20TransferData,
  EvmMessageStateChangeNativeAssetTransferData,
} from "./types";

export function mapMessageResponse(
  response: ScanMessageEvm200ResponseV20230517
): ScanMessageEvm200Response {
  const { simulationResults: simulationResultsLegacy, ...rest } = response;

  const expectedStateChanges = (
    simulationResultsLegacy?.expectedStateChanges || []
  ).map((stateChange) => {
    if (stateChange.rawInfo.kind === "ERC721_TRANSFER") {
      const data: EvmStateChangeErc721TransferData = {
        amount: stateChange.rawInfo.data.amount,
        metadata: stateChange.rawInfo.data.metadata,
        tokenId: stateChange.rawInfo.data.tokenId,
        counterparty: stateChange.rawInfo.data.counterparty!,
        asset: {
          address: stateChange.rawInfo.data.contract.address,
          symbol: stateChange.rawInfo.data.symbol,
          name: stateChange.rawInfo.data.name,
          price: stateChange.rawInfo.data.assetPrice,
          collection: stateChange.rawInfo.data.contract.address,
        },
      };
      return {
        ...stateChange,
        rawInfo: {
          ...stateChange.rawInfo,
          data,
        },
      };
    }
    if (stateChange.rawInfo.kind === "ANY_NFT_FROM_COLLECTION_TRANSFER") {
      const data: EvmMessageStateChangeAnyNftFromCollectionTransferData = {
        amount: stateChange.rawInfo.data.amount,
        asset: {
          address: stateChange.rawInfo.data.contract.address,
          symbol: stateChange.rawInfo.data.symbol,
          name: stateChange.rawInfo.data.name,
          price: stateChange.rawInfo.data.assetPrice,
          imageUrl: stateChange.rawInfo.data.imageUrl,
          type: stateChange.rawInfo.data.type,
        },
      };
      return {
        ...stateChange,
        rawInfo: {
          ...stateChange.rawInfo,
          data,
        },
      };
    }
    if (stateChange.rawInfo.kind === "ERC1155_TRANSFER") {
      const data: EvmStateChangeErc1155TransferData = {
        metadata: stateChange.rawInfo.data.metadata,
        tokenId: stateChange.rawInfo.data.tokenId,
        amount: stateChange.rawInfo.data.amount,
        asset: {
          address: stateChange.rawInfo.data.contract.address,
          name: stateChange.rawInfo.data.name,
          price: stateChange.rawInfo.data.assetPrice,
        },
      };
      return {
        ...stateChange,
        rawInfo: {
          ...stateChange.rawInfo,
          data,
        },
      };
    }
    if (stateChange.rawInfo.kind === "ERC20_PERMIT") {
      const data: EvmMessageStateChangeErc20PermitData =
        stateChange.rawInfo.data;
      return {
        ...stateChange,
        rawInfo: {
          ...stateChange.rawInfo,
          data,
        },
      };
    }
    if (stateChange.rawInfo.kind === "ERC20_TRANSFER") {
      const data: EvmStateChangeErc20TransferData = stateChange.rawInfo.data;
      return {
        ...stateChange,
        rawInfo: {
          ...stateChange.rawInfo,
          data,
        },
      };
    }
    if (stateChange.rawInfo.kind === "NATIVE_ASSET_TRANSFER") {
      const data: EvmMessageStateChangeNativeAssetTransferData =
        stateChange.rawInfo.data;
      return {
        ...stateChange,
        rawInfo: {
          ...stateChange.rawInfo,
          data,
        },
      };
    }

    return stateChange;
  });

  const simulationResults = {
    ...simulationResultsLegacy,
    expectedStateChanges,
  } as ScanMessageEvm200ResponseSimulationResults;

  return {
    ...rest,
    simulationResults,
  };
}
