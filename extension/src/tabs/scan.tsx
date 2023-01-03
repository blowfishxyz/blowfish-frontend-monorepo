import qs from "qs"
import React, { useCallback, useEffect, useMemo, useState } from "react"

import "../style.css"

import { ApproveBottomMenu, SlimBottomMenu } from "../components/BottomMenus"
import {
  SimulationErrorScreen,
  TransactionBlockedScreen,
  UnknownErrorScreen,
  UnsupportedChainScreen
} from "../components/InformationScreens"
import { LoadingScreen } from "../components/LoadingScreen"
import { PopupContainer } from "../components/PopupContainer"
import { Providers } from "../components/Providers"
import { ScanResults } from "../components/ScanResults"
import { useScanDappRequest } from "../hooks/useScanDappRequest"
import { respondWithUserDecision } from "../page-utils"
import {
  DappRequest,
  Message,
  UntypedMessageData,
  actionToSeverity,
  isSignMessageRequest,
  isSignTypedDataRequest,
  parseRequestFromMessage
} from "../types"
import type { ChainFamily, ChainNetwork } from "../utils/BlowfishApiClient"
import { chainIdToSupportedChainMapping } from "../utils/constants"
import { logger } from "../utils/logger"
import { setUnsupportedChainDismissed } from "../utils/storage"

const ScanResult: React.FC = () => {
  const [chainNetwork, setChainNetwork] = useState<ChainNetwork | undefined>(
    undefined
  )
  const [chainFamily, setChainFamily] = useState<ChainFamily | undefined>(
    undefined
  )
  const [userAccount, setUserAccount] = useState<string | undefined>(undefined)
  const [message, setMessage] = useState<
    Message<UntypedMessageData> | undefined
  >(undefined)
  const [request, setRequest] = useState<DappRequest | undefined>(undefined)
  const [hasDismissedScreen, setHasDismissedScreen] = useState<boolean>(false)

  useEffect(() => {
    const windowQs = window.location.search
    const cleanedQs = windowQs.startsWith("?") ? windowQs.slice(1) : windowQs
    // NOTE: We only pass Message through the query params
    const _message = qs.parse(cleanedQs) as unknown as Message<DappRequest>
    const _request = parseRequestFromMessage(_message)
    const chainId = _message.data.chainId.toString()

    setMessage(_message)
    setRequest(_request)
    setUserAccount(_request.userAccount)

    // NOTE: This should never happen since we verify
    // that the chain is supported before we create this page
    if (!chainIdToSupportedChainMapping[chainId]) {
      logger.debug(`Blowfish unsupported chainId ${chainId}`)
      return
    }
    const { chainFamily: _chainFamily, chainNetwork: _chainNetwork } =
      chainIdToSupportedChainMapping[chainId]
    setChainFamily(_chainFamily)
    setChainNetwork(_chainNetwork)
  }, [])

  const {
    data: scanResults,
    error: scanError,
    mutate
  } = useScanDappRequest(chainFamily, chainNetwork, request, message?.origin)

  const closeWindow = useCallback(() => window.close(), [])

  const handleUserDecision = useCallback(
    async (shouldProceed: boolean) => {
      if (!message) {
        logger.error("Error: Cannot proceed, no message to respond to ")
        return
      }
      await respondWithUserDecision(message.id, shouldProceed)
      closeWindow()
    },

    [message, closeWindow]
  )

  logger.debug(message)
  logger.debug(request)

  const severity = useMemo(
    () =>
      scanResults?.action ? actionToSeverity(scanResults?.action) : undefined,
    [scanResults?.action]
  )

  const hasAllData =
    scanResults &&
    request &&
    message &&
    chainFamily &&
    chainNetwork &&
    userAccount
  const isMessageSignatureRequest = useMemo(
    () =>
      request &&
      (isSignMessageRequest(request) || isSignTypedDataRequest(request)),
    [request]
  )

  const maybeInformationScreen = useMemo(() => {
    const isLoading = !scanResults && !scanError
    const isError = !isLoading && scanError
    const shouldShowBlockScreen = scanResults?.action === "BLOCK"
    const simulationError = scanResults && scanResults.simulationResults?.error
    const isUnsupportedChain = !chainFamily || !chainNetwork

    if (isError) {
      logger.error(scanError)
    }

    // NOTE(kimpers): We make th assumption that one tx can only generate one error screen
    // currently this holds true but it may not be the case in the future
    const onContinue = () => setHasDismissedScreen(true)

    if (isUnsupportedChain && message) {
      const onToggleShowUnsupportedChain = async (value: boolean) => {
        const chainId = message?.data?.chainId as string | undefined
        if (!chainId) {
          logger.error(`No chainId found in message ${message}`)
          return
        }
        await setUnsupportedChainDismissed(chainId, value)
      }

      return (
        <>
          <UnsupportedChainScreen
            onDismissUnsupportedChain={onToggleShowUnsupportedChain}
          />
          <SlimBottomMenu
            onClick={() => handleUserDecision(true)}
            buttonLabel="Close"
          />
        </>
      )
    } else if (isLoading) {
      return (
        <LoadingScreen
          type={isMessageSignatureRequest ? "message" : "transaction"}
        />
      )
    } else if (isError && !hasDismissedScreen) {
      // TODO(kimpers): Error message propagation from the API
      return (
        <>
          <UnknownErrorScreen onRetry={() => mutate()} />;
          <SlimBottomMenu onClick={closeWindow} buttonLabel="Close" />
        </>
      )
    } else if (shouldShowBlockScreen && !hasDismissedScreen) {
      return (
        <>
          <TransactionBlockedScreen onContinue={onContinue} />
          <SlimBottomMenu onClick={closeWindow} buttonLabel="Close" />
        </>
      )
    } else if (simulationError && !hasDismissedScreen) {
      if (simulationError.kind === "SIMULATION_FAILED") {
        return (
          <>
            <SimulationErrorScreen
              headline="Transaction Reverted"
              message="The transaction reverted when we simulated it. Approving may lead to loss of funds"
              errorMessage={simulationError.parsedErrorMessage}
            />
            <SlimBottomMenu onClick={onContinue} buttonLabel="Continue" />
          </>
        )
      } else {
        return (
          <>
            <SimulationErrorScreen
              headline="Simulation Failed"
              message="We are unable to simulate this transaction. Approving may lead to loss of funds"
            />
            <SlimBottomMenu onClick={onContinue} buttonLabel="Continue" />
          </>
        )
      }
    }
  }, [
    scanResults,
    scanError,
    hasDismissedScreen,
    closeWindow,
    isMessageSignatureRequest,
    mutate,
    chainFamily,
    chainNetwork,
    message,
    handleUserDecision
  ])

  return (
    <PopupContainer
      userAccount={userAccount}
      chainNetwork={chainNetwork}
      chainFamily={chainFamily}
      severity={severity}
      bottomMenuType={maybeInformationScreen ? "SLIM" : "NONE"}>
      {maybeInformationScreen
        ? maybeInformationScreen
        : hasAllData && (
            <>
              <ScanResults
                request={request}
                scanResults={scanResults}
                dappUrl={message.origin!}
                chainFamily={chainFamily}
                chainNetwork={chainNetwork}
              />
              <ApproveBottomMenu
                onContinue={() => handleUserDecision(true)}
                onCancel={() => handleUserDecision(false)}
              />
            </>
          )}
    </PopupContainer>
  )
}

const Page: React.FC = () => (
  <Providers>
    <ScanResult />
  </Providers>
)

export default Page
