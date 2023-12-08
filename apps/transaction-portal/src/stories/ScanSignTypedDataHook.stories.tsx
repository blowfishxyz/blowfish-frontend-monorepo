import React from "react";
import { Meta, Story } from "@storybook/react";
import { useScanSignedTypedData } from "@blowfishxyz/ui";
import {
  RequestType,
  SignTypedDataRequest,
  SignTypedDataVersion,
} from "@blowfish/utils/types";
import ScanResultsV2, { ScanResultsV2Props } from "~components/ScanResultsV2";
import { ProtectLoadingScreen } from "~components/ProtectLoadingScreen";
import { TransactionNotFoundModal } from "~components/modals";

export default {
  title: "Hooks/useScanSignedTypedData",
  component: ScanResultsV2,
} as Meta;
const Template: Story<ScanResultsV2Props> = ({ ...args }) => {
  const { data, isLoading } = useScanSignedTypedData(
    args.request as SignTypedDataRequest,
    { origin: "https://examples.blowfish.tools/" }
  );

  if (isLoading) {
    return <ProtectLoadingScreen key="loading" />;
  }

  if (!data) {
    return <TransactionNotFoundModal />;
  }

  return <ScanResultsV2 {...args} scanResults={data} />;
};

export const ScanSignedTypedData = Template.bind({});
ScanSignedTypedData.args = {
  request: {
    type: RequestType.SignTypedData,
    payload: {
      types: {
        Order: [
          {
            name: "trader",
            type: "address",
          },
          {
            name: "side",
            type: "uint8",
          },
          {
            name: "matchingPolicy",
            type: "address",
          },
          {
            name: "collection",
            type: "address",
          },
          {
            name: "tokenId",
            type: "uint256",
          },
          {
            name: "amount",
            type: "uint256",
          },
          {
            name: "paymentToken",
            type: "address",
          },
          {
            name: "price",
            type: "uint256",
          },
          {
            name: "listingTime",
            type: "uint256",
          },
          {
            name: "expirationTime",
            type: "uint256",
          },
          {
            name: "fees",
            type: "Fee[]",
          },
          {
            name: "salt",
            type: "uint256",
          },
          {
            name: "extraParams",
            type: "bytes",
          },
          {
            name: "nonce",
            type: "uint256",
          },
        ],
        Fee: [
          {
            name: "rate",
            type: "uint16",
          },
          {
            name: "recipient",
            type: "address",
          },
        ],
      },
      domain: {
        name: "Blur Exchange",
        version: "1.0",
        chainId: 1,
        verifyingContract: "0x000000000000ad05ccc4f10045630fb830b95127",
      },
      primaryType: "Order",
      message: {
        trader: "0xf7801B8115f3Fe46AC55f8c0Fdb5243726bdb66A",
        side: "1",
        matchingPolicy: "0x0000000000dab4a563819e8fd93dba3b25bc3495",
        collection: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
        tokenId: "0",
        amount: "1",
        paymentToken: "0x0000000000000000000000000000000000000000",
        price: "0",
        fees: [],
        listingTime: "1680564070",
        expirationTime: "9999999999",
        salt: "222828092082568175740341765420535858609",
        extraParams: "0x01",
        nonce: "0",
      },
    },
    chainId: "1",
    extensionVersion: "",
    signTypedDataVersion: SignTypedDataVersion.V4,
    userAccount: "0xf7801B8115f3Fe46AC55f8c0Fdb5243726bdb66A",
  },
  message: {
    id: "",
    type: RequestType.SignTypedData,
    data: {
      chainId: "1",
      extensionVersion: "",
      signTypedDataVersion: SignTypedDataVersion.V4,
      type: RequestType.SignTypedData,
      payload: {
        types: {
          Order: [
            {
              name: "trader",
              type: "address",
            },
            {
              name: "side",
              type: "uint8",
            },
            {
              name: "matchingPolicy",
              type: "address",
            },
            {
              name: "collection",
              type: "address",
            },
            {
              name: "tokenId",
              type: "uint256",
            },
            {
              name: "amount",
              type: "uint256",
            },
            {
              name: "paymentToken",
              type: "address",
            },
            {
              name: "price",
              type: "uint256",
            },
            {
              name: "listingTime",
              type: "uint256",
            },
            {
              name: "expirationTime",
              type: "uint256",
            },
            {
              name: "fees",
              type: "Fee[]",
            },
            {
              name: "salt",
              type: "uint256",
            },
            {
              name: "extraParams",
              type: "bytes",
            },
            {
              name: "nonce",
              type: "uint256",
            },
          ],
          Fee: [
            {
              name: "rate",
              type: "uint16",
            },
            {
              name: "recipient",
              type: "address",
            },
          ],
        },
        domain: {
          name: "Blur Exchange",
          version: "1.0",
          chainId: 1,
          verifyingContract: "0x000000000000ad05ccc4f10045630fb830b95127",
        },
        primaryType: "Order",
        message: {
          trader: "0xf7801B8115f3Fe46AC55f8c0Fdb5243726bdb66A",
          side: "1",
          matchingPolicy: "0x0000000000dab4a563819e8fd93dba3b25bc3495",
          collection: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
          tokenId: "0",
          amount: "1",
          paymentToken: "0x0000000000000000000000000000000000000000",
          price: "0",
          fees: [],
          listingTime: "1680564070",
          expirationTime: "9999999999",
          salt: "222828092082568175740341765420535858609",
          extraParams: "0x01",
          nonce: "0",
        },
      },
      userAccount: "0xf7801B8115f3Fe46AC55f8c0Fdb5243726bdb66A",
    },
    origin: "https://examples.blowfish.tools",
  },
  impersonatingAddress: "",
  chainNetwork: "mainnet",
  chainFamily: "ethereum",
  dappUrl: "https://examples.blowfish.tools/",
};
