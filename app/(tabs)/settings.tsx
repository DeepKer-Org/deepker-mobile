import {Theme} from "@/constants/theme";
import {View, Text, StyleSheet} from "react-native";
import SwitchElement from "@/components/settings/SwitchElement";
import {useState} from "react";

export default function Tab() {
    const [isAlertSoundEnabled, setIsAlertSoundEnabled] = useState(true);
    const [isPreviewEnabled, setIsPreviewEnabled] = useState(true);

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.h1}>Ajustes</Text>
                <Text style={styles.h3}>Notificaciones de alertas</Text>
                <View style={styles.alertsContainer}>
                    <SwitchElement
                        label="Sonidos de alerta"
                        value={isAlertSoundEnabled}
                        onValueChange={setIsAlertSoundEnabled} // Pass down the handler function
                    />
                    <SwitchElement
                        label="Mostrar previsualización"
                        value={isPreviewEnabled}
                        onValueChange={setIsPreviewEnabled} // Pass down the handler function
                        lastElement
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Theme.colors.whiteBlue,
    },
    container: {
        marginHorizontal: Theme.margin.horizontal,
        paddingVertical: Theme.padding.vertical,
        flex: 1,
    },
    alertsContainer: {

    },
    h1: {
        fontFamily: Theme.fonts.semibold,
        color: Theme.colors.black,
        fontSize: Theme.size.h1,
        marginBottom: Theme.margin.vertical,
    },
    h3: {
        fontFamily: Theme.fonts.semibold,
        color: Theme.colors.black,
        fontSize: Theme.size.h3,
        marginTop: Theme.margin.vertical,
        marginBottom: Theme.margin.vertical / 2,
    }
});
