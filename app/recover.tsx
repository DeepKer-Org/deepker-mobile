import { Alert, Image, Text, View } from "react-native";
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

const Recover = () => {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [issuanceDate, setIssuanceDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const handleRecover = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const formattedDate = issuanceDate?.toISOString().split("T")[0] || "";
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
    return (
      validateDni(dni) &&
      validateIssuanceDate(issuanceDate) &&
      validatePassword(password) &&
      validatePasswordMatch(password, repeatPassword)
    );
  };

  const handleLogin = () => {
    router.replace("login");
  };

  return (
    <View style={commonStyles.background}>
      <View style={commonStyles.container}>
        <View style={commonStyles.imageContainer}>
          <Image
            source={require("../assets/images/deepker-original.webp")}
            style={commonStyles.image}
          />
          <Text style={commonStyles.logoHeader}>DeepKer</Text>
          <Text style={commonStyles.h2}>Recuperar Contraseña</Text>
        </View>
        <View style={commonStyles.inputs}>
          <IconTextInput
            iconName="person"
            placeholder="DNI"
            keyboardType="numeric"
            value={dni}
            onChangeText={setDni}
          />
        </View>
        <View style={commonStyles.inputs}>
          <DateTextInput
            iconName="date-range"
            placeholder="Fecha de emisión de DNI"
            value={issuanceDate}
            onDateChange={setIssuanceDate}
          />
        </View>
        <View style={commonStyles.inputs}>
          <PasswordTextInput
            placeholder="Nueva contraseña"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={commonStyles.inputs}>
          <PasswordTextInput
            placeholder="Confirme su contraseña"
            value={repeatPassword}
            onChangeText={setRepeatPassword}
          />
        </View>
        <View style={commonStyles.recoverContainer}>
          <Text style={commonStyles.small}>¿Tiene una cuenta?</Text>
          <Text style={commonStyles.recoverText} onPress={handleLogin}>
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