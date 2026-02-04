import { Button } from '@/src/components/ui/Button';
import { authService } from '@/src/lib/modules/auth/auth.service';
import { useAuth } from '@/src/lib/modules/auth/AuthProvider';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function FeedScreen() {
  const { session } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authService.signOut();
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-dracula-bg">
      <View className="p-6">
        <View className="mb-6">
          <Text className="text-3xl font-bold text-dracula-fg mb-2">
            Feed
          </Text>
          <Text className="text-base text-dracula-comment">
            Bienvenido, {session?.user.email}
          </Text>
        </View>

        <View className="bg-dracula-selection p-4 rounded-xl mb-4 border border-dracula-selection">
          <Text className="text-lg font-bold text-dracula-purple mb-2">
            ✅ Sistema Configurado
          </Text>
          <Text className="text-sm text-dracula-fg leading-5">
            Tu dispositivo está registrado y listo para recibir notificaciones push.
          </Text>
        </View>

        <View className="bg-dracula-selection p-4 rounded-xl mb-4 border border-dracula-selection">
          <Text className="text-lg font-bold text-dracula-purple mb-2">
            🔔 Cómo funciona
          </Text>
          <Text className="text-sm text-dracula-fg leading-5">
            1. Tu dispositivo está registrado en Supabase{'\n'}
            2. Los triggers de base de datos pueden enviar notificaciones{'\n'}
            3. Recibirás alertas automáticamente
          </Text>
        </View>

        <View className="bg-dracula-selection p-4 rounded-xl mb-4 border border-dracula-selection">
          <Text className="text-lg font-bold text-dracula-purple mb-2">
            🧪 Prueba el Sistema
          </Text>
          <Text className="text-sm text-dracula-fg leading-5">
            Para probar, ejecuta en el SQL Editor de Supabase:{'\n\n'}
            SELECT send_push_notification({'\n'}
            {'  '}'{session?.user.id}',{'\n'}
            {'  '}'¡Hola!',{'\n'}
            {'  '}'Tu primera notificación push'{'\n'}
            );
          </Text>
        </View>

        <Button
          title="Cerrar Sesión"
          onPress={handleLogout}
          variant="secondary"
        />
      </View>
    </ScrollView>
  );
}