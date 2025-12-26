import React from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Button } from '@components/ui/Button';
import { Card } from '@components/ui/Card';
import { Switch } from '@components/ui/Switch';
import { useAuth } from '@hooks/useAuth';
import { useSettings } from '@context/SettingsContext';
import { colors } from '@theme/colors';
import { typography } from '@theme/typography';
import { spacing } from '@theme/spacing';

export default function SettingsScreen() {
  const auth = useAuth();
  const settings = useSettings();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await auth.logout();
          await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
          );
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Username</Text>
            <Text style={styles.infoValue}>
              {auth.user?.username ?? 'Not logged in'}
            </Text>
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Display</Text>
          <Switch
            label="Keep Screen Bright"
            value={settings.keepScreenBright}
            onValueChange={settings.setKeepScreenBright}
          />
          <Text style={styles.settingHint}>
            Prevents screen from dimming while viewing barcode
          </Text>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Barcode</Text>
          <Switch
            label="Auto-Refresh"
            value={settings.autoRefresh}
            onValueChange={settings.setAutoRefresh}
          />
          <Text style={styles.settingHint}>
            Automatically refresh barcode every 12 seconds
          </Text>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
        </Card>

        <Button
          title="Log Out"
          variant="outline"
          onPress={handleLogout}
          style={styles.logoutButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.gray100,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing['3xl'],
  },
  card: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral.gray800,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  infoLabel: {
    fontSize: typography.fontSize.base,
    color: colors.neutral.gray500,
  },
  infoValue: {
    fontSize: typography.fontSize.base,
    color: colors.neutral.gray800,
  },
  settingHint: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral.gray500,
    marginTop: spacing.sm,
  },
  logoutButton: {
    marginTop: spacing.lg,
  },
});
