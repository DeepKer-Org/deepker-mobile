// @ts-ignore
import {PhoneResponse} from "@/types/phone";

// @ts-ignore
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const createPhone = async (exponent_push_token: string): Promise<PhoneResponse> => {
    const res = await fetch(`${API_BASE_URL}/phones`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({exponent_push_token}),
    });

    if (!res.ok) {
        throw new Error('Failed to create phone');
    }

    return await res.json();
}