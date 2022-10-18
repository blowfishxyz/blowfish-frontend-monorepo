import { WindowPostMessageStream } from "@metamask/post-message-stream";
import Browser from "webextension-polyfill";
import { Identifier, Message } from "../types";
import { sendAndAwaitResponseFromPort } from "../utils/messages";

// Connect to page
const stream = new WindowPostMessageStream({
  name: Identifier.ContentScript,
  target: Identifier.Inpage,
});

stream.on("data", (message: Message) => {
  // Connect to background script
  const extensionPort = Browser.runtime.connect({
    name: Identifier.ContentScript,
  });

  // Forward received messages to background.js with hostname
  const { hostname } = location;
  const messageWithHostname: Message = { ...message, hostname };

  // Send message to background.js and pipe response back to stream
  sendAndAwaitResponseFromPort(extensionPort, messageWithHostname).then(
    (response) => {
      stream.write(response);
    }
  );
});
