import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export const Input = ({ label, error, style, ...props }: InputProps) => {
  return (
    <View className="mb-4">
      {label && <Text className="text-sm font-semibold text-dracula-fg mb-2">{label}</Text>}
      <TextInput
        className={`bg-dracula-selection border rounded-xl px-4 py-4 text-base text-dracula-fg min-h-[48px] ${
          error ? 'border-dracula-red' : 'border-[#44475a]'
        }`}
        placeholderTextColor="#6272a4"
        {...props}
      />
      {error && <Text className="text-dracula-red text-xs mt-1">{error}</Text>}
    </View>
  );
};