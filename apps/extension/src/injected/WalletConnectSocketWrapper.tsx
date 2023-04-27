import {
  decryptRPCRequestV1,
  decryptRPCRequestV2,
} from "~utils/wallet-connect/crypto";
import { handleRequest, handleRequestV1 } from "~utils/wallet-connect/enigne";
import { loadWalletConnectV1FromLocalStorage } from "~utils/wallet-connect/localStorage";
import type {
  DecryptedMessageV2,
  SocketMessageV2,
} from "~utils/wallet-connect/types";

const pendingRequests = new Set<number>();

export class WalletConnectSocketWrapper extends WebSocket {
  private listeners: Array<EventListenerOrEventListenerObject>;
  private data;

  constructor(url: string, protocols?: string | string[]) {
    super(url, protocols);
    this.listeners = [];
    this.data = "";
    return this;
  }

  async send(data: string) {
    this.data = data;
    if (this.url.includes("walletconnect")) {
      if (this.url.includes("version=1")) {
        const { key, clientId, chainId, accounts } =
          loadWalletConnectV1FromLocalStorage();
        if (key && clientId && chainId && accounts.length > 0) {
          const connectedAccount = accounts[0];
          // actual message to be sent to the portal
          const decryptedMessage = await decryptRPCRequestV1(data, key);
          if (decryptedMessage) {
            await handleRequestV1(
              data,
              decryptedMessage,
              chainId,
              connectedAccount,
              clientId,
              key,

              super.send.bind(this),
              this.broadcast.bind(this)
            );
          } else {
            super.send(data);
          }
        } else {
          super.send(data);
        }
      } else {
        const socketMessage: SocketMessageV2 = JSON.parse(data);
        if (
          !socketMessage.params ||
          !socketMessage.params.message ||
          !socketMessage.params.topic
        ) {
          super.send(data);
          return;
        }
        const { message, topic } = socketMessage.params;
        const decodedMessage: DecryptedMessageV2 = decryptRPCRequestV2(
          topic,
          message
        );

        if (!decodedMessage || decodedMessage.method !== "wc_sessionRequest") {
          super.send(data);
          return;
        }

        // NOTE: prevent duplicate Blowfish Protect tabs to be opened
        if (pendingRequests.has(decodedMessage.id)) return;

        await handleRequest(
          data,
          decodedMessage,
          topic,
          pendingRequests,
          () => {
            super.send(data);
            pendingRequests.delete(decodedMessage.id);
          }
        );
      }
    } else {
      super.send(data);
    }
  }

  broadcast(data: string): void {
    this.listeners.forEach((listener) => {
      if (typeof listener === "function") {
        listener(new MessageEvent("message", { data }));
      } else {
        listener.handleEvent(new MessageEvent("message", { data }));
      }
    });
  }

  addEventListener(
    type: "message",
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.listeners.push(listener);
    super.addEventListener(type, listener, options);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set onmessage(listener: any) {
    this.listeners.push(listener);
    super.onmessage = listener;
  }
}

window.WebSocket = WalletConnectSocketWrapper;
