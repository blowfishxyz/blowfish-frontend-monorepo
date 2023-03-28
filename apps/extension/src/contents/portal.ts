import {
  BlowfishPortalBackgroundMessage,
  Message,
  RequestType,
} from "@blowfish/utils/types";
import type { PlasmoContentScript } from "plasmo";
import Browser from "webextension-polyfill";

const SAFE_ORIGINS = ["http://localhost:3001", "https://protect.blowfish.xyz"];
const REQUEST_TYPES_TO_PROXY = new Set([
  RequestType.UserDecision,
  RequestType.SetBlowfishOptions,
  RequestType.BlowfishOptions,
  RequestType.GetTransactionToScan,
]);

// NOTE: This should only be injected into the transaction portal website
export const config: PlasmoContentScript = {
  matches: ["http://localhost:3001/*", "https://protect.blowfish.xyz/*"],
  all_frames: true,
  run_at: "document_start",
};

// This listens for message from the transaction portal website
// and forwards user decisions to the background script
window.addEventListener("message", async (event) => {
  if (
    !SAFE_ORIGINS.includes(event.origin) ||
    !REQUEST_TYPES_TO_PROXY.has(event.data?.type)
  ) {
    return;
  }

  const data = event.data as BlowfishPortalBackgroundMessage;

  const response = await Browser.runtime.sendMessage(data);
  const ack: Message<
    RequestType.MessageAck,
    BlowfishPortalBackgroundMessage["data"]
  > = {
    type: RequestType.MessageAck,
    id: data.id,
    data: response.data,
  };
  event.source?.postMessage(ack);
});

export default {};
