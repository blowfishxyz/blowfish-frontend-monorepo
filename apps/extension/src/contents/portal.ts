import type { PlasmoContentScript } from "plasmo";
import Browser from "webextension-polyfill";

import { Message, RequestType, UntypedMessageData } from "../types";

const SAFE_ORIGINS = ["http://localhost:3001", "https://protect.blowfish.xyz"];

// NOTE: This should only be injected into the transaction portal website
export const config: PlasmoContentScript = {
  matches: ["http://localhost:3001/*", "https://protect.blowfish.xyz/*"],
  all_frames: true,
  run_at: "document_start",
};

// This listens for message from the transaction portal website
// and forwards user decisions to the background script
window.addEventListener("message", async (event) => {
  if (SAFE_ORIGINS.includes(event.origin)) {
    const data = event.data as Message<UntypedMessageData>;
    if (data?.type === RequestType.UserDecision) {
      await Browser.runtime.sendMessage(data);
      const ack: Message<UntypedMessageData> = {
        type: RequestType.MessageAck,
        id: data.id,
        data: {},
      };
      event.source?.postMessage(ack);
    }
  }
});

export default {};
