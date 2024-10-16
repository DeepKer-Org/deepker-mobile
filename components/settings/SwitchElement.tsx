import React, {useState} from 'react'
import {StyleSheet, Switch, Text, View} from "react-native";
import {Theme} from "@/constants/theme";

interface SwitchElementProps {
    label: string;
    value: boolean;
    lastElement?: boolean;
    onValueChange: (value: boolean) => void;
}

const SwitchElement: React.FC<SwitchElementProps> = ({label, value, onValueChange, lastElement}) => {

    return (
        <View style={styles.container}>
            <View style={styles.columns}>
                <Text style={styles.text}>{label}</Text>
                <Switch
                    trackColor={{ false: '#717171', true: '#0A7AD6' }}
                    thumbColor={'#ffffff'}
                    ios_backgroundColor="#717171"
                    onValueChange={onValueChange}
                    value={value}
                />
            </View>
            {lastElement !== true ? <View style={styles.separator} /> : null}
        </View>
    )
}
export default SwitchElement

const styles = StyleSheet.create({
    container: {
        marginTop: Theme.margin.vertical,
    },
    separator: {
        backgroundColor: Theme.colors.blue,
        height: 1,
        marginTop: Theme.margin.vertical,
    },
    columns: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    text: {
        fontFamily: Theme.fonts.regular,
        fontSize: Theme.size.h3,
    }
});
