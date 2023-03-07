import type { Page } from "@playwright/test";

import {
  expect,
  impersonateAccount,
  test,
  waitUntilStableMetamask,
} from "./test-utils";

const initiateTransaction = async (page: Page) => {
  const connectWalletButton = page.getByText("Connect Wallet");
  if (connectWalletButton) {
    await connectWalletButton.click();
    await page.getByText("Connect MetaMask").click();
  }
  await page.getByText("Initiate transaction").click();
};

test.describe("Ethereum Blowfish Examples Page", () => {
  test.beforeAll(async ({ context, page, extensionId }) => {
    const metamaskPage = context.backgroundPages()[0];
    if (metamaskPage) {
      await waitUntilStableMetamask(metamaskPage);
    }
    await impersonateAccount(page, extensionId, "vitalik.eth");
    await page.bringToFront();
  });

  test("Malicious Permit2", async ({ page, context }) => {
    await page.goto("https://examples.blowfish.tools/ethereum/permit2", {
      waitUntil: "domcontentloaded",
    });
    await initiateTransaction(page);

    const blowfishExtensionPage = await context.waitForEvent("page");

    expect(
      await blowfishExtensionPage
        .getByTestId("warning-notice-headline")
        .innerText()
    ).toBe("WARNING");
    expect(
      await blowfishExtensionPage
        .getByTestId("warning-notice-message")
        .innerText()
    ).toBe(
      "You are allowing this dApp to withdraw funds from your account in the future"
    );
    expect(
      await blowfishExtensionPage
        .getByTestId("simulation-results")
        .allTextContents()
    ).toStrictEqual([
      "Permit to transfer all your USDT anytime in the future",
      "Permit to transfer all your USDC anytime in the future",
      "Permit to transfer all your WETH anytime in the future",
    ]);
  });

  test("Malicious NFT SetApprovalForAll", async ({ page, context }) => {
    await page.goto(
      "https://examples.blowfish.tools/ethereum/set_approval_for_all",
      {
        waitUntil: "domcontentloaded",
      }
    );
    await initiateTransaction(page);

    const blowfishExtensionPage = await context.waitForEvent("page");

    expect(
      await blowfishExtensionPage
        .getByTestId("warning-notice-headline")
        .innerText()
    ).toBe("WARNING");
    expect(
      await blowfishExtensionPage
        .getByTestId("warning-notice-message")
        .innerText()
    ).toBe(
      "You are allowing this dApp to withdraw funds from your account in the future"
    );
    expect(
      await blowfishExtensionPage.getByTestId("simulation-results").innerText()
    ).toBe("Approve to transfer all your BoredApeYachtClub");
  });

  test("Send ERC20 tokens to the token contract", async ({ page, context }) => {
    await page.goto(
      "https://examples.blowfish.tools/ethereum/transfer_erc20_to_contract",
      {
        waitUntil: "domcontentloaded",
      }
    );
    await initiateTransaction(page);

    const blowfishExtensionPage = await context.waitForEvent("page");

    expect(
      await blowfishExtensionPage
        .getByTestId("warning-notice-headline")
        .innerText()
    ).toBe("WARNING");
    expect(
      await blowfishExtensionPage
        .getByTestId("warning-notice-message")
        .innerText()
    ).toBe(
      "You are transferring ER20 tokens directly to their own token contract. In most cases this will lead to you losing them forever."
    );
    expect(
      await blowfishExtensionPage.getByTestId("simulation-results").innerText()
    ).toBe("Send 0.01 WETH");
  });
});
