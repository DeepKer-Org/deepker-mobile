import InfoElement from "@/components/account/InfoElement";
import Button from "@/components/ui/Button";
import { Theme } from "@/constants/theme";
import { View, Text, StyleSheet } from "react-native";

export default function Tab() {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View>
          <Text style={styles.h1}>Cuenta</Text>
          <View style={styles.userContainer}>
            <Text style={styles.h3}>Usuario</Text>
            <InfoElement label={"Nombre"} value={"Juan Carlos"} />
            <InfoElement label={"Puesto"} value={"Enfermero"} />
            <InfoElement label={"Área"} value={"Cardiología"} />
            <InfoElement label={"Centro"} value={"Hosp. de las Esperanzas"} lastElement />
          </View>
          <View style={styles.systemContainer}>
            <Text style={styles.h3}>Aplicación</Text>
            <InfoElement label={"Nombre del Sistema"}  value={"DeepKer"} />
            <InfoElement label={"Versión"} value={"1.0.0"} lastElement />
          </View>
        </View>
        <View>
          <Button text={"CERRAR SESIÓN"} onPress={() => {}} />
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
    marginHorizontal: Theme.margin.horizontal,
    paddingVertical: Theme.padding.vertical
  },
  userContainer: {
    marginVertical: Theme.margin.vertical,
  },
  systemContainer: {
    marginVertical: Theme.margin.vertical * 1.5,
  },
  h1: {
    fontFamily: Theme.fonts.semibold,
    color: Theme.colors.black,
    fontSize: Theme.size.h1,
    marginBottom: Theme.margin.vertical,
  },
  h3: {
    fontFamily: Theme.fonts.semibold,
    color: Theme.colors.black,
    fontSize: Theme.size.h3,
    marginBottom: Theme.margin.vertical,
  }
});
