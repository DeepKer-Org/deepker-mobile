import {NotificationProvider} from "@/context/NotificationContext";
import * as Notifications from 'expo-notifications';
import {SessionProvider} from "@/context/AuthSessionContext";
import {Slot} from "expo-router";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function Root() {
    return (
        <NotificationProvider>
            <SessionProvider>
                <Slot/>
            </SessionProvider>
        </NotificationProvider>
    )
}