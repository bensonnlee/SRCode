export const API_ENDPOINTS = {
  LOGIN_START: 'https://innosoftfusiongo.com/sso/login/login-start.php?id=124',
  CAS_LOGIN: 'https://auth.ucr.edu/cas/login',
  LOGIN_FINISH: 'https://innosoftfusiongo.com/sso/login/login-finish.php',
  BARCODE: 'https://innosoftfusiongo.com/sso/api/barcode.php?id=124',
} as const;

export const STORAGE_KEYS = {
  CREDENTIALS: 'user_credentials',
  FUSION_TOKEN: 'fusion_token',
  TOKEN_EXPIRY: 'token_expiry',
} as const;

export const TIMING = {
  BARCODE_REFRESH_INTERVAL: 12000, // 12 seconds
  API_TIMEOUT: 30000, // 30 seconds
} as const;

export const APP_CONFIG = {
  FUSION_ID: '124',
} as const;
