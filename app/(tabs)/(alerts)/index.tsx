import AlertCardList from "@/components/alerts/AlertCardList";
import { Theme } from "@/constants/theme";
import { Alert } from "@/types/alert";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tab() {
  const alerts: Alert[] = [
    {
      id: "1",
      patientName: "Alejandro Ruiz Perez",
      status: "active",
      type: "Paro Cardíaco",
      patientLocation: "112A",
      timestamp: "2021-09-01T12:00:00Z",
    },
    { id: "2", patientName: "Maria Gomez", type: "Infarto", patientLocation: "120B",
      status: "active", 
      timestamp: "2021-09-01T12:00:00Z",
    },
    {
      id: "3",
      patientName: "Carlos Sanchez",
      type: "Arritmia",
      patientLocation: "101C",
      status: "active",
      timestamp: "2021-09-01T12:00:00Z",
    },
  ];

  return (
    <SafeAreaView style={styles.background} edges={[]}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.h1}>Alertas Activas</Text>
          <AlertCardList alerts={alerts} />
          <Text style={[styles.h1, styles.marginTop]}>
            Últimas Alertas de Hoy
          </Text>
          <AlertCardList alerts={alerts} />
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
