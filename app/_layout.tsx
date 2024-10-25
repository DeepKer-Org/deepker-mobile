import {Stack} from 'expo-router/stack';
import React from 'react'
import {NotificationProvider} from "@/context/NotificationContext";

import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function Layout() {
    return (
        <NotificationProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            </Stack>
        </NotificationProvider>
    )
}