import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setItem<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getItem<T>(key: string): Promise<T | null> {
  const stored = await AsyncStorage.getItem(key);
  if (!stored) return null;
  return JSON.parse(stored) as T;
}

export async function removeItem(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}

export async function clearAll(): Promise<void> {
  await AsyncStorage.clear();
}

export async function getAllKeys(): Promise<readonly string[]> {
  return AsyncStorage.getAllKeys();
}
