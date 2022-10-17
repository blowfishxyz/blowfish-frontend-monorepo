import { WindowPostMessageStream } from "@metamask/post-message-stream";
import Browser from "webextension-polyfill";
import { Identifier, RequestType } from "../utils/constants";
import { sendAndAwaitResponseFromPort } from "../utils/messages";

// Connect to page
const stream = new WindowPostMessageStream({
  name: Identifier.ContentScript,
  target: Identifier.Inpage,
});

stream.on("data", (data) => {
  // Connect to background script
  const extensionPort = Browser.runtime.connect({
    name: Identifier.ContentScript,
  });

  // Forward received messages to background.js
  const { hostname } = location;
  sendAndAwaitResponseFromPort(extensionPort, {
    type: RequestType.Transaction,
    hostname,
    ...data.data,
  }).then((response) => {
    stream.write({ id: data.id, data: response });
  });
});
