const PREFERENCES_UNSUPPORTED_CHAINS_DISMISSED_KEY =
  "PREFERENCES_UNSUPPORTED_CHAINS_DISMISSED"

const getValueForKey = async <T>(key: string): Promise<T | undefined> => {
  const valueObject = await chrome.storage.sync.get(key)

  if (valueObject && valueObject[key]) {
    return valueObject[key]
  }
}
export const isUnsupportedChainDismissed = async (
  chainId: string
): Promise<boolean> => {
  const unsupportedChainsDismissed = await getValueForKey<{
    [key: string]: boolean
  }>(PREFERENCES_UNSUPPORTED_CHAINS_DISMISSED_KEY)

  return !!(unsupportedChainsDismissed && unsupportedChainsDismissed[chainId])
}

export const setUnsupportedChainDismissed = async (
  chainId: string,
  value: boolean
) => {
  const currentPreferences = await getValueForKey<{ [key: string]: boolean }>(
    PREFERENCES_UNSUPPORTED_CHAINS_DISMISSED_KEY
  )

  await chrome.storage.sync.set({
    [PREFERENCES_UNSUPPORTED_CHAINS_DISMISSED_KEY]: {
      ...currentPreferences,
      [chainId]: value
    }
  })
}
