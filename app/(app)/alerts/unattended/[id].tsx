import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import Button from "@/components/ui/Button";
import { Theme } from "@/constants/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Platform } from "react-native";
import { adjustPrecision } from "@/utils/adjustPrecision";
import {Alert, AlertMarkAttendanceRequest, AlertResponse} from "@/types/alert";
import {fetchAlert, updateAlert} from "@/services/alerts";
import {useSession} from "@/context/AuthSessionContext";
import { commonStyles } from "@/styles/commonStyles";

export default function UnattendedDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [alert, setAlert] = useState<Alert | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {session, doctorId} = useSession();

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

  const handleMarkAttendance = async () => {
    const alertMarkAttendanceRequest: AlertMarkAttendanceRequest = {
      attended_by_id: doctorId!,
      attended_timestamp: new Date().toISOString(),
    };
    try {
      await updateAlert(id, alertMarkAttendanceRequest, session!);
      router.push({ pathname: "/" });
    } catch {
    }
  }

  if (loading) {
    return (
        <View style={styles.background}>
          <ActivityIndicator size="large" color={Theme.colors.black} />
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
            fontSize: 20,
          },
        }}
      />
      <View style={styles.container}>
        <View>
          <View style={styles.alertHeader}>
            <MaterialIcons
              name="crisis-alert"
              size={120}
              color={Theme.colors.red}
            />
            <Text style={[styles.h1, {color: Theme.colors.red}]}>ALERTA CRÍTICA</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.p}>
              <Text style={styles.highlight}>Paciente: </Text>
              {alert.patient.name}
            </Text>
            <Text style={styles.p}>
              <Text style={styles.highlight}>Lugar: </Text>
              {alert.patient.location}
            </Text>
            <Text
              style={[styles.p, styles.highlight, { marginTop: Theme.margin.horizontal }]}
            >
              Datos biométricos de la alerta:
            </Text>
            <View style={styles.bulletContainer}>
              <Text style={styles.p}>
                <Text style={styles.highlight}>• Frecuencia cardíaca: </Text>
                {alert.biometric_data.heart_rate} bpm
              </Text>
              <Text style={styles.p}>
                <Text style={styles.highlight}>• Saturación de O2: </Text>
                {alert.biometric_data.o2_saturation}%
              </Text>
            </View>

            <Text
              style={[styles.p, styles.highlight, { marginTop: Theme.margin.horizontal }]}
            >
              Diagnósticos de DeepKer:
            </Text>
            <View style={styles.bulletContainer}>
                <Text style={styles.p}>
                  <Text style={styles.highlight}>• </Text>
                  <Text style={styles.highlight}>{alert.computer_diagnostic.diagnosis}: </Text>{" "}
                  {adjustPrecision(alert.computer_diagnostic.percentage)}%
                </Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={handleMarkAttendance}
            primary
            text={"ATENDER"}
          />
          <Button onPress={() => router.back()} text={"CANCELAR"} />
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
        ? Theme.padding.vertical * 1.5
        : Theme.padding.vertical * 1.25,
  },
  ...commonStyles
});
