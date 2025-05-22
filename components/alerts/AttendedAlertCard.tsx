import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Alert } from "@/types/alert";
import { Theme } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

interface AttendedAlertCardProps {
  id: Alert["alert_id"];
  patientName: Alert["patient"]["name"];
  principalDiagnosis?: string;
  colorStyle: {
    font: string;
    lightBackground: string;
    darkBackground: string;
  };
}

const AttendedAlertCard: React.FC<AttendedAlertCardProps> = ({
  id,
  patientName,
  principalDiagnosis,
  colorStyle,
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/alerts/attended/${id}`);
  };

  return (
    <Pressable onPress={handlePress} style={styles.card}>
      <LinearGradient
        colors={[colorStyle.lightBackground, colorStyle.darkBackground]}
        style={styles.background}
      ></LinearGradient>
      <Text style={[styles.patientName, { color: colorStyle.font }]}>
        Pac. {patientName}
      </Text>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={[styles.label, { color: colorStyle.font }]}>
            Diagnóstico:
          </Text>
          <Text style={[styles.value, { color: colorStyle.font }]}>{principalDiagnosis !== "" ? principalDiagnosis : "En proceso" }</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default AttendedAlertCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 100,
    paddingVertical: Theme.padding.vertical,
    paddingHorizontal: Theme.padding.horizontal,
    borderRadius: Theme.borderRadius,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    // Shadow for Android
    elevation: 6,
  },
  background: {
    borderRadius: Theme.borderRadius,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  patientName: {
    fontSize: 16,
    fontFamily: Theme.fonts.semibold,
    marginBottom: Theme.margin.vertical,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    flexDirection: "column",
  },
  label: {
    fontSize: 18,
    fontFamily: Theme.fonts.semibold,
    marginBottom: Theme.margin.vertical / 3,
  },
  value: {
    fontSize: 18,
    fontFamily: Theme.fonts.regular,
  },
  infoRight: {
    alignItems: "flex-end",
  },
});
