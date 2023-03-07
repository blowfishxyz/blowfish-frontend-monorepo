import {
  type BrowserContext,
  Page,
  test as base,
  chromium,
} from "@playwright/test";
import path from "path";

import prepareMetamask from "./metamask-setup";

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
}>({
  context: async ({}, use) => {
    const pathToBlowfishExtension = path.join(
      __dirname,
      "../build/chrome-mv3-dev"
    );
    const pathToToMetamask = path.join(
      __dirname,
      "../build/metamask/",
      await prepareMetamask()
    );

    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: [
        `--headless=new`,
        `--disable-extensions-except=${pathToToMetamask},${pathToBlowfishExtension}`,
        `--load-extension=${pathToToMetamask},${pathToBlowfishExtension}`,
      ],
    });

    await use(context);
    await context.close();
  },
  extensionId: async ({ context }, use) => {
    let [background] = context.serviceWorkers();
    if (!background) background = await context.waitForEvent("serviceworker");

    const extensionId = background.url().split("/")[2];
    await use(extensionId);
  },
});

export const expect = test.expect;

export const impersonateAccount = async (
  page: Page,
  extensionId: string,
  account: string
) => {
  await page.goto(`chrome-extension://${extensionId}/popup.html`);
  await page.getByTestId("impersonator-toggle").click();
  await page.getByTestId("impersonator-input").fill(account);
  await page.getByTestId("update-button").click();
};

export const waitUntilStable = async (page: Page) => {
  await page.waitForLoadState("load");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("networkidle");
};
