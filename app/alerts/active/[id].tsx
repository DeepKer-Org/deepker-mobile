import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import Button from "@/components/ui/Button";
import { Theme } from "@/constants/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Platform } from "react-native";
import { adjustPrecision } from "@/utils/adjustPrecision";

export default function ActiveDetails() {
  const { id } = useLocalSearchParams();

  // TODO: Fetch alert from API
  const alert = {
    alertId: "1",
    patient: {
      name: "Alejandro Ruiz Perez",
      dni: "77777777",
      location: "112A",
    },
    timestamp: "2021-09-01T12:00:00Z",
    alertStatus: "unattended",
    alertTimestamp: "2024-09-08T12:34:56Z",
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
              name="crisis-alert"
              size={Theme.size.xl * 3.8}
              color={Theme.colors.red}
            />
            <Text style={styles.h1}>ALERTA CRÍTICA</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              <Text style={styles.highlight}>Paciente: </Text>
              {alert.patient.name}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.highlight}>Lugar: </Text>
              {alert.patient.location}
            </Text>
            <View style={styles.bulletContainer}>
              <Text style={styles.infoText}>
                <Text style={styles.highlight}>• Frecuencia cardíaca: </Text>
                {alert.biometrics.heartRate} ppm
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.highlight}>• Presión arterial: </Text>
                {alert.biometrics.systolicBloodPressure}/
                {alert.biometrics.diastolicBloodPressure} mmHg
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.highlight}>• Saturación de O2: </Text>
                {alert.biometrics.O2Saturation}%
              </Text>
            </View>

            <Text
              style={[styles.highlight, { marginTop: Theme.margin.horizontal }]}
            >
              Diagnósticos de DeepKer:
            </Text>
            <View style={styles.bulletContainer}>
              {alert.computerDiagnoses.map((diagnosis, index) => (
                <Text key={index} style={styles.infoText}>
                  <Text style={styles.highlight}>• </Text>
                  <Text style={styles.highlight}>{diagnosis.name}: </Text>{" "}
                  {adjustPrecision(diagnosis.precision)}%
                </Text>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={function (event: GestureResponderEvent): void {
              throw new Error("Function not implemented.");
            }}
            primary
            text={"ATENDER"}
          />
          <Button onPress={() => router.back()} text={"DECLINAR"} />
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
        ? Theme.padding.vertical * 1.5
        : Theme.padding.vertical * 1.25,
  },
  buttonContainer: {
    rowGap: Theme.margin.vertical * 1.5,
  },
  alertHeader: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Theme.padding.vertical,
  },
  h1: {
    fontFamily: Theme.fonts.medium,
    color: Theme.colors.red,
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
