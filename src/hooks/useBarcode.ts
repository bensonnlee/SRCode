import { useState, useEffect, useCallback, useRef } from 'react';
import { TIMING } from '@utils/constants';
import type { BarcodeState } from '@apptypes/barcode';

export interface UseBarcodeReturn extends BarcodeState {
  refresh: () => Promise<void>;
}

export function useBarcode(
  fusionToken: string | null,
  autoRefreshInterval: number = TIMING.BARCODE_REFRESH_INTERVAL
): UseBarcodeReturn {
  const [state, setState] = useState<BarcodeState>({
    barcodeId: null,
    isLoading: false,
    error: null,
    timeUntilRefresh: autoRefreshInterval / 1000,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

    // TODO: Implement actual barcode generation in Phase 3
    // const result = await generateBarcodeId(fusionToken);

    setState((prev) => ({
      ...prev,
      isLoading: false,
      // barcodeId: result.barcodeId,
      timeUntilRefresh: autoRefreshInterval / 1000,
    }));
  }, [fusionToken, autoRefreshInterval]);

  useEffect(() => {
    // TODO: Implement auto-refresh timer in Phase 3
    const currentInterval = intervalRef.current;
    return () => {
      if (currentInterval) {
        clearInterval(currentInterval);
      }
    };
  }, [fusionToken, autoRefreshInterval, refresh]);

  return {
    ...state,
    refresh,
  };
}
