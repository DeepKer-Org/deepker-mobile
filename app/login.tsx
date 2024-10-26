import {StyleSheet, Text, Image, View, Alert} from 'react-native'
import React, {useEffect, useState} from 'react'
import IconTextInput from "@/components/ui/IconTextInput";
import PasswordTextInput from "@/components/ui/PasswordTextInput";
import {Theme} from "@/constants/theme";
import AuthButton from "@/components/ui/AuthButton";
import {router} from "expo-router";
import {useSession} from "@/context/AuthSessionContext";

const Login = () => {
    const [dni, setDni] = useState('');
    const [password, setPassword] = useState('');
    const {signIn, session} = useSession();

    useEffect(() => {
    }, []);

    const handleLogin = () => {
        if (validateInputs()) {
            signIn(dni, password);
        } else {
            Alert.alert("Error", "Por favor verifica tu DNI y contraseña.");
        }
    }

    const handleRetrive = () => {
        router.replace("recover");
    }

    const validateInputs = (): boolean => {
        let valid = true;

        // DNI validation: must be exactly 8 numeric characters
        const dniRegex = /^[0-9]{8,}$/;
        if (!dniRegex.test(dni)) {
            valid = false;
            Alert.alert("Error en DNI", "El DNI debe tener exactamente 8 caracteres numéricos.");
        }

        // Password validation: at least 8 characters, one number, and one special character
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*_])[A-Za-z\d!@#$%^&*_]{8,}$/;
        if (!passwordRegex.test(password)) {
            valid = false;
            Alert.alert("Error en Contraseña", "La contraseña debe tener al menos 8 caracteres, un número y un carácter especial.");
        }

        return valid;
    };

    useEffect(() => {
        if (session) {
            router.replace("(app)");
        }
    }, [session]);

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
                    <PasswordTextInput
                        placeholder="Contraseña"
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <View style={styles.recoverContainer}>
                    <Text style={styles.small}>
                        ¿Olvidaste tu contraseña?
                    </Text>
                    <Text style={styles.recoverText} onPress={handleRetrive}>
                        Restablécela aquí.
                    </Text>
                </View>
                <AuthButton text={"INGRESAR"} onPress={handleLogin}/>
            </View>
        </View>
    );
}
export default Login
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
