import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import IconTextInput from "@/components/ui/IconTextInput";
import PasswordTextInput from "@/components/ui/PasswordTextInput";
import AuthButton from "@/components/ui/AuthButton";
import { router } from "expo-router";
import DateTextInput from "@/components/ui/DateTextInput";
import { changePassword } from "@/services/authorization";
import {
  validateDni,
  validateIssuanceDate,
  validatePassword,
  validatePasswordMatch,
} from "@/utils/validation";
import { commonStyles } from "@/styles/commonStyles";
import { Theme } from "@/constants/theme";

const Recover = () => {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [issuanceDate, setIssuanceDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const handleRecover = async () => {
    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    try {
      const formattedDate = issuanceDate
        ? `${issuanceDate.getFullYear()}-${String(
            issuanceDate.getMonth() + 1
          ).padStart(2, "0")}-${String(issuanceDate.getDate()).padStart(
            2,
            "0"
          )}`
        : "";
      await changePassword(dni, formattedDate, password);
      Alert.alert("Éxito", "Contraseña restablecida con éxito.", [
        { text: "Iniciar sesión", onPress: handleLogin },
      ]);
    } catch (error) {
      Alert.alert("Error", "No se pudo restablecer la contraseña.");
    } finally {
      setLoading(false);
    }
  };

  const validateInputs = (): boolean => {
    if (!validateDni(dni)) {
      return false;
    }
    if (!validateIssuanceDate(issuanceDate)) {
      return false;
    }
    if (!validatePassword(password)) {
      return false;
    }
    if (!validatePasswordMatch(password, repeatPassword)) {
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    router.replace("login");
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/deepker-original.webp")}
            style={styles.image}
          />
          <Text style={styles.logoHeader}>DeepKer</Text>
          <Text style={styles.h2}>Recuperar Contraseña</Text>
        </View>
        <View style={styles.inputs}>
          <IconTextInput
            iconName="person"
            placeholder="DNI"
            keyboardType="numeric"
            value={dni}
            onChangeText={setDni}
          />
        </View>
        <View style={styles.inputs}>
          <DateTextInput
            iconName="date-range"
            placeholder="Fecha de emisión de DNI"
            value={issuanceDate}
            onDateChange={setIssuanceDate}
          />
        </View>
        <View style={styles.inputs}>
          <PasswordTextInput
            placeholder="Nueva contraseña"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.inputs}>
          <PasswordTextInput
            placeholder="Confirme su contraseña"
            value={repeatPassword}
            onChangeText={setRepeatPassword}
          />
        </View>
        <View style={styles.recoverContainer}>
          <Text style={styles.small}>¿Tiene una cuenta?</Text>
          <Text style={styles.recoverText} onPress={handleLogin}>
            Inicie sesión aquí.
          </Text>
        </View>
        <AuthButton
          text={"RESTABLECER"}
          onPress={handleRecover}
          loading={loading}
        />
      </View>
    </View>
  );
};
export default Recover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: Theme.padding.horizontal * 2,
  },
  ...commonStyles,
});
