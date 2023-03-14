import { useCallback, useEffect } from "react";

export const PREFERENCES_BLOWFISH_PAUSED = "PREFERENCES_BLOWFISH_PAUSED";

export enum PauseDuration {
  OneHour = "1h",
  ThreeHours = "3h",
  OneDay = "24h",
}

export const PAUSE_DURATIONS = {
  [PauseDuration.OneHour]: 60 * 60 * 1000,
  [PauseDuration.ThreeHours]: 3 * 60 * 60 * 1000,
  [PauseDuration.OneDay]: 24 * 60 * 60 * 1000,
};

export type BlowfishPausedOptionType = {
  until: number | null;
  isPaused: boolean;
};

const useTransactionScannerPauseResume = (
  scanPaused: BlowfishPausedOptionType | undefined,
  setScanPaused: (pausedOption: BlowfishPausedOptionType) => void
) => {
  const pauseScan = useCallback(
    (duration: PauseDuration) => {
      setScanPaused({
        until: Date.now() + PAUSE_DURATIONS[duration],
        isPaused: true,
      });
    },
    [setScanPaused]
  );

  const resumeScan = useCallback(() => {
    setScanPaused({
      until: null,
      isPaused: false,
    });
  }, [setScanPaused]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (scanPaused?.until) {
      const timeLeft = scanPaused.until - Date.now();
      if (timeLeft > 0) {
        timeoutId = setTimeout(() => {
          resumeScan();
        }, timeLeft);
      } else {
        resumeScan();
      }
    }
    return () => clearTimeout(timeoutId);
  }, [scanPaused, resumeScan]);

  return {
    pauseScan,
    resumeScan,
    isScanPaused: scanPaused?.isPaused,
    scanPausedUntil: scanPaused?.until,
  };
};

export default useTransactionScannerPauseResume;
