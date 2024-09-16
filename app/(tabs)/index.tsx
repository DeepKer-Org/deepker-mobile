import AlertCardList from "@/components/alerts/AlertCardList";
import { Theme } from "@/constants/theme";
import { Alert } from "@/types/alert";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tab() {
  // TODO: Fetch alerts from API
  const alerts: Alert[] = [
    {
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
    },
    {
      alertId: "2",
      patient: {
        name: "Maria Garcia",
        dni: "77777777",
        location: "112A",
      },
      timestamp: "2021-09-01T12:00:00Z",
      alertStatus: "attended",
      alertTimestamp: "2024-09-08T12:34:56Z",
      attendedBy: "Dr. Juan Perez",
      attendedTimestamp: "2024-09-08T12:34:56Z",
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
    },
    {
      alertId: "3",
      patient: {
        name: "Juan Perez",
        dni: "77777777",
        location: "112A",
      },
      timestamp: "2021-09-01T12:00:00Z",
      alertStatus: "attended",
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
    },
  ];
  
  const { activeAlerts, pastAlerts } = alerts.reduce(
    (acc, alert) => {
      if (alert.alertStatus === "unattended") {
        acc.activeAlerts.push(alert);
      } else {
        acc.pastAlerts.push(alert);
      }
      return acc;
    },
    { activeAlerts: [] as typeof alerts, pastAlerts: [] as typeof alerts }
  );

  return (
    <SafeAreaView style={styles.background} edges={[]}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.h1}>Alertas Activas</Text>
          <AlertCardList alerts={activeAlerts} active />
          <Text style={[styles.h1, styles.marginTop]}>
            Últimas Alertas de Hoy
          </Text>
          <AlertCardList alerts={pastAlerts} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Theme.colors.whiteBlue,
  },
  container: {
    flex: 1,
    marginHorizontal: Theme.margin.horizontal,
    marginVertical: Theme.margin.vertical,
  },
  h1: {
    fontSize: Theme.size.h1,
    fontFamily: Theme.fonts.semibold,
    color: Theme.colors.blackBlue,
    marginBottom: Theme.margin.vertical,
  },
  marginTop: {
    marginTop: Theme.margin.vertical * 2.4,
  },
});
