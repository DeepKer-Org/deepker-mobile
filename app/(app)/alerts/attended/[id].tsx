import {ActivityIndicator, StyleSheet, Text, View, Alert as RNAlert} from "react-native";
import React, {useEffect, useState} from "react";
import {router, Stack, useLocalSearchParams} from "expo-router";
import Button from "@/components/ui/Button";
import {Theme} from "@/constants/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {Platform} from "react-native";
import {datetimeFormat} from "@/utils/datetimeFormat";
import {Alert, AlertMarkAttendanceRequest, AlertResponse} from "@/types/alert";
import {fetchAlert, updateAlert} from "@/services/alerts";
import {adjustPrecision} from "@/utils/adjustPrecision";
import {useSession} from "@/context/AuthSessionContext";
import { commonStyles } from "@/styles/commonStyles";

export default function AttendedDetails() {
    const {id} = useLocalSearchParams<{ id: string }>();
    const [alert, setAlert] = useState<Alert | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {session, doctorId} = useSession();
    const handleLiberate = () => {
        RNAlert.alert(
            "Confirmar liberación",
            "¿Deseas liberar la alerta?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Liberar", onPress: () => { liberateAlert(); router.back(); } }
            ]
        );
    };

    const liberateAlert = async () => {
        const alertLiberateRequest: AlertMarkAttendanceRequest = {
            attended_by_id: null,
            attended_timestamp: null,
        };

        try {
            await updateAlert(id, alertLiberateRequest, session!);
        } catch (err) {
            setError("Failed to liberate alert.");
        }
    };

    useEffect(() => {
        const loadAlert = async () => {
            setLoading(true);
            setError(null);
            try {
                const alertData: AlertResponse = await fetchAlert(id as string, session!);
                setAlert(alertData.alert);
            } catch (err) {
                setError("Failed to fetch alert details.");
            } finally {
                setLoading(false);
            }
        };
        loadAlert();
    }, [id]);

    const {formattedDate: alertDate, formattedTime: alertTime} = datetimeFormat(alert?.alert_timestamp || "");
    const {formattedTime: attendedTime} = datetimeFormat(alert?.attended_timestamp || "");

    if (loading) {
        return (
            <View style={commonStyles.background}>
                <ActivityIndicator size="large" color={Theme.colors.black}/>
            </View>
        );
    }

    if (error) {
        return (
            <View style={commonStyles.background}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }


    if (!alert) {
        return null; // Or render a fallback message if alert is unexpectedly null
    }

    return (
        <View style={commonStyles.background}>
            <Stack.Screen
                options={{
                    headerTitle: "",
                    headerTintColor: Theme.colors.black,
                    headerBackTitle: "Regresar",
                    headerBackTitleStyle: {
                        fontFamily: Theme.fonts.regular,
                        fontSize: 20,
                    },
                }}
            />
            <View style={styles.container}>
                <View>
                    <View style={styles.alertHeader}>
                        <MaterialIcons
                            name="check-circle"
                            size={120}
                            color={Theme.colors.green}
                        />
                        <Text style={[styles.h1, {color: Theme.colors.green}]}>ALERTA RESUELTA</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.p}>
                            <Text style={styles.highlight}>Paciente: </Text>
                            {alert.patient.name}
                        </Text>
                        <Text style={styles.p}>
                            <Text style={styles.highlight}>Fecha: </Text>
                            {alertDate}
                        </Text>
                        <Text style={styles.p}>
                            <Text style={styles.highlight}>Hora de Alarma: </Text>
                            {alertTime}
                        </Text>
                        <Text
                            style={[styles.p, styles.highlight, {marginTop: Theme.margin.horizontal}]}
                        >
                            Diagnóstico:
                        </Text>
                        <View style={styles.bulletContainer}>
                            <Text style={styles.p}>
                                <Text style={styles.highlight}>
                                    • {alert.final_diagnosis !== "" ? alert.final_diagnosis : alert.computer_diagnostic.diagnosis}
                                </Text>{" "}
                                {
                                    alert.final_diagnosis !== "" ? "confirmado por médico" : (adjustPrecision(alert.computer_diagnostic.percentage) + "% confirmado por DeepKer")
                                }
                            </Text>
                        </View>

                        <Text
                            style={[styles.p, styles.highlight, {marginTop: Theme.margin.horizontal}]}
                        >
                            Atendido por:
                        </Text>
                        <View style={styles.bulletContainer}>
                            <Text style={styles.p}>
                                • {alert.attended_by.name}
                            </Text>
                        </View>
                        <Text style={[styles.p, {marginTop: Theme.margin.horizontal}]}>
                            <Text style={styles.highlight}>Hora de atención: </Text>
                            {attendedTime}
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    {doctorId === alert.attended_by.doctor_id && (
                        <Button onPress={handleLiberate} backgroundColor="warning" text={"LIBERAR"}/>
                    )}
                    <Button onPress={() => router.back()} text={"ACEPTAR"}/>
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
        paddingHorizontal: Theme.padding.horizontal,
        paddingVertical:
            Platform.OS === "ios"
                ? Theme.padding.vertical * 1.6
                : Theme.padding.vertical * 1.2,
    },
    ...commonStyles
});
