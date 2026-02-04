import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useAuth } from '@/lib/modules/auth/AuthProvider';
import { authService } from '@/lib/modules/auth/auth.service';

type Profile = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
};

export default function ProfileScreen() {
  const { session } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    if (!session?.user.id) return;

    try {
      const data = await authService.getProfile(session.user.id);
      setProfile(data);
    } catch (error) {
      console.error('Error cargando perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-dracula-bg justify-center items-center">
        <ActivityIndicator size="large" color="#bd93f9" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-dracula-bg">
      <View className="p-6">
        <View className="items-center mb-8">
          <View className="w-24 h-24 rounded-full bg-dracula-purple justify-center items-center mb-4">
            <Text className="text-4xl font-bold text-dracula-fg">
              {profile?.first_name?.[0]?.toUpperCase() || '?'}
            </Text>
          </View>
          <Text className="text-2xl font-bold text-dracula-fg mb-1">
            {profile?.first_name} {profile?.last_name}
          </Text>
          <Text className="text-base text-dracula-comment">
            {profile?.email}
          </Text>
        </View>

        <View className="bg-dracula-selection p-4 rounded-xl mb-4 border border-dracula-selection">
          <Text className="text-lg font-bold text-dracula-purple mb-4">
            Información del Usuario
          </Text>
          
          <View className="mb-2">
            <Text className="text-xs text-dracula-comment mb-1">
              ID de Usuario:
            </Text>
            <Text className="text-sm text-dracula-fg">
              {session?.user.id}
            </Text>
          </View>

          <View className="mb-2">
            <Text className="text-xs text-dracula-comment mb-1">
              Email:
            </Text>
            <Text className="text-sm text-dracula-fg">
              {profile?.email}
            </Text>
          </View>

          <View className="mb-2">
            <Text className="text-xs text-dracula-comment mb-1">
              Nombre:
            </Text>
            <Text className="text-sm text-dracula-fg">
              {profile?.first_name} {profile?.last_name}
            </Text>
          </View>
        </View>

        <View className="bg-dracula-selection p-4 rounded-xl mb-4 border border-dracula-selection">
          <Text className="text-lg font-bold text-dracula-purple mb-4">
            🔔 Notificaciones
          </Text>
          <Text className="text-sm text-dracula-fg leading-5">
            Tu dispositivo está configurado para recibir notificaciones push.
            Los administradores pueden enviarte alertas importantes.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}