import React, { createContext, useContext } from 'react';
import { colors, type Colors } from '@theme/colors';
import { typography, type Typography } from '@theme/typography';
import { spacing, borderRadius, type Spacing, type BorderRadius } from '@theme/spacing';

export interface Theme {
  colors: Colors;
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
}

const theme: Theme = {
  colors,
  typography,
  spacing,
  borderRadius,
};

const ThemeContext = createContext<Theme>(theme);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
