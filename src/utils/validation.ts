export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateUsername(username: string): ValidationResult {
  if (!username || username.trim().length === 0) {
    return { isValid: false, error: 'Username is required' };
  }
  return { isValid: true };
}

export function validatePassword(password: string): ValidationResult {
  if (!password || password.length === 0) {
    return { isValid: false, error: 'Password is required' };
  }
  return { isValid: true };
}

export function validateCredentials(
  username: string,
  password: string
): ValidationResult {
  const usernameResult = validateUsername(username);
  if (!usernameResult.isValid) {
    return usernameResult;
  }

  const passwordResult = validatePassword(password);
  if (!passwordResult.isValid) {
    return passwordResult;
  }

  return { isValid: true };
}
