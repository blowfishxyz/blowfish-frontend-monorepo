import qs from "qs"
import Browser from "webextension-polyfill"

import type { RequestType } from "../types"
import { sleep } from "../utils/utils"

export interface PopupParams {
  type: RequestType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
export const createTabPopup = async (
  filename: string,
  params: PopupParams,
  { width, height }: { width: number; height: number }
): Promise<Browser.Windows.Window> => {
  const [window] = await Promise.all([
    Browser.windows.getCurrent(),
    sleep(100) // HACK: Add a slight delay to prevent weird window positioning
  ])
  const queryString = qs.stringify(params)

  const windowPanelHeight = 28
  const positions = getPopupPositions(window, width, height + windowPanelHeight)

  const popupWindow = await Browser.windows.create({
    url: `tabs/${filename}?${queryString}`,
    type: "popup",
    ...positions
  })

  // HACK: Positioning doesn't work on Firefox, on Chrome the window is already
  // in the right position
  await Browser.windows.update(popupWindow.id!, positions)

  return popupWindow
}

const getPopupPositions = (
  window: Browser.Windows.Window,
  width: number,
  height: number
) => {
  const left = window.left! + Math.round((window.width! - width) * 0.5)
  const top = window.top! + Math.round((window.height! - height) * 0.2)

  return { width, height, left, top }
}
