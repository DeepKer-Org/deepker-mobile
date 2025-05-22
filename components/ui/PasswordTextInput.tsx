// components/PasswordTextInput.tsx
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInputProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import IconTextInput from './IconTextInput';
import {Theme} from "@/constants/theme";

interface PasswordTextInputProps extends TextInputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    style?: TextInputProps['style'];
}

const PasswordTextInput: React.FC<PasswordTextInputProps> = ({
                                                                 placeholder,
                                                                 value,
                                                                 onChangeText,
                                                                 style,
                                                             }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={styles.container}>
            <IconTextInput
                iconName="key"
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={!isPasswordVisible}
                style={[styles.input, style]}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                <MaterialIcons
                    name={isPasswordVisible ? "visibility" : "visibility-off"}
                    size={24}
                    color="#888"
                />
            </TouchableOpacity>
        </View>
    );
};

export default PasswordTextInput;

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 4,
        fontFamily: Theme.fonts.regular
    },
});