import {
  ScanTransactionsEvm200Response as ScanTransactionsEvm200ResponseV20230517,
  ScanMessageEvm200Response as ScanMessageEvm200ResponseV20230517,
} from "../../generated/v20230517/models";
import {
  ScanTransactionEvm200Response,
  ScanTransactionsEvm200Response,
  ScanMessageEvm200Response,
  EvmStateChangeErc721TransferData,
  EvmStateChangeAnyNftFromCollectionTransferData,
  ScanMessageEvm200ResponseSimulationResults,
  ScanTransactionEvm200ResponseSimulationResults,
  EvmStateChangeErc1155TransferData,
  EvmStateChangeErc20PermitData,
  EvmStateChangeErc20TransferData,
  EvmStateChangeNativeAssetTransferData,
  EvmStateChangeErc1155ApprovalForAllData,
  EvmStateChangeErc721ApprovalForAllData,
  EvmStateChangeErc721ApprovalData,
} from "./types";

export function mapTransactionsToLegacy(
  response: ScanTransactionsEvm200Response
): ScanTransactionEvm200Response {
  const { simulationResults, ...rest } = response;
  const tx = simulationResults.perTransaction[0];
  if (!tx) {
    return {
      ...rest,
      simulationResults: {
        gas: {
          gasLimit: null,
        },
        protocol: null,
        error: simulationResults.aggregated.error,
        expectedStateChanges:
          simulationResults.aggregated.expectedStateChanges[
            simulationResults.aggregated.userAccount
          ] || [],
      },
    };
  }
  const expectedStateChanges =
    simulationResults.aggregated.expectedStateChanges[
      simulationResults.aggregated.userAccount
    ] || [];
  const item = {
    gas: tx.gas,
    error: tx.error,
    protocol: tx.protocol,
    expectedStateChanges,
  };

  return { ...rest, simulationResults: item };
}

export function mapTransactionsFromV20230517(
  response: ScanTransactionsEvm200ResponseV20230517
): ScanTransactionEvm200Response {
  const { simulationResults, ...rest } = response;

  const expectedStateChanges = (
    simulationResults?.aggregated.expectedStateChanges || []
  ).map((stateChange) => {
    if (stateChange.rawInfo.kind === "ERC721_TRANSFER") {
      const data: EvmStateChangeErc721TransferData = {
        amount: stateChange.rawInfo.data.amount,
        metadata: stateChange.rawInfo.data.metadata,
        tokenId: stateChange.rawInfo.data.tokenId,
        asset: {
          address: stateChange.rawInfo.data.contract.address,
          symbol: stateChange.rawInfo.data.symbol,
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
    if (stateChange.rawInfo.kind === "ANY_NFT_FROM_COLLECTION_TRANSFER") {
      const data: EvmStateChangeAnyNftFromCollectionTransferData = {
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

    if (stateChange.rawInfo.kind === "ERC20_APPROVAL") {
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
      const data: EvmStateChangeNativeAssetTransferData =
        stateChange.rawInfo.data;
      return {
        ...stateChange,
        rawInfo: {
          ...stateChange.rawInfo,
          data,
        },
      };
    }

    if (stateChange.rawInfo.kind === "ERC1155_APPROVAL_FOR_ALL") {
      const data: EvmStateChangeErc1155ApprovalForAllData = {
        owner: stateChange.rawInfo.data.owner,
        spender: stateChange.rawInfo.data.spender,
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

    if (stateChange.rawInfo.kind === "ERC721_APPROVAL_FOR_ALL") {
      const data: EvmStateChangeErc721ApprovalForAllData = {
        owner: stateChange.rawInfo.data.owner,
        spender: stateChange.rawInfo.data.spender,
        amount: stateChange.rawInfo.data.amount,
        asset: {
          symbol: stateChange.rawInfo.data.symbol,
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

    if (stateChange.rawInfo.kind === "ERC721_APPROVAL") {
      const data: EvmStateChangeErc721ApprovalData = {
        amount: stateChange.rawInfo.data.amount,
        owner: stateChange.rawInfo.data.owner,
        spender: stateChange.rawInfo.data.spender,
        metadata: stateChange.rawInfo.data.metadata,
        tokenId: stateChange.rawInfo.data.tokenId,
        asset: {
          address: stateChange.rawInfo.data.contract.address,
          symbol: stateChange.rawInfo.data.symbol,
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

    return stateChange;
  }) as ScanTransactionEvm200ResponseSimulationResults["expectedStateChanges"];

  const tx = simulationResults.perTransaction[0];
  if (!tx) {
    return {
      ...rest,
      simulationResults: {
        gas: {
          gasLimit: null,
        },
        protocol: null,
        error: simulationResults.aggregated.error,
        expectedStateChanges,
      },
    };
  }

  const item = {
    gas: tx.gas,
    error: tx.error,
    protocol: tx.protocol,
    expectedStateChanges,
  };

  return { ...rest, simulationResults: item };
}

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
        asset: {
          address: stateChange.rawInfo.data.contract.address,
          symbol: stateChange.rawInfo.data.symbol,
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
    if (stateChange.rawInfo.kind === "ANY_NFT_FROM_COLLECTION_TRANSFER") {
      const data: EvmStateChangeAnyNftFromCollectionTransferData = {
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
      const data: EvmStateChangeErc20PermitData = stateChange.rawInfo.data;
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
      const data: EvmStateChangeNativeAssetTransferData =
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
