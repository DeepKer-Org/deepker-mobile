import {StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {Theme} from "@/constants/theme";

interface AuthButtonProps {
    text: string;
    onPress: () => void;
    loading?: boolean;
}


const AuthButton: React.FC<AuthButtonProps> = ({
                                                   text,
                                                   onPress,
                                               }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <View>
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}
export default AuthButton
const styles = StyleSheet.create({
    button: {
        paddingVertical: Theme.padding.vertical / 2,
        width: 200,
        marginHorizontal: "auto",
        borderRadius: Theme.borderRadius,
        backgroundColor: Theme.colors.green,
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.4,
        // Shadow for Android
        elevation: 6,
    },
    text: {
        color: Theme.colors.white,
        textAlign: "center",
        fontFamily: Theme.fonts.medium,
        fontSize: 20,
    },
})
