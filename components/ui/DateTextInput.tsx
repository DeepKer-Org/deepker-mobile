// components/DateTextInput.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from "@/constants/theme";

interface DateTextInputProps {
    iconName: React.ComponentProps<typeof MaterialIcons>['name'];
    placeholder?: string;
    value?: Date;
    onDateChange: (date: Date) => void;
}

const DateTextInput: React.FC<DateTextInputProps> = ({
                                                         iconName,
                                                         placeholder,
                                                         value,
                                                         onDateChange
                                                     }) => {
    const [showPicker, setShowPicker] = useState(false);

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowPicker(Platform.OS === 'ios');
        if (selectedDate) {
            onDateChange(selectedDate);
        }
    };

    const formattedDate = value ? value.toLocaleDateString() : '';

    return (
        <View style={styles.container}>
            <MaterialIcons name={iconName} size={24} style={styles.icon} />
            <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.touchable}>
                <Text style={[styles.text, !value && styles.placeholder]}>
                    {value ? formattedDate : placeholder}
                </Text>
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker
                    value={value || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
        </View>
    );
};

export default DateTextInput;

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
    touchable: {
        flex: 1,
    },
    text: {
        fontSize: 16,
        paddingVertical: 4,
        fontFamily: Theme.fonts.regular,
        color: Theme.colors.black,
    },
    placeholder: {
        color: Theme.colors.gray,
    },
});
