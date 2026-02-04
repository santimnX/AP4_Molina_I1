import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';

/**
 * Toast Component - Notificación animada premium
 * 
 * Usa react-native-reanimated para animaciones fluidas
 * Tema: Dracula Colors con Tailwind CSS
 */
type ToastProps = {
  message: string;
  onHide: () => void;
};

export const Toast = ({ message, onHide }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onHide, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View 
      entering={FadeInUp.springify()} 
      exiting={FadeOutUp}
      className="absolute top-12 left-5 right-5 z-[100] items-center"
    >
      <View className="bg-dracula-bg p-4 rounded-xl flex-row items-center shadow-lg border border-dracula-selection">
        <View className="mr-3">
          {/* Icono de campana */}
          <View className="w-2 h-2 rounded bg-dracula-green" />
        </View>
        <Text className="text-dracula-fg font-semibold text-sm">
          {message}
        </Text>
      </View>
    </Animated.View>
  );
};