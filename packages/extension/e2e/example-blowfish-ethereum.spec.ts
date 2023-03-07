import type { Page } from "@playwright/test";

import {
  expect,
  impersonateAccount,
  test,
  waitUntilStable,
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
    await waitUntilStable(metamaskPage);
    // TODO(Andrei) - make the account configurable
    await impersonateAccount(page, extensionId, "vitalik.eth");
  });

  test("Malicious Permit2", async ({ page, context }) => {
    await page.goto("https://examples.blowfish.tools/ethereum/permit2");
    await initiateTransaction(page);

    const blowfishExtensionPage = await context.waitForEvent("page");
    console.log(process.env.PLASMO_PUBLIC_BLOWFISH_API_BASE_URL);
    console.log(
      await blowfishExtensionPage.getByTestId("unknown-error-title").innerText()
    );
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
      "https://examples.blowfish.tools/ethereum/set_approval_for_all"
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
});
