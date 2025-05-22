import InfoElement from "@/components/account/InfoElement";
import Button from "@/components/ui/Button";
import {Theme} from "@/constants/theme";
import {View, Text, StyleSheet, ActivityIndicator} from "react-native";
import {useEffect, useState} from "react";
import {Doctor} from "@/types/doctor";
import {fetchDoctor} from "@/services/doctors";
import {SafeAreaView} from "react-native-safe-area-context";
import {useSession} from "@/context/AuthSessionContext";
import { commonStyles } from "@/styles/commonStyles";

export default function Tab() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [accountData, setAccountData] = useState<Doctor | null>(null);
    const { signOut, session, doctorId } = useSession();

    const handleSignOut = () => {
        signOut();
    };

    useEffect(() => {
        // Fetch account data
        const fetchAccountData = async () => {
            setLoading(true); // Start loading
            setError(null); // Clear any existing error before fetching
            try {
                const response = await fetchDoctor(doctorId!, session!);
                setAccountData(response.doctor);
            } catch {
                setError("Failed to fetch account data");
            } finally {
                setLoading(false); // Stop loading after fetch completes
            }
        };
        fetchAccountData()
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={styles.background}>
                <ActivityIndicator size="large" color={Theme.colors.black}/>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.background}>
                <View style={styles.container}>
                    <Text style={styles.errorText}>Error: {error}</Text>
                    <View>
                        <Button text={"CERRAR SESIÓN"} onPress={handleSignOut}/>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.h2}>Cuenta</Text>
                    <View style={styles.userContainer}>
                        <Text style={[styles.p, styles.highlight]}>Usuario</Text>
                        <InfoElement label={"Nombre"} value={accountData?.name || "N/A"}/>
                        <InfoElement label={"DNI"} value={accountData?.dni || "N/A"}/>
                        <InfoElement label={"Especialidad"} lastElement value={accountData?.specialization || "N/A"}/>
                    </View>
                    <View style={styles.systemContainer}>
                        <Text style={[styles.p, styles.highlight]}>Aplicación</Text>
                        <InfoElement label={"Nombre del Sistema"} value={"DeepKer"}/>
                        <InfoElement label={"Versión"} value={"1.0.0"} lastElement/>
                    </View>
                </View>
                <View>
                    <Button text={"CERRAR SESIÓN"} onPress={handleSignOut}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        marginHorizontal: Theme.margin.horizontal,
        paddingVertical: Theme.padding.vertical
    },
    userContainer: {
        marginVertical: Theme.margin.vertical,
    },
    systemContainer: {
        marginVertical: Theme.margin.vertical * 1.5,
    },
    ...commonStyles
});
