import {DoctorResponse} from "@/types/doctor";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const fetchDoctor = async (doctorId: string, token: string): Promise<DoctorResponse> => {
    const res = await fetch(`${API_BASE_URL}/doctors/${doctorId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch doctor');
    }

    return res.json();
};

export const fetchDoctorByUserId = async (userId: string, token: string): Promise<DoctorResponse> => {
    const res = await fetch(`${API_BASE_URL}/doctors/userID/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch doctor');
    }

    return res.json();
};