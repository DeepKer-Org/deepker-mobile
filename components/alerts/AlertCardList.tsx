import {StyleSheet, View} from "react-native";
import React from "react";
import {Alert} from "@/types/alert";
import AttendedAlertCard from "./AttendedAlertCard";
import {Theme} from "@/constants/theme";
import UnattendedAlertCard from "@/components/alerts/UnattendedAlertCard";

interface AlertListProps {
    alerts: Alert[];
    unattended?: boolean;
}

const alertThemes = {
    active: {
        font: Theme.colors.white,
        lightBackground: Theme.colors.green,
        darkBackground: Theme.colors.darkGreen,
    },
    evenInactive: {
        font: Theme.colors.white,
        lightBackground: Theme.colors.blue,
        darkBackground: Theme.colors.darkBlue,
    },
    oddInactive: {
        font: Theme.colors.blackBlue,
        lightBackground: Theme.colors.white,
        darkBackground: Theme.colors.darkWhite,
    },
};

export const AlertCardList: React.FC<AlertListProps> = ({alerts = [], unattended}) => {
    return (
        <View style={styles.container}>
            {alerts!.map((alert, index) => {
                const colorStyle = unattended
                    ? alertThemes.active
                    : index % 2 === 0
                        ? alertThemes.evenInactive
                        : alertThemes.oddInactive;
                return (
                    unattended ? (
                        <UnattendedAlertCard
                            key={index}
                            patientName={alert.patient.name}
                            patientLocation={alert.patient.location}
                            id={alert.alert_id}
                            colorStyle={colorStyle}
                            principalDiagnosis={alert.computer_diagnostic.diagnosis}
                        />

                    ) : (
                        <AttendedAlertCard
                            key={index}
                            patientName={alert.patient.name}
                            id={alert.alert_id}
                            colorStyle={colorStyle}
                            principalDiagnosis={alert.final_diagnosis != "" ? alert.final_diagnosis : alert.computer_diagnostic.diagnosis}
                        />
                    )
                );
            })}
        </View>
    );
};

export default AlertCardList;

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
});
