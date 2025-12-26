import { Stack } from 'expo-router';
import { colors } from '@theme/colors';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.neutral.white },
      }}
    />
  );
}
