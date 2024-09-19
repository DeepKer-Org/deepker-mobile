import InfoElement from "@/components/general/InfoElement";
import { Theme } from "@/constants/theme";
import { View, Text, StyleSheet } from "react-native";

export default function Tab() {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.h1}>Información General</Text>
        <InfoElement label={"Nombre"} value={"Juan Carlos"} />
        <InfoElement label={"Puesto"} value={"Enfermero"} />
        <InfoElement label={"Área"} value={"Cardiología"} />
        <InfoElement label={"Centro"} value={"Hosp. de las Esperanzas"} />
        <InfoElement label={"Horario"} value={"LV 8:00 AM a 5:00 PM"} lastElement />
      </View>
      <View style={styles.container}>
        <InfoElement label={"Nombre del Sistema"} value={"DeepKer"}/>
        <InfoElement label={"Versión"} value={"1.0.0"} lastElement />
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
    marginHorizontal: Theme.margin.horizontal,
    marginVertical: Theme.margin.vertical
  },
  h1: {
    fontFamily: Theme.fonts.semibold,
    color: Theme.colors.blackBlue,
    fontSize: Theme.size.h1,
    marginBottom: Theme.margin.vertical
  }
});
