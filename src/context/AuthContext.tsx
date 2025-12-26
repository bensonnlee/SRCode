import React, { createContext, useState, useCallback, useEffect } from 'react';
import type { AuthState, AuthContextValue } from '@apptypes/auth';
import {
  getCredentials,
  getFusionToken,
  clearAllSecureData,
} from '@services/storage/secureStorage';

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  fusionToken: null,
};

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    checkStoredAuth();
  }, []);

  const checkStoredAuth = async () => {
    try {
      const credentials = await getCredentials();
      const fusionToken = await getFusionToken();

      if (credentials && fusionToken) {
        setState({
          isAuthenticated: true,
          isLoading: false,
          user: { username: credentials.username },
          fusionToken,
        });
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const login = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      setState((prev) => ({ ...prev, isLoading: true }));

      // TODO: Implement actual authentication in Phase 2
      // const result = await authenticateUser(username, password);

      setState((prev) => ({ ...prev, isLoading: false }));
      return false;
    },
    []
  );

  const logout = useCallback(async (): Promise<void> => {
    await clearAllSecureData();
    setState({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      fusionToken: null,
    });
  }, []);

  const refreshToken = useCallback(async (): Promise<boolean> => {
    // TODO: Implement token refresh in Phase 2
    return false;
  }, []);

  const value: AuthContextValue = {
    ...state,
    login,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
