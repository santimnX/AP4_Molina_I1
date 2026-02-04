import { Redirect } from 'expo-router';
import { useAuth } from '@/lib/modules/auth/AuthProvider';
import { View, ActivityIndicator } from 'react-native';

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
    return <Redirect href="/(tabs)/feed" />;
  }

  return <Redirect href="/(auth)/login" />;
}