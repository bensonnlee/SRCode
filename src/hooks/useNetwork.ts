import { useState, useEffect } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export interface UseNetworkReturn {
  isConnected: boolean;
  isInternetReachable: boolean | null;
}

export function useNetwork(): UseNetworkReturn {
  const [networkState, setNetworkState] = useState<UseNetworkReturn>({
    isConnected: true,
    isInternetReachable: null,
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setNetworkState({
        isConnected: state.isConnected ?? false,
        isInternetReachable: state.isInternetReachable,
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return networkState;
}
