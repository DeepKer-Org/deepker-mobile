import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import {Platform} from "react-native";
import Constants from "expo-constants";
import {createPhone} from "@/services/phones";

export async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#da000e',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('No se pudo obtener permisos para las notificaciones.');
            return;
        }

        const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ??
            Constants?.easConfig?.projectId;
        if (!projectId) {
            alert('No se pudo obtener el projectId.');
            return;
        }

        try {
            const pushTokenString = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;
            // Save the token to the server
            await createPhone(pushTokenString);
        } catch (e: unknown) {
            console.error(`Error al obtener o guardar el token de notificaciones: ${e}`);
            alert('Error al registrar el dispositivo para notificaciones.');
        }
    } else {
        throw new Error('No se puede obtener el token de notificaciones en un simulador.');
    }
}