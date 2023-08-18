import { FileInfo, API } from "jscodeshift";

const idetnsToFix = [
  {
    from: "ScanTransactionsEvmChainNetworkEnum",
    to: "ScanTransactionsEvmOperationChainNetworkEnum",
  },
  {
    from: "ScanTransactionsEvmChainFamilyEnum",
    to: "ScanTransactionsEvmOperationChainFamilyEnum",
  },
  {
    from: "ScanTransactionEvmChainNetworkEnum",
    to: "ScanTransactionEvmOperationChainNetworkEnum",
  },
  {
    from: "ScanTransactionEvmChainFamilyEnum",
    to: "ScanTransactionEvmOperationChainFamilyEnum",
  },
  {
    from: "ScanMessageEvmChainNetworkEnum",
    to: "ScanMessageEvmOperationChainNetworkEnum",
  },
  {
    from: "ScanMessageEvmChainFamilyEnum",
    to: "ScanMessageEvmOperationChainFamilyEnum",
  },
  {
    from: "ScanTransactionsSolanaChainNetworkEnum",
    to: "ScanTransactionsSolanaOperationChainNetworkEnum",
  },
  {
    from: "ScanTransactionsSolanaSimulateExpiredEnum",
    to: "ScanTransactionsSolanaOperationSimulateExpiredEnum",
  },
];

export default function (fileInfo: FileInfo, api: API) {
  const j = api.jscodeshift;

  const root = j(fileInfo.source);

  idetnsToFix.forEach(({ from, to }) => {
    return root
      .find(j.Identifier, {
        name: from,
      })
      .forEach((path) => {
        path.node.name = to;
      });
  });

  return root.toSource();

  //   return root
  //     .find(j.Identifier, {
  //       name: "ScanTransactionsEvmChainNetworkEnum",
  //     })
  //     .forEach((path) => {
  //       path.node.name = "ScanTransactionsEvmOperationChainNetworkEnum";
  //     })
  //     .toSource();
}

export const parser = "ts";
