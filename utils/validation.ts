import { Alert } from 'react-native';

export const validateDni = (dni: string): boolean => {
    const dniRegex = /^[0-9]{8}$/;
    if (!dniRegex.test(dni)) {
        Alert.alert("Error en DNI", "El DNI debe tener exactamente 8 dígitos.");
        return false;
    }
    return true;
};

export const validateIssuanceDate = (issuanceDate: Date | undefined): boolean => {
    if (!issuanceDate) {
        Alert.alert("Error en Fecha", "Seleccione la fecha de emisión de su DNI.");
        return false;
    }
    return true;
};

export const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*_])[A-Za-z\d!@#$%^&*_]{12,}$/;
    if (!passwordRegex.test(password)) {
        Alert.alert(
            "Error en Contraseña",
            "La contraseña debe tener al menos 12 caracteres, un número y un carácter especial."
        );
        return false;
    }
    return true;
};

export const validatePasswordMatch = (password: string, repeatPassword: string): boolean => {
    if (password !== repeatPassword) {
        Alert.alert("Error en Contraseña", "Las contraseñas no coinciden.");
        return false;
    }
    return true;
};