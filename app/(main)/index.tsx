import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import * as Brightness from 'expo-brightness';
import { BarcodeDisplay } from '@components/barcode/BarcodeDisplay';
import { Button } from '@components/ui/Button';
import { Card } from '@components/ui/Card';
import { useAuth } from '@hooks/useAuth';
import { useBarcode } from '@hooks/useBarcode';
import { useSettings } from '@context/SettingsContext';
import { colors } from '@theme/colors';
import { typography } from '@theme/typography';
import { spacing } from '@theme/spacing';

export default function BarcodeScreen() {
  const auth = useAuth();
  const settings = useSettings();
  const originalBrightnessRef = useRef<number | null>(null);

  const { barcodeId, isLoading, error, timeUntilRefresh, refresh } = useBarcode(
    auth.fusionToken,
    undefined,
    settings.autoRefresh
  );

  // Handle screen brightness
  useEffect(() => {
    const manageBrightness = async () => {
      if (settings.keepScreenBright) {
        // Store original brightness
        const current = await Brightness.getBrightnessAsync();
        originalBrightnessRef.current = current;
        // Set to maximum brightness
        await Brightness.setBrightnessAsync(1);
      } else if (originalBrightnessRef.current !== null) {
        // Restore original brightness
        await Brightness.setBrightnessAsync(originalBrightnessRef.current);
        originalBrightnessRef.current = null;
      }
    };

    manageBrightness();

    return () => {
      // Restore brightness on unmount
      if (originalBrightnessRef.current !== null) {
        Brightness.setBrightnessAsync(originalBrightnessRef.current);
      }
    };
  }, [settings.keepScreenBright]);

  const handleRefresh = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

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
          <BarcodeDisplay
            value={barcodeId ?? ''}
            showValue
            isLoading={isLoading && !barcodeId}
          />

          {settings.autoRefresh && (
            <View
              style={styles.timerContainer}
              accessible={true}
              accessibilityLabel={`Refreshing in ${timeUntilRefresh} seconds`}
              accessibilityLiveRegion="polite"
            >
              <Text style={styles.timerLabel}>Refreshing in</Text>
              <Text style={styles.timerValue}>{timeUntilRefresh}s</Text>
            </View>
          )}
        </Card>

        {error && (
          <Text
            style={styles.errorText}
            accessibilityRole="alert"
            accessibilityLiveRegion="assertive"
          >
            {error}
          </Text>
        )}

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
