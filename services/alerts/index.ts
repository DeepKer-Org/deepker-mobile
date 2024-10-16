// services/alertsService.ts
import {AlertMarkAttendanceRequest, AlertResponse, AlertsResponse} from "@/types/alert";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const fetchAlerts = async (): Promise<AlertsResponse> => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Fetch today alerts
    const response = await fetch(
        `${API_BASE_URL}/alerts?timezone=${encodeURIComponent(timeZone)}`, // Fetch today alerts
        {
            method: "GET",
            headers: {
                "X-App-Origin": "ReactNativeApp",
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch alerts");
    }

    const data = await response.json();
    return {
        alerts: data.alerts,
        totalCount: data.totalCount,
    };
};

export const fetchAlert = async (alertId: string): Promise<AlertResponse> => {
    const res = await fetch(`${API_BASE_URL}/alerts/${alertId}`, {
        method: 'GET', headers: {
            "X-App-Origin": "ReactNativeApp",
            'Content-Type': 'application/json',
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch alert');
    }

    return res.json();
};

export const updateAlert = async (alertId: string, data: AlertMarkAttendanceRequest): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/alerts/${alertId}`, {
        method: 'PATCH',
        headers: {
            "X-App-Origin": "ReactNativeApp",
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Failed to update alert');
    }
}