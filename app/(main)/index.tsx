import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarcodeDisplay } from '@components/barcode/BarcodeDisplay';
import { Button } from '@components/ui/Button';
import { Card } from '@components/ui/Card';
import { colors } from '@theme/colors';
import { typography } from '@theme/typography';
import { spacing } from '@theme/spacing';

export default function BarcodeScreen() {
  // TODO: Use real barcode data from useBarcode hook in Phase 3
  const mockBarcodeId = null;
  const timeUntilRefresh = 12;
  const isLoading = false;

  const handleRefresh = () => {
    // TODO: Implement refresh in Phase 3
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <Card style={styles.barcodeCard}>
          <BarcodeDisplay value={mockBarcodeId ?? ''} showValue />

          <View style={styles.timerContainer}>
            <Text style={styles.timerLabel}>Refreshing in</Text>
            <Text style={styles.timerValue}>{timeUntilRefresh}s</Text>
          </View>
        </Card>

        <Button
          title="Refresh Now"
          variant="outline"
          onPress={handleRefresh}
          isLoading={isLoading}
          style={styles.refreshButton}
        />

        <Text style={styles.hint}>
          Hold your phone up to the scanner with the barcode visible
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.gray100,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  barcodeCard: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  timerLabel: {
    fontSize: typography.fontSize.base,
    color: colors.neutral.gray500,
  },
  timerValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.navy,
    marginLeft: spacing.sm,
  },
  refreshButton: {
    marginTop: spacing.lg,
  },
  hint: {
    textAlign: 'center',
    color: colors.neutral.gray500,
    fontSize: typography.fontSize.sm,
    marginTop: spacing.xl,
  },
});
