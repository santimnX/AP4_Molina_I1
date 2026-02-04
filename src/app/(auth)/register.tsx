import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { authService } from '@/src/lib/modules/auth/auth.service';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !firstName) {
      Alert.alert('Error', 'Por favor completa los campos requeridos');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      await authService.signUp(email, password, firstName, lastName);
      Alert.alert(
        'Éxito',
        'Cuenta creada. Revisa tu email para confirmar tu registro.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(auth)/login'),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-dracula-bg">
      <View className="flex-1 p-6 justify-center min-h-[700px]">
        <Text className="text-3xl font-bold text-dracula-purple text-center mb-2">
          Crear Cuenta
        </Text>
        <Text className="text-base text-dracula-comment text-center mb-8">
          Únete a PushMaster
        </Text>

        <View className="mt-6">
          <Input
            label="Nombre *"
            placeholder="Juan"
            value={firstName}
            onChangeText={setFirstName}
          />

          <Input
            label="Apellido"
            placeholder="Pérez"
            value={lastName}
            onChangeText={setLastName}
          />

          <Input
            label="Email *"
            placeholder="tu@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Contraseña *"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button
            title="Registrarse"
            onPress={handleRegister}
            loading={loading}
          />

          <Button
            title="Ya tengo cuenta"
            onPress={() => router.back()}
            variant="ghost"
          />
        </View>
      </View>
    </ScrollView>
  );
}