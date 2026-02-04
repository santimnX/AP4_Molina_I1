import "../../global.css";
import { usePushNotifications } from "@/lib/core/notifications/usePushNotifications";
import { AuthProvider, useAuth } from "@/lib/modules/auth/AuthProvider";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

/**
 * Auth Layout - Layout interno que tiene acceso al contexto de Auth
 * 
 * Aquí integramos el hook de notificaciones para que se ejecute
 * automáticamente cuando el usuario inicia sesión
 */
function AuthLayout() {
  const { session } = useAuth();
  const userId = session?.user.id;
  
  // 🔔 Hook de notificaciones - Se ejecuta cuando userId cambia
  usePushNotifications(userId);
  
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#282a36',
          },
          headerTintColor: '#f8f8f2',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </>
  );
}

/**
 * Root Layout - Layout raíz que provee el contexto de autenticación
 */
export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthLayout />
    </AuthProvider>
  );
}