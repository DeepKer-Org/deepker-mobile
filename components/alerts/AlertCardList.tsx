import { StyleSheet, View } from "react-native";
import React from "react";
import { Alert } from "@/types/alert";
import AlertCard from "./AlertCard";
import { Theme } from "@/constants/theme";

interface AlertListProps {
  alerts: Alert[];
  active?: boolean;
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

export const AlertCardList: React.FC<AlertListProps> = ({ alerts, active }) => {
  return (
    <View style={styles.container}>
      {alerts.map((alert, index) => {
        const colorStyle = active
          ? alertThemes.active
          : index % 2 === 0
          ? alertThemes.evenInactive
          : alertThemes.oddInactive;
        return (
          <AlertCard
            key={index}
            patientName={alert.patientName}
            type={alert.type}
            patientLocation={alert.patientLocation}
            id={""}
            colorStyle={colorStyle}
          />
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
