import {Alert, Image, StyleSheet, Text, View} from 'react-native'
import React, {useState} from 'react'
import {Theme} from "@/constants/theme";
import IconTextInput from "@/components/ui/IconTextInput";
import PasswordTextInput from "@/components/ui/PasswordTextInput";
import AuthButton from "@/components/ui/AuthButton";
import {router} from "expo-router";
import DateTextInput from "@/components/ui/DateTextInput";
import {changePassword} from "@/services/authorization";

const Recover = () => {
    const [dni, setDni] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [issuanceDate, setIssuanceDate] = useState<Date | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    const validateInputs = (): boolean => {
        // DNI should be exactly 8 digits
        const dniRegex = /^[0-9]{8}$/;
        if (!dniRegex.test(dni)) {
            Alert.alert("Error en DNI", "El DNI debe tener exactamente 8 dígitos.");
            return false;
        }

        // Issuance date must be selected
        if (!issuanceDate) {
            Alert.alert("Error en Fecha", "Seleccione la fecha de emisión de su DNI.");
            return false;
        }

        // Password validation: at least 8 characters, one number, one special character
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*_])[A-Za-z\d!@#$%^&*_]{12,}$/;
        if (!passwordRegex.test(password)) {
            Alert.alert("Error en Contraseña", "La contraseña debe tener al menos 12 caracteres, un número y un carácter especial.");
            return false;
        }

        // Check if passwords match
        if (password !== repeatPassword) {
            Alert.alert("Error en Contraseña", "Las contraseñas no coinciden.");
            return false;
        }

        return true;
    };

    const handleRecover = async () => {
        if (!validateInputs()) return;

        setLoading(true);
        try {
            // Format issuance date to string (e.g., "YYYY-MM-DD")
            const formattedDate = issuanceDate?.toISOString().split('T')[0] || '';
            await changePassword(dni, formattedDate, password);
            Alert.alert("Éxito", "Contraseña restablecida con éxito.", [
                { text: "Iniciar sesión", onPress: handleLogin }
            ]);
        } catch (error) {
            console.error("Error in password recovery:", error);
            Alert.alert("Error", "No se pudo restablecer la contraseña.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = () => {
        router.replace("login");
    };

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Image source={require('../assets/images/deepker-original.webp')} style={styles.image}/>
                <Text style={styles.h1}>Bienvenido</Text>
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
                    <Text style={styles.small}>
                        ¿Tiene una cuenta?
                    </Text>
                    <Text style={styles.recoverText} onPress={handleLogin}>
                        Inicie sesión aquí.
                    </Text>
                </View>
                <AuthButton text={"RESTABLECER"} onPress={handleRecover} loading={loading} />
            </View>
        </View>
    )
}
export default Recover
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Theme.colors.whiteBlue,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: Theme.padding.horizontal * 2,
    },
    h1: {
        fontFamily: Theme.fonts.medium,
        color: Theme.colors.black,
        fontSize: 32,
        marginBottom: Theme.margin.vertical * 4,
        textAlign: 'center',
    },
    inputs: {
        marginVertical: Theme.margin.vertical,
    },
    image: {
        width: 200,
        height: 116,
        resizeMode: 'contain',
        marginHorizontal: "auto",
        marginBottom: Theme.margin.vertical,
    },
    recoverContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: Theme.margin.vertical,
        marginTop: Theme.margin.vertical * 2,
    },
    recoverText: {
        marginLeft: 8,
        fontFamily: Theme.fonts.semibold,
    },
    small: {
        fontFamily: Theme.fonts.regular,
    }
})