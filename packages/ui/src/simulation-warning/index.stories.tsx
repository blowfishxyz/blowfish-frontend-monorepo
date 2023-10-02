import { ComponentMeta, StoryObj } from "@storybook/react";
import { styled } from "styled-components";

import { SimulationWarning } from "~/simulation-warning";
import { WarningInnerKindEnum } from "@blowfishxyz/api-client/v20230605";

export default {
  title: "SimulationWarning",
  component: SimulationWarning,
  args: {},
} as ComponentMeta<typeof SimulationWarningStory>;

const SimulationWarningStory = ({ kind }: { kind: WarningInnerKindEnum }) => {
  const warning = {
    kind,
    message:
      WARNING_MESSAGES[kind] ||
      "Human-readable warning that comes from Blowfish API",
    severity: "WARNING" as const,
  };
  return (
    <Wrapper>
      <SimulationWarning warning={warning} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 420px;
`;

export const AllWarnings = () => <>{warnings}</>;

const supportedWarnings = [
  WarningInnerKindEnum.ApprovalToEoa,
  WarningInnerKindEnum.BlocklistedDomainCrossOrigin,
  WarningInnerKindEnum.BlurBulkOrderNotOnBlur,
  WarningInnerKindEnum.BlurV2OrderNotOnBlur,
  WarningInnerKindEnum.BulkApprovalsRequest,
  WarningInnerKindEnum.CompromisedAuthorityUpgrade,
  WarningInnerKindEnum.CopyCatDomain,
  WarningInnerKindEnum.CopyCatImageUnresponsiveDomain,
  WarningInnerKindEnum.DanglingApproval,
  WarningInnerKindEnum.DebuggerPaused,
  WarningInnerKindEnum.DurableNonce,
  WarningInnerKindEnum.EthSignTxHash,
  WarningInnerKindEnum.Forta,
  WarningInnerKindEnum.ImbalancedDollarValue,
  WarningInnerKindEnum.KnownMalicious,
  WarningInnerKindEnum.MaliciousPackages,
  WarningInnerKindEnum.MultiCopyCatDomain,
  WarningInnerKindEnum.NewDomain,
  WarningInnerKindEnum.PermitNoExpiration,
  WarningInnerKindEnum.PermitUnlimitedAllowance,
  WarningInnerKindEnum.PoisonedAddress,
  WarningInnerKindEnum.ReferencedOfacAddress,
  WarningInnerKindEnum.SemiTrustedBlocklistDomain,
  WarningInnerKindEnum.SetOwnerAuthority,
  WarningInnerKindEnum.SuspectedMalicious,
  WarningInnerKindEnum.TooManyTransactions,
  WarningInnerKindEnum.TradeForNothing,
  WarningInnerKindEnum.TradeForUnverifiedNft,
  WarningInnerKindEnum.TransferringErc20ToOwnContract,
  WarningInnerKindEnum.TransferringTooMuchSol,
  WarningInnerKindEnum.TransfersMajorityOfYourSol,
  WarningInnerKindEnum.TrustedBlocklistDomain,
  WarningInnerKindEnum.UnlimitedAllowanceToNfts,
  WarningInnerKindEnum.UnusualGasConsumption,
  WarningInnerKindEnum.UserAccountOwnerChange,
  WarningInnerKindEnum.WhitelistedDomainCrossOrigin,
  WarningInnerKindEnum.YakoaNftIpInfringement,
];

export const WARNING_MESSAGES: { [key in WarningInnerKindEnum]: string } = {
  [WarningInnerKindEnum.BulkApprovalsRequest]:
    "This is a bulk approval request. Approvals allow someone else to move your assets on your behalf.",
  [WarningInnerKindEnum.CompromisedAuthorityUpgrade]:
    "This contract was recently updated by a potentially compromised developer account. Please review the changes carefully before interacting.",
  [WarningInnerKindEnum.CopyCatDomain]:
    "If you were intending to visit PROJECT_NAME (OFFICIAL_WEBSITE), please be aware that this is not their official website.",
  [WarningInnerKindEnum.CopyCatImageUnresponsiveDomain]:
    "This website has been unresponsive in the past, which can indicate suspicious activity. Proceed with caution.",
  [WarningInnerKindEnum.MultiCopyCatDomain]:
    "This domain has been flagged for impersonating well-known brands. Approving may lead to loss of funds.",
  [WarningInnerKindEnum.NewDomain]:
    "This domain is new or has not been reviewed yet. Proceed with caution.",
  [WarningInnerKindEnum.DanglingApproval]:
    "You are allowing this dApp to withdraw funds from your account in the future.",
  [WarningInnerKindEnum.EthSignTxHash]:
    "You are signing what could be a transaction hash, which is a valid Ethereum transaction. Approving may lead to loss of funds.",
  [WarningInnerKindEnum.KnownMalicious]:
    "We believe this transaction is malicious and unsafe to sign. Approving may lead to loss of funds.",
  [WarningInnerKindEnum.PoisonedAddress]:
    "This address sent a 0-value transaction to you, impersonating an address you have previously transferred to. Triple check the entire address you are sending funds to.",
  [WarningInnerKindEnum.ApprovalToEoa]:
    "You are approving an EOA (Externally Owned Account) to transfer your tokens. Approving may lead to loss of funds.",
  [WarningInnerKindEnum.SetOwnerAuthority]:
    "This transaction changes the owner of your SPL tokens. This allows the new owner to transfer the tokens without your permission.",
  [WarningInnerKindEnum.SuspectedMalicious]:
    "We suspect this transaction is malicious. Approving may lead to loss of funds.",
  [WarningInnerKindEnum.TooManyTransactions]:
    "You are approving over 200 transactions. If you are not knowingly performing a bulk action, this might be a scam.",
  [WarningInnerKindEnum.TradeForNothing]:
    "You are trading your token(s) in exchange for nothing.",
  [WarningInnerKindEnum.TransferringErc20ToOwnContract]:
    "You are transferring ERC20 tokens directly to their own token contract. In most cases this will lead to you losing them forever.",
  [WarningInnerKindEnum.UserAccountOwnerChange]:
    "This transaction is trying to change the owner of your account. This allows the new owner to transfer your tokens without your permission.",
  [WarningInnerKindEnum.UnusualGasConsumption]:
    "This transaction uses an unusually high amount of gas. Make sure the token you are revoking is valuable.",
  [WarningInnerKindEnum.TrustedBlocklistDomain]:
    "Domain found on blocklists maintained by Blowfish. This website is very likely to be a scam.",
  [WarningInnerKindEnum.SemiTrustedBlocklistDomain]:
    "Domain found on blocklists maintained by a third-party blocklist (ex: Metamask, Phantom). This website is very likely to be a scam.",
  [WarningInnerKindEnum.PermitUnlimitedAllowance]:
    "You are allowing this dApp to withdraw funds from your account in the future.",
  [WarningInnerKindEnum.DebuggerPaused]: "Debugger is paused.",
  [WarningInnerKindEnum.UnlimitedAllowanceToNfts]:
    "You are allowing this dApp to withdraw funds from your account in the future.",
  [WarningInnerKindEnum.ReferencedOfacAddress]:
    "This transaction interacts with an address that is on the OFAC sanctions list.",
  [WarningInnerKindEnum.ImbalancedDollarValue]:
    "The dollar value of the tokens you are receiving is less than dollar value of the tokens you are sending.",
  [WarningInnerKindEnum.BlurBulkOrderNotOnBlur]:
    "You are signing a Blur bulk order on a non-Blur domain. Approving may lead to loss of funds, and state changes are unknown.",
  [WarningInnerKindEnum.BlurV2OrderNotOnBlur]:
    "You are signing a Blur v2 order on a non-Blur domain. Blur v2 orders are impossible to simulate and will likely result in loss of funds.",
  [WarningInnerKindEnum.TransferringTooMuchSol]:
    "Transaction is attempting to transfer out more than u64 lamports.",
  [WarningInnerKindEnum.TransfersMajorityOfYourSol]:
    "Transaction transfers the majority of your SOL.",
  [WarningInnerKindEnum.DurableNonce]:
    "This transaction could steal your funds in the future. Do not proceed unless you trust this website",
  [WarningInnerKindEnum.Forta]:
    "This transaction interacts with an address that's labelled as potentially malicious on the Forta Network.",
  [WarningInnerKindEnum.YakoaNftIpInfringement]:
    "This NFT may contain unauthorized intellectual property. Please do your own research before interacting with this NFT.",
  [WarningInnerKindEnum.PermitNoExpiration]:
    "You are allowing this dApp to withdraw funds from your account in the future.",
  [WarningInnerKindEnum.TradeForUnverifiedNft]:
    "You are trading for NFTs which have not been verified by major NFT marketplaces.",
  [WarningInnerKindEnum.MaliciousPackages]:
    "We believe this transaction is malicious and unsafe to sign. Approving may lead to loss of funds.",
  [WarningInnerKindEnum.DebuggerPaused]: "",
  [WarningInnerKindEnum.BlocklistedDomainCrossOrigin]: "",
  [WarningInnerKindEnum.WhitelistedDomainCrossOrigin]: "",
};

const warnings = supportedWarnings.map((kind) => {
  return <SimulationWarningStory kind={kind} />;
});

export const SingleWarning: StoryObj<{ kind: WarningInnerKindEnum }> = {
  render: ({ kind }) => {
    const warning = {
      kind,
      message:
        WARNING_MESSAGES[kind] ||
        "Human-readable warning that comes from Blowfish API",
      severity: "WARNING" as const,
    };
    return (
      <Wrapper>
        <SimulationWarning warning={warning} />
      </Wrapper>
    );
  },
  argTypes: {
    kind: {
      control: {
        type: "select",
        options: supportedWarnings,
      },
      defaultValue: WarningInnerKindEnum.ApprovalToEoa,
    },
  },
};
