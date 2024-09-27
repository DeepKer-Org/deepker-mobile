import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import Button from "@/components/ui/Button";
import { Theme } from "@/constants/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Platform } from "react-native";
import { adjustPrecision } from "@/utils/adjustPrecision";
import { datetimeFormat } from "@/utils/datetimeFormat";

export default function PastDetails() {
  const { id } = useLocalSearchParams();

  // TODO: Fetch alert from API
  const alert = {
    alertId: "1",
    patient: {
      name: "Alejandro Ruiz Perez",
      dni: "77777777",
      location: "112A",
      finalDiagnosis: "Paro cardíaco",
    },
    alertStatus: "unattended",
    alertTimestamp: "2024-09-08T12:34:56Z",
    attendedTimestamp: "2024-09-08T12:45:00Z",
    attendedBy: "Dr. Juan Pérez",
    biometrics: {
      O2Saturation: 88,
      heartRate: 110,
      systolicBloodPressure: 40,
      diastolicBloodPressure: 90,
    },
    computerDiagnoses: [
      {
        name: "Paro cardíaco",
        precision: 0.9,
      },
      {
        name: "Arritmia aguda",
        precision: 0.082,
      },
      {
        name: "Infarto de miocardio",
        precision: 0.011,
      },
    ],
  };

  const { formattedDate: alertDate, formattedTime: alertTime } = datetimeFormat(alert.alertTimestamp);
  const { formattedTime: attendedTime } = datetimeFormat(alert.attendedTimestamp);

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
              style={[styles.highlight, { marginTop: Theme.margin.horizontal }]}
            >
              Diagnóstico Final:
            </Text>
            <View style={styles.bulletContainer}>
              <Text style={styles.infoText}>
                <Text style={styles.highlight}>
                  • {alert.patient.finalDiagnosis}
                </Text>{" "}
                confirmado por médico y DeepKer
              </Text>
            </View>

            <Text
              style={[styles.highlight, { marginTop: Theme.margin.horizontal }]}
            >
              Atendido por:
            </Text>
            <View style={styles.bulletContainer}>
                <Text style={styles.infoText}>
                  • {alert.attendedBy}
                </Text>
            </View>
            <Text style={[styles.infoText, { marginTop: Theme.margin.horizontal}]}>
              <Text style={styles.highlight}>Hora de atención: </Text>
              {attendedTime}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={() => router.back()} text={"ACEPTAR"} />
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
});
