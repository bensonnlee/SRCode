import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Barcode from 'react-native-barcode-svg';
import { colors } from '@theme/colors';
import { typography } from '@theme/typography';
import { spacing } from '@theme/spacing';
import type { BarcodeDisplayProps } from '@apptypes/barcode';

export function BarcodeDisplay({
  value,
  width,
  height = 120,
  showValue = true,
}: BarcodeDisplayProps) {
  const { width: screenWidth } = useWindowDimensions();
  const barcodeMaxWidth = width ?? screenWidth - spacing.lg * 2;

  if (!value) {
    return (
      <View style={[styles.container, styles.placeholder]}>
        <Text style={styles.placeholderText}>No barcode available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.barcodeWrapper}>
        <Barcode
          value={value}
          format="CODE128"
          maxWidth={barcodeMaxWidth}
          height={height}
          lineColor={colors.neutral.black}
          backgroundColor={colors.neutral.white}
        />
      </View>
      {showValue && <Text style={styles.valueText}>{value}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.neutral.white,
    padding: spacing.md,
    borderRadius: 8,
  },
  barcodeWrapper: {
    backgroundColor: colors.neutral.white,
    padding: spacing.sm,
  },
  placeholder: {
    height: 150,
    justifyContent: 'center',
  },
  placeholderText: {
    color: colors.neutral.gray500,
    fontSize: typography.fontSize.base,
  },
  valueText: {
    marginTop: spacing.sm,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
    color: colors.neutral.gray800,
    letterSpacing: 2,
  },
});
