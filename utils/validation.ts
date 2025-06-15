import { Alert } from "react-native";

export const validateDni = (dni: string): boolean => {
  if (!dni) {
    Alert.alert("Error en DNI", "Por favor ingrese su DNI.");
    return false;
  }
  const dniRegex = /^[0-9]{8}$/;
  if (!dniRegex.test(dni)) {
    Alert.alert(
      "Error en DNI",
      "El DNI debe tener exactamente 8 dígitos numéricos."
    );
    return false;
  }
  return true;
};

export const validateIssuanceDate = (
  issuanceDate: Date | undefined
): boolean => {
  if (!issuanceDate) {
    Alert.alert(
      "Error en Fecha",
      "Por favor seleccione la fecha de emisión de su DNI."
    );
    return false;
  }
  const today = new Date();
  if (issuanceDate > today) {
    Alert.alert("Error en Fecha", "La fecha de emisión no puede ser futura.");
    return false;
  }
  return true;
};

export const validatePassword = (password: string): boolean => {
  if (!password) {
    Alert.alert("Error en Contraseña", "Por favor ingrese una contraseña.");
    return false;
  }
  if (password.length < 12) {
    Alert.alert(
      "Error en Contraseña",
      "La contraseña debe tener al menos 12 caracteres."
    );
    return false;
  }
  if (!/[0-9]/.test(password)) {
    Alert.alert(
      "Error en Contraseña",
      "La contraseña debe contener al menos un número."
    );
    return false;
  }
  if (!/[!@#$%^&*_]/.test(password)) {
    Alert.alert(
      "Error en Contraseña",
      "La contraseña debe contener al menos un carácter especial (!@#$%^&*_)."
    );
    return false;
  }
  if (!/^[A-Za-z0-9!@#$%^&*_]+$/.test(password)) {
    Alert.alert(
      "Error en Contraseña",
      "La contraseña solo puede contener letras, números y los siguientes caracteres especiales: !@#$%^&*_"
    );
    return false;
  }
  return true;
};

export const validatePasswordMatch = (
  password: string,
  repeatPassword: string
): boolean => {
  if (!repeatPassword) {
    Alert.alert("Error en Contraseña", "Por favor confirme su contraseña.");
    return false;
  }
  if (password !== repeatPassword) {
    Alert.alert("Error en Contraseña", "Las contraseñas no coinciden.");
    return false;
  }
  return true;
};
