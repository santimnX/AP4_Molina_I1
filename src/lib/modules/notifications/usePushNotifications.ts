import { useEffect } from 'react';
import { Platform } from 'react-native';
import { supabase } from '../../core/supabase/client.supabase';
import { NotificationAdapter } from '../../core/notifications/notification.adapter';

/**
 * usePushNotifications Hook
 * 
 * Orquesta el registro de notificaciones:
 * 1. Llama al adaptador para obtener el token
 * 2. Guarda el token en Supabase
 * 3. Se ejecuta cuando el usuario hace login
 */

// 1. Setup Inicial Fuera del componente
// Esto configura los listeners una sola vez al cargar el archivo
NotificationAdapter.setup();

export const usePushNotifications = (userId?: string) => {
  // 2. Efecto Principal
  // Se ejecuta cuando el 'userId' cambia (login/logout)
  useEffect(() => {
    
    // A. Cláusula de Guardia 🛡️
    // Si no hay usuario logueado, no hacemos nada.
    if (!userId) return;

    const register = async () => {
      try {
        // B. Llamada al Adaptador 🔌
        // Todo el trabajo sucio de permisos ocurre aquí dentro
        const token = await NotificationAdapter.registerForPushNotificationsAsync();
        
        if (token) {
          console.log('✅ Token obtenido:', token);
          // C. Persistencia 💾
          // Si tenemos token, lo guardamos en la nube
          await saveTokenToDatabase(token, userId);
        } else {
          console.log('⚠️ No se pudo obtener el token de notificaciones');
        }
      } catch (error) {
        console.error('Error en registro de notificaciones:', error);
      }
    };

    register();
    
  }, [userId]); // <--- Array de dependencias: se re-ejecuta si userId cambia
};

// 3. Función Auxiliar de Supabase ⚡
async function saveTokenToDatabase(token: string, userId: string) {
  try {
    // Usamos 'upsert' (Insert or Update)
    // Si el token ya existe, actualiza el timestamp. Si no, lo crea.
    const { error } = await supabase
      .from('devices')
      .upsert({ 
        user_id: userId,
        token: token,
        platform: Platform.OS, // 'ios' o 'android'
        last_used_at: new Date().toISOString() // Importante para saber dispositivos activos
      }, { onConflict: 'token' }); 
      // ^ 'onConflict': Si el token ya existe en la DB, no dupliques, fusiona.

    if (error) {
      console.error('❌ Error guardando device:', error);
    } else {
      console.log('✅ Dispositivo registrado en Supabase');
    }
  } catch (error) {
    console.error('❌ Error en saveTokenToDatabase:', error);
  }
}