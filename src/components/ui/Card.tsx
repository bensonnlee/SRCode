import React from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { colors } from '@theme/colors';
import { spacing, borderRadius } from '@theme/spacing';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: keyof typeof spacing;
  style?: StyleProp<ViewStyle>;
}

export function Card({
  children,
  variant = 'elevated',
  padding = 'md',
  style,
}: CardProps) {
  return (
    <View
      style={[
        styles.base,
        styles[variant],
        { padding: spacing[padding] },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.lg,
    backgroundColor: colors.neutral.white,
  },
  elevated: {
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.neutral.gray200,
  },
  filled: {
    backgroundColor: colors.neutral.gray100,
  },
});
