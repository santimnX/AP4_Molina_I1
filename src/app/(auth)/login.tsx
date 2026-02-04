import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { authService } from '@/src/lib/modules/auth/auth.service';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      await authService.signIn(email, password);
      // El AuthProvider se encargará de actualizar la sesión automáticamente
      router.replace('/(tabs)/feed');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-dracula-bg">
      <View className="flex-1 p-6 justify-center min-h-[600px]">
        <Text className="text-3xl font-bold text-dracula-purple text-center mb-2">
          PushMaster
        </Text>
        <Text className="text-base text-dracula-comment text-center mb-8">
          Bienvenido de vuelta
        </Text>

        <View className="mt-6">
          <Input
            label="Email"
            placeholder="tu@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Contraseña"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button
            title="Iniciar Sesión"
            onPress={handleLogin}
            loading={loading}
          />

          <Button
            title="Crear Cuenta"
            onPress={() => router.push('/(auth)/register')}
            variant="ghost"
          />
        </View>
      </View>
    </ScrollView>
  );
}