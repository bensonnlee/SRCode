import { Stack, router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@theme/colors';

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary.navy,
        },
        headerTintColor: colors.neutral.white,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'SRCode',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push('/(main)/settings')}
              accessibilityLabel="Settings"
              accessibilityRole="button"
              style={{ marginRight: 8 }}
            >
              <Ionicons name="settings-outline" size={24} color={colors.neutral.white} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
    </Stack>
  );
}
