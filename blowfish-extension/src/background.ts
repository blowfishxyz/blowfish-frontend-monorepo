import Browser from "webextension-polyfill"

import {
  Message,
  RequestType,
  SignMessageRequest,
  SignTypedDataRequest,
  TransactionRequest,
  UntypedMessageData,
  UserDecisionData
} from "./types"
import { chainIdToSupportedChainMapping } from "./utils/constants"
import { logger } from "./utils/logger"
import { postResponseToPort } from "./utils/messages"
import { isUnsupportedChainDismissed } from "./utils/storage"
import { createPopupWithFile } from "./utils/window"

const DIMENSIONS = { width: 392, height: 768 }

logger.debug("BACKGROUND RUNNING")
const messageToPortMapping: Map<string, Browser.Runtime.Port> = new Map()

const setupRemoteConnection = async (remotePort: Browser.Runtime.Port) => {
  remotePort.onMessage.addListener((message: Message<UntypedMessageData>) => {
    logger.debug(message)

    if (message.type === RequestType.Transaction) {
      return processTransactionRequest(
        message as Message<TransactionRequest>,
        remotePort
      )
    } else if (message.type === RequestType.SignTypedData) {
      return processSignTypedDataRequest(
        message as Message<SignTypedDataRequest>,
        remotePort
      )
    } else if (message.type === RequestType.SignMessage) {
      return processSignMessageRequest(
        message as Message<SignMessageRequest>,
        remotePort
      )
    }
  })
}

Browser.runtime.onConnect.addListener(setupRemoteConnection)
Browser.runtime.onMessage.addListener(
  (message: Message<UntypedMessageData>) => {
    const responseRemotePort = messageToPortMapping.get(message.id)

    if (responseRemotePort) {
      responseRemotePort.postMessage(message)
      messageToPortMapping.delete(message.id)
    } else {
      logger.error(
        `Missing remote port for message ${message.id}: ${message.type}`
      )
    }
  }
)

const processRequestBase = async (
  message: Message<
    TransactionRequest | SignTypedDataRequest | SignMessageRequest
  >,
  remotePort: Browser.Runtime.Port
): Promise<void> => {
  const { chainId } = message.data
  // Just proxy the request if we don't support the current chain
  // and the user dismissed the notice
  if (!chainIdToSupportedChainMapping[chainId]) {
    const isDismissed = await isUnsupportedChainDismissed(chainId)
    if (isDismissed) {
      logger.info(`Unsupported chain id ${chainId}`)
      const responseData: UserDecisionData = { isOk: true }
      postResponseToPort(remotePort, message, responseData)
      return
    }
  }

  // TODO(kimpers): We could consider kicking off the scan before we even open the popup
  // and send the scan results via a message to the window for a snappier user experience
  logger.debug(message)
  const windowPromise = createPopupWithFile("scan.html", message, DIMENSIONS)

  // Store port to id mapping so we can respond to the message later on
  messageToPortMapping.set(message.id, remotePort)
  const win = await windowPromise
  const tabId = win.tabs?.[0]?.id
  Browser.tabs.onRemoved.addListener((removedTabId) => {
    // If the window is closed before we received a response we assume cancel
    // as the user probably just closed the window
    if (removedTabId === tabId && messageToPortMapping.has(message.id)) {
      logger.debug(
        "Window closed without response, assuming the user wants to cancel"
      )
      const responseData: UserDecisionData = { isOk: false }
      postResponseToPort(remotePort, message, responseData)
    }
  })
}

const processTransactionRequest = async (
  message: Message<TransactionRequest>,
  remotePort: Browser.Runtime.Port
): Promise<void> => {
  await processRequestBase(message, remotePort)
}

const processSignTypedDataRequest = async (
  message: Message<SignTypedDataRequest>,
  remotePort: Browser.Runtime.Port
): Promise<void> => {
  await processRequestBase(message, remotePort)
}

const processSignMessageRequest = async (
  message: Message<SignMessageRequest>,
  remotePort: Browser.Runtime.Port
): Promise<void> => {
  await processRequestBase(message, remotePort)
}
