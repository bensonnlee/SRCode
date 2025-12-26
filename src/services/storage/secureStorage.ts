import * as SecureStore from 'expo-secure-store';
import { STORAGE_KEYS } from '@utils/constants';
import type { Credentials } from '@apptypes/auth';

export async function saveCredentials(
  username: string,
  password: string
): Promise<void> {
  const credentials: Credentials = { username, password };
  await SecureStore.setItemAsync(
    STORAGE_KEYS.CREDENTIALS,
    JSON.stringify(credentials)
  );
}

export async function getCredentials(): Promise<Credentials | null> {
  const stored = await SecureStore.getItemAsync(STORAGE_KEYS.CREDENTIALS);
  if (!stored) return null;
  return JSON.parse(stored) as Credentials;
}

export async function clearCredentials(): Promise<void> {
  await SecureStore.deleteItemAsync(STORAGE_KEYS.CREDENTIALS);
}

export async function saveFusionToken(
  token: string,
  expiryMs: number
): Promise<void> {
  await SecureStore.setItemAsync(STORAGE_KEYS.FUSION_TOKEN, token);
  await SecureStore.setItemAsync(
    STORAGE_KEYS.TOKEN_EXPIRY,
    (Date.now() + expiryMs).toString()
  );
}

export async function getFusionToken(): Promise<string | null> {
  const token = await SecureStore.getItemAsync(STORAGE_KEYS.FUSION_TOKEN);
  const expiry = await SecureStore.getItemAsync(STORAGE_KEYS.TOKEN_EXPIRY);

  if (!token || !expiry) return null;

  const expiryTime = parseInt(expiry, 10);
  if (Date.now() >= expiryTime) {
    await clearFusionToken();
    return null;
  }

  return token;
}

export async function clearFusionToken(): Promise<void> {
  await SecureStore.deleteItemAsync(STORAGE_KEYS.FUSION_TOKEN);
  await SecureStore.deleteItemAsync(STORAGE_KEYS.TOKEN_EXPIRY);
}

export async function clearAllSecureData(): Promise<void> {
  await clearCredentials();
  await clearFusionToken();
}
