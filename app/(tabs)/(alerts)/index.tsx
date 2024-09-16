import AlertCardList from "@/components/alerts/AlertCardList";
import { Theme } from "@/constants/theme";
import { Patient } from "@/types/patient";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tab() {
  const patients: Patient[] = [
    {
      name: "Alejandro Ruiz Perez",
      diagnosis: "Paro Cardíaco",
      location: "112A",
    },
    { name: "Maria Gomez", diagnosis: "Infarto", location: "120B" },
    { name: "Carlos Sanchez", diagnosis: "Arritmia", location: "101C" },
  ];

  return (
    <SafeAreaView style={styles.background} edges={[]}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.h1}>Alertas Activas</Text>
          <AlertCardList patients={patients} />
          <Text style={[styles.h1, styles.marginTop]}>Últimas Alertas de Hoy</Text>
          <AlertCardList patients={patients} />
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
    marginTop: Theme.margin.vertical * 2.4
  }
});
