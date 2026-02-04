import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { theme } from '../../lib/core/constants/theme';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
};

export const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  loading = false,
  disabled = false 
}: ButtonProps) => {
  const baseClasses = "py-4 px-6 rounded-xl items-center justify-center min-h-[48px]";
  
  const variantClasses = {
    primary: "bg-dracula-purple",
    secondary: "bg-dracula-selection border border-dracula-purple",
    ghost: "bg-transparent"
  };

  const textClasses = {
    primary: "text-dracula-fg font-semibold text-base",
    secondary: "text-dracula-purple font-semibold text-base",
    ghost: "text-dracula-purple font-semibold text-base"
  };

  return (
    <TouchableOpacity
      className={`${baseClasses} ${variantClasses[variant]} ${(disabled || loading) ? 'opacity-50' : ''}`}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? theme.colors.foreground : theme.colors.purple} />
      ) : (
        <Text className={textClasses[variant]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};