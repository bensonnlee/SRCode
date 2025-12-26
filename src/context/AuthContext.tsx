import React, { createContext, useState, useCallback, useEffect } from 'react';
import type { AuthState, AuthContextValue } from '@apptypes/auth';
import {
  getCredentials,
  getFusionToken,
  saveCredentials,
  saveFusionToken,
  clearAllSecureData,
} from '@services/storage/secureStorage';
import {
  authenticateUser,
  refreshAuthentication,
} from '@services/auth/ucrAuth';

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  fusionToken: null,
};

// Token expiry time: 1 hour (in milliseconds)
const TOKEN_EXPIRY_MS = 60 * 60 * 1000;

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
      } else if (credentials) {
        // Have credentials but no valid token - try to refresh
        setState((prev) => ({ ...prev, isLoading: true }));
        const result = await refreshAuthentication(
          credentials.username,
          credentials.password
        );

        if (result.success && result.fusionToken) {
          await saveFusionToken(result.fusionToken, TOKEN_EXPIRY_MS);
          setState({
            isAuthenticated: true,
            isLoading: false,
            user: { username: credentials.username },
            fusionToken: result.fusionToken,
          });
        } else {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const login = useCallback(
    async (
      username: string,
      password: string,
      rememberMe: boolean
    ): Promise<boolean> => {
      setState((prev) => ({ ...prev, isLoading: true }));

      try {
        const result = await authenticateUser(username, password);

        if (result.success && result.fusionToken) {
          // Save fusion token
          await saveFusionToken(result.fusionToken, TOKEN_EXPIRY_MS);

          // Save credentials only if "Remember me" is checked
          if (rememberMe) {
            await saveCredentials(username, password);
          }

          setState({
            isAuthenticated: true,
            isLoading: false,
            user: { username },
            fusionToken: result.fusionToken,
          });

          return true;
        }

        setState((prev) => ({ ...prev, isLoading: false }));
        return false;
      } catch {
        setState((prev) => ({ ...prev, isLoading: false }));
        return false;
      }
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
    try {
      const credentials = await getCredentials();

      if (!credentials) {
        return false;
      }

      const result = await refreshAuthentication(
        credentials.username,
        credentials.password
      );

      if (result.success && result.fusionToken) {
        await saveFusionToken(result.fusionToken, TOKEN_EXPIRY_MS);
        setState((prev) => ({
          ...prev,
          fusionToken: result.fusionToken!,
        }));
        return true;
      }

      return false;
    } catch {
      return false;
    }
  }, []);

  const value: AuthContextValue = {
    ...state,
    login,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
