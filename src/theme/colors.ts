export const colors = {
  primary: {
    blue: '#003DA5',
    blueDark: '#002D7A',
    blueLight: '#1A5BC4',
    gold: '#FFB81C',
    goldLight: '#FFCA4D',
    lightBlue: '#87CEEB',
    rose: '#FF007F',
  },
  neutral: {
    white: '#FFFFFF',
    gray100: '#F5F5F5',
    gray200: '#E0E0E0',
    gray500: '#9E9E9E',
    gray600: '#757575',
    gray800: '#424242',
    black: '#000000',
  },
  semantic: {
    success: '#4CAF50',
    error: '#F44336',
    errorLight: '#FFEBEE',
    warning: '#FF9800',
  },
} as const;

export type Colors = typeof colors;
