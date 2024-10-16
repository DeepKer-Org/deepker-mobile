import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {router, Stack, useLocalSearchParams} from "expo-router";
import Button from "@/components/ui/Button";
import {Theme} from "@/constants/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {Platform} from "react-native";
import {datetimeFormat} from "@/utils/datetimeFormat";
import {Alert, AlertResponse} from "@/types/alert";
import {fetchAlert} from "@/services/alerts";
import {adjustPrecision} from "@/utils/adjustPrecision";

export default function AttendedDetails() {
    const {id} = useLocalSearchParams<{ id: string }>();
    const [alert, setAlert] = useState<Alert | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadAlert = async () => {
            setLoading(true);
            setError(null);
            try {
                const alertData: AlertResponse = await fetchAlert(id as string);
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
            <View style={styles.background}>
                <ActivityIndicator size="large" color={Theme.colors.black}/>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.background}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }


    if (!alert) {
        return null; // Or render a fallback message if alert is unexpectedly null
    }

    return (
        <View style={styles.background}>
            <Stack.Screen
                options={{
                    headerTitle: "",
                    headerTintColor: Theme.colors.black,
                    headerBackTitle: "Regresar",
                    headerBackTitleStyle: {
                        fontFamily: Theme.fonts.regular,
                        fontSize: Theme.size.h3,
                    },
                }}
            />
            <View style={styles.container}>
                <View>
                    <View style={styles.alertHeader}>
                        <MaterialIcons
                            name="check-circle"
                            size={Theme.size.xl * 3.8}
                            color={Theme.colors.green}
                        />
                        <Text style={styles.h1}>ALERTA RESUELTA</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>
                            <Text style={styles.highlight}>Paciente: </Text>
                            {alert.patient.name}
                        </Text>
                        <Text style={styles.infoText}>
                            <Text style={styles.highlight}>Fecha: </Text>
                            {alertDate}
                        </Text>
                        <Text style={styles.infoText}>
                            <Text style={styles.highlight}>Hora de Alarma: </Text>
                            {alertTime}
                        </Text>
                        <Text
                            style={[styles.highlight, {marginTop: Theme.margin.horizontal}]}
                        >
                            Diagnóstico Final:
                        </Text>
                        <View style={styles.bulletContainer}>
                            <Text style={styles.infoText}>
                                <Text style={styles.highlight}>
                                    • {alert.final_diagnosis !== "" ? alert.final_diagnosis : (alert.computer_diagnoses > 0 ? alert.computer_diagnoses[0].diagnosis : "En Proceso")}
                                </Text>{" "}
                                {
                                    alert.final_diagnosis !== "" ? "confirmado por médico" : (alert.computer_diagnoses > 0 ? adjustPrecision(alert.computer_diagnoses[0].percentage) : "")
                                }
                            </Text>
                        </View>

                        <Text
                            style={[styles.highlight, {marginTop: Theme.margin.horizontal}]}
                        >
                            Atendido por:
                        </Text>
                        <View style={styles.bulletContainer}>
                            <Text style={styles.infoText}>
                                • {alert.attended_by.name}
                            </Text>
                        </View>
                        <Text style={[styles.infoText, {marginTop: Theme.margin.horizontal}]}>
                            <Text style={styles.highlight}>Hora de atención: </Text>
                            {attendedTime}
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button onPress={() => router.back()} text={"ACEPTAR"}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Theme.colors.whiteBlue,
    },
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
    buttonContainer: {
        rowGap: Theme.margin.vertical,
    },
    alertHeader: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: Theme.padding.vertical,
    },
    h1: {
        fontFamily: Theme.fonts.medium,
        color: Theme.colors.green,
        fontSize: Theme.size.xl,
    },
    infoContainer: {
        paddingHorizontal: Theme.padding.horizontal,
        rowGap: Platform.OS === "ios" ? 4 : 0,
        paddingVertical: Theme.padding.vertical / 2,
    },
    infoText: {
        color: Theme.colors.black,
        fontSize: Theme.size.h3,
        fontFamily: Theme.fonts.regular,
    },
    highlight: {
        fontFamily: Theme.fonts.semibold,
        fontSize: Theme.size.h3,
    },
    bulletContainer: {
        marginLeft: Theme.margin.horizontal,
        rowGap: Platform.OS === "ios" ? 4 : 0,
    },
    errorText: {
        color: Theme.colors.red,
        fontSize: Theme.size.h3,
        textAlign: "center",
    },
});
