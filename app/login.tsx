import { Text, Image, View, Alert, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import IconTextInput from "@/components/ui/IconTextInput";
import PasswordTextInput from "@/components/ui/PasswordTextInput";
import AuthButton from "@/components/ui/AuthButton";
import { router } from "expo-router";
import { useSession } from "@/context/AuthSessionContext";
import { validateDni, validatePassword } from "@/utils/validation";
import { commonStyles } from '../styles/commonStyles';
import { Theme } from "@/constants/theme";

const Login = () => {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, session } = useSession();

  const handleLogin = () => {
    if (!validateInputs()) {
        return
    }

    try {
      signIn(dni, password, () => {
        Alert.alert("Error", "Por favor verifica tu DNI y contraseña.");
      });
    } catch (error) {
      console.error("Error in login:", error);
    }
  };

  const validateInputs = (): boolean => {
    return (
      validateDni(dni) &&
      validatePassword(password)
    );
  };

  const handleRecover = () => {
    router.replace("recover");
  };

  useEffect(() => {
    if (session) {
      router.replace("(app)");
    }
  }, [session]);

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/deepker-original.webp")}
            style={styles.image}
          />
          <Text style={styles.logoHeader}>DeepKer</Text>
          <Text style={styles.h2}>Inicio de Sesión</Text>
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
          <PasswordTextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.recoverContainer}>
          <Text style={styles.small}>¿Olvidó su contraseña?</Text>
          <Text style={styles.recoverText} onPress={handleRecover}>
            Restablézcala aquí.
          </Text>
        </View>
        <AuthButton text={"INGRESAR"} onPress={handleLogin} />
      </View>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: Theme.padding.horizontal * 2,
  },
  ...commonStyles
});