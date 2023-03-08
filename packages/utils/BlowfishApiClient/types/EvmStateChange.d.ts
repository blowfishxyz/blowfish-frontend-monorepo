import type { EvmAddressInfo } from "./EvmAddressInfo";
import type { EvmAmountDiff } from "./EvmAmountDiff";
import type { EvmTokenMetadata } from "./EvmTokenMetadata";
import type { Price } from "./Price";
export interface Erc20TransferData {
    symbol: string;
    name: string;
    decimals: number;
    amount: EvmAmountDiff;
    contract: EvmAddressInfo;
    assetPrice: Price | null;
}
export interface Erc721TransferData {
    symbol: string;
    name: string;
    tokenId: string | null;
    amount: EvmAmountDiff;
    contract: EvmAddressInfo;
    metadata: EvmTokenMetadata;
}
export interface Erc1155TransferData {
    amount: EvmAmountDiff;
    contract: EvmAddressInfo;
    tokenId: string;
    metadata: EvmTokenMetadata;
}
export interface Erc721ApprovalForAllData {
    symbol: string;
    name: string;
    spender: EvmAddressInfo;
    contract: EvmAddressInfo;
    owner: EvmAddressInfo;
    amount: EvmAmountDiff;
}
export interface Erc721ApprovalData {
    symbol: string;
    name: string;
    spender: EvmAddressInfo;
    contract: EvmAddressInfo;
    owner: EvmAddressInfo;
    tokenId: string;
    amount: EvmAmountDiff;
    metadata: EvmTokenMetadata;
}
export interface NativeAssetTransferData {
    symbol: string;
    name: string;
    decimals: number;
    amount: EvmAmountDiff;
    contract: EvmAddressInfo;
}
export interface Erc20ApprovalData {
    name: string;
    symbol: string;
    decimals: number;
    spender: EvmAddressInfo;
    amount: EvmAmountDiff;
    contract: EvmAddressInfo;
    owner: EvmAddressInfo;
    assetPrice: Price | null;
}
export interface Erc20PermitData {
    contract: EvmAddressInfo;
    name: string;
    symbol: string;
    decimals: number;
    owner: EvmAddressInfo;
    spender: EvmAddressInfo;
    amount: string;
    nonce: string;
    deadline: null | number;
}
export type EvmStateChange = {
    kind: "ERC20_TRANSFER";
    data: Erc20TransferData;
} | {
    kind: "ERC721_TRANSFER";
    data: Erc721TransferData;
} | {
    kind: "ERC1155_TRANSFER";
    data: Erc1155TransferData;
} | {
    kind: "ERC721_APPROVAL_FOR_ALL";
    data: Erc721ApprovalForAllData;
} | {
    kind: "ERC1155_APPROVAL_FOR_ALL";
    data: {
        spender: EvmAddressInfo;
        contract: EvmAddressInfo;
        owner: EvmAddressInfo;
        amount: EvmAmountDiff;
    };
} | {
    kind: "ERC721_APPROVAL";
    data: Erc721ApprovalData;
} | {
    kind: "NATIVE_ASSET_TRANSFER";
    data: NativeAssetTransferData;
} | {
    kind: "ERC20_APPROVAL";
    data: Erc20ApprovalData;
} | {
    kind: "ERC20_PERMIT";
    data: Erc20PermitData;
};
//# sourceMappingURL=EvmStateChange.d.ts.map