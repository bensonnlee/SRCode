export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface RequestConfig {
  timeout?: number;
  headers?: Record<string, string>;
}
