import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import React from "react";
import { useSession } from "@/context/AuthSessionContext";
import * as SplashScreen from "expo-splash-screen";

export default function AppLayout() {
    const { session, isLoading } = useSession();

    // Keep the splash screen visible while loading
    useEffect(() => {
        const prepare = async () => {
            await SplashScreen.preventAutoHideAsync();
        };
        prepare();
    }, []);

    // Hide the splash screen once loading is complete
    useEffect(() => {
        if (!isLoading) {
            SplashScreen.hideAsync();
        }
    }, [isLoading]);

    // Redirect to login if not authenticated
    if (!session && !isLoading) {
        return <Redirect href="/login" />;
    }

    // Render the main stack if authenticated
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}