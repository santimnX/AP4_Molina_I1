import { useAuth } from '@/src/lib/modules/auth/AuthProvider';
import { Redirect, Href } from 'expo-router'; // 1. Importa Href
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 bg-dracula-bg justify-center items-center">
        <ActivityIndicator size="large" color="#bd93f9" />
      </View>
    );
  }

  if (session) {
    // 2. Fuerza el tipo con "as Href"
    return <Redirect href={"/feed" as Href} />;
  }

  // 3. Fuerza el tipo aquí también
  return <Redirect href={"/login" as Href} />;
}