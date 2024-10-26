import React from "react";
import { useStorageState } from "@/hooks/useStorageState";
import * as SecureStore from "expo-secure-store";
import {loginUser, changePassword as changePasswordService } from "@/services/authorization";
import {fetchDoctorByUserId} from "@/services/doctors";

type AuthContextType = {
    signIn: (username: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    changePassword: (dni: string, issuance_date: string, new_password: string) => Promise<void>;
    session?: string | null;
    uid?: string | null;
    doctorId?: string | null;
    isLoading: boolean;
};

export const AuthContext = React.createContext<AuthContextType>({
    signIn: async () => {},
    signOut: async () => {},
    changePassword: async () => {},
    uid: null,
    session: null,
    doctorId: null,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = React.useContext(AuthContext);
    if (!value) {
        throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
    return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState("session");
    const [[, uid], setUid] = useStorageState("uid");
    const [[, doctorId], setDoctorId] = useStorageState("doctorId");

    const decodeToken = (token: string) => {
        const payloadBase64 = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        return decodedPayload;
    };

    const signIn = async (username: string, password: string) => {
        try {
            // Authenticate and get token
            const { token } = await loginUser(username, password);

            // Decode JWT to get user_id
            const decodedToken = decodeToken(token);
            const userId = decodedToken.user_id;

            // Fetch doctor information using userId
            const doctorData = await fetchDoctorByUserId(userId, token);
            const doctorId = doctorData.doctor.doctor_id;

            // Store session details in SecureStore
            await SecureStore.setItemAsync("token", token);
            setSession(token);
            setUid(userId);
            setDoctorId(doctorId);
        } catch (error) {
            setSession(null);
            setUid(null);
            setDoctorId(null);
        }
    };

    const signOut = async () => {
        try {
            await SecureStore.deleteItemAsync("token");
            setSession(null);
            setUid(null);
            setDoctorId(null);
        } catch (error) {
            console.error("Sign out error", error);
        }
    };

    const changePassword = async (dni: string, issuance_date: string, new_password: string) => {
        try {
            await changePasswordService(dni, issuance_date, new_password);
        } catch (error) {
            console.error("Password change error", error);
        }
    };


    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
                changePassword,
                uid,
                session,
                doctorId,
                isLoading,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}