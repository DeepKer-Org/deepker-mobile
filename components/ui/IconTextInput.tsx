// components/IconTextInput.tsx
import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {Theme} from "@/constants/theme";

interface IconTextInputProps extends TextInputProps {
    iconName: React.ComponentProps<typeof MaterialIcons>['name'];
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
}

const IconTextInput: React.FC<IconTextInputProps> = ({
                                                         iconName,
                                                         placeholder,
                                                         value,
                                                         onChangeText,
                                                         secureTextEntry,
                                                         style,
                                                     }) => {
    return (
        <View style={styles.container}>
            <MaterialIcons name={iconName} size={24} style={styles.icon} />
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                style={[styles.input, style]}
            />
        </View>
    );
};


export default IconTextInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.gray,
        padding: 2,
    },
    icon: {
        marginRight: 8,
        color: Theme.colors.gray,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 4,
        fontFamily: Theme.fonts.regular
    },
});
