import React from 'react';
import {
  View,
  Text,
  Switch as RNSwitch,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { colors } from '@theme/colors';
import { typography } from '@theme/typography';

export interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Switch({
  value,
  onValueChange,
  label,
  disabled = false,
  style,
}: SwitchProps) {
  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, disabled && styles.labelDisabled]}>
          {label}
        </Text>
      )}
      <RNSwitch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{
          false: colors.neutral.gray200,
          true: colors.primary.navy,
        }}
        thumbColor={value ? colors.primary.dandelion : colors.neutral.white}
        ios_backgroundColor={colors.neutral.gray200}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: typography.fontSize.base,
    color: colors.neutral.gray800,
    flex: 1,
  },
  labelDisabled: {
    color: colors.neutral.gray500,
  },
});
