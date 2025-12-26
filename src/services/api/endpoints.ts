import { API_ENDPOINTS, APP_CONFIG } from '@utils/constants';

export const endpoints = {
  getLoginStartUrl: () => API_ENDPOINTS.LOGIN_START,

  getCasLoginUrl: (serviceUrl: string) =>
    `${API_ENDPOINTS.CAS_LOGIN}?service=${encodeURIComponent(serviceUrl)}`,

  getLoginFinishUrl: () => API_ENDPOINTS.LOGIN_FINISH,

  getBarcodeUrl: () => API_ENDPOINTS.BARCODE,

  getFusionId: () => APP_CONFIG.FUSION_ID,
} as const;
