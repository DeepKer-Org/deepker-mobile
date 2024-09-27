import { Theme } from "@/constants/theme";
import { View, Text, StyleSheet } from "react-native";

export default function Tab() {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.h1}>Credenciales</Text>
          <Text style={styles.p}>
            Ingrese el código de 6 dígitos de sus credenciales en la aplicación
            web para acceder rápidamente.
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.p}>Su código es:</Text>
          <Text style={styles.code}>123456</Text>
          <View style={styles.expireContainer}>
            <Text style={styles.p}>Su código expira en:</Text>
            <Text style={styles.time}>30 s</Text>
          </View>
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
    marginHorizontal: Theme.margin.horizontal,
    marginVertical: Theme.margin.vertical,
    flex: 1,
  },
  topContainer: {
    flexBasis: "40%",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flexBasis: "60%",
    alignItems: "center",
  },
  h1: {
    fontFamily: Theme.fonts.semibold,
    color: Theme.colors.black,
    fontSize: Theme.size.h1,
    marginBottom: Theme.margin.vertical,
  },
  p: {
    fontFamily: Theme.fonts.regular,
    color: Theme.colors.black,
    fontSize: Theme.size.h3,
    textAlign: "center",
  },
  code: {
    fontFamily: Theme.fonts.medium,
    color: Theme.colors.blue,
    fontSize: Theme.size.xl * 2,
    letterSpacing: 14,
  },
  expireContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Theme.margin.vertical * 4,
  },
  time: {
    color: Theme.colors.green,
    fontSize: Theme.size.h1,
    fontFamily: Theme.fonts.medium,
    marginLeft: 10,
  },
});
