import { useState, useEffect, useCallback, useRef } from 'react';
import { TIMING } from '@utils/constants';
import { generateBarcodeId } from '@services/auth/ucrAuth';
import type { BarcodeState } from '@apptypes/barcode';

export interface UseBarcodeReturn extends BarcodeState {
  refresh: () => Promise<void>;
}

export function useBarcode(
  fusionToken: string | null,
  autoRefreshInterval: number = TIMING.BARCODE_REFRESH_INTERVAL,
  autoRefreshEnabled: boolean = true
): UseBarcodeReturn {
  const refreshIntervalSeconds = autoRefreshInterval / 1000;

  const [state, setState] = useState<BarcodeState>({
    barcodeId: null,
    isLoading: false,
    error: null,
    timeUntilRefresh: refreshIntervalSeconds,
  });

  const autoRefreshRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMountedRef = useRef(true);

  const refresh = useCallback(async () => {
    if (!fusionToken) {
      setState((prev) => ({
        ...prev,
        error: 'No fusion token available',
        isLoading: false,
      }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    const result = await generateBarcodeId(fusionToken);

    if (!isMountedRef.current) return;

    if (result.success && result.barcodeId) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        barcodeId: result.barcodeId!,
        error: null,
        timeUntilRefresh: refreshIntervalSeconds,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        barcodeId: null,
        error: result.error || 'Failed to generate barcode',
      }));
    }
  }, [fusionToken, refreshIntervalSeconds]);

  useEffect(() => {
    isMountedRef.current = true;

    if (!fusionToken) {
      return;
    }

    // Fetch initial barcode
    refresh();

    // Set up auto-refresh interval only if enabled
    if (autoRefreshEnabled) {
      autoRefreshRef.current = setInterval(() => {
        refresh();
      }, autoRefreshInterval);

      // Set up countdown timer (updates every second)
      countdownRef.current = setInterval(() => {
        setState((prev) => ({
          ...prev,
          timeUntilRefresh:
            prev.timeUntilRefresh > 1 ? prev.timeUntilRefresh - 1 : refreshIntervalSeconds,
        }));
      }, 1000);
    }

    return () => {
      isMountedRef.current = false;
      if (autoRefreshRef.current) {
        clearInterval(autoRefreshRef.current);
      }
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [fusionToken, autoRefreshInterval, autoRefreshEnabled, refresh, refreshIntervalSeconds]);

  return {
    ...state,
    refresh,
  };
}
