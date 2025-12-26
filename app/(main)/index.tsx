import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarcodeDisplay } from '@components/barcode/BarcodeDisplay';
import { Button } from '@components/ui/Button';
import { Card } from '@components/ui/Card';
import { useAuth } from '@hooks/useAuth';
import { useBarcode } from '@hooks/useBarcode';
import { colors } from '@theme/colors';
import { typography } from '@theme/typography';
import { spacing } from '@theme/spacing';

export default function BarcodeScreen() {
  const auth = useAuth();
  const { barcodeId, isLoading, error, timeUntilRefresh, refresh } = useBarcode(
    auth.fusionToken
  );

  const handleRefresh = async () => {
    // If there's an error, try refreshing the token first
    if (error) {
      const refreshed = await auth.refreshToken();
      if (!refreshed) {
        // Token refresh failed, let normal refresh show error
        refresh();
        return;
      }
      // Token refreshed - useBarcode will get new token via auth.fusionToken
    }
    refresh();
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <Card style={styles.barcodeCard}>
          <BarcodeDisplay value={barcodeId ?? ''} showValue />

          <View style={styles.timerContainer}>
            <Text style={styles.timerLabel}>Refreshing in</Text>
            <Text style={styles.timerValue}>{timeUntilRefresh}s</Text>
          </View>
        </Card>

        {error && <Text style={styles.errorText}>{error}</Text>}

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
  errorText: {
    color: colors.semantic.error,
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  hint: {
    textAlign: 'center',
    color: colors.neutral.gray500,
    fontSize: typography.fontSize.sm,
    marginTop: spacing.xl,
  },
});
