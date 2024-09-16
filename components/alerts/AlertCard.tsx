import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Alert } from "@/types/alert";
import { Theme } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

interface AlertCardProps {
  id: Alert["id"];
  patientName: Alert["patientName"];
  type: Alert["type"];
  patientLocation: Alert["patientLocation"];
  colorStyle: {
    font: string;
    lightBackground: string;
    darkBackground: string;
  };
}

const AlertCard: React.FC<AlertCardProps> = ({
  id,
  patientName,
  type,
  patientLocation,
  colorStyle,
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/(alerts)/details/${id}`);
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
          <Text style={[styles.value, { color: colorStyle.font }]}>{type}</Text>
        </View>
        <View style={[styles.info, styles.infoRight]}>
          <Text style={[styles.label, { color: colorStyle.font }]}>Lugar:</Text>
          <Text style={[styles.value, { color: colorStyle.font }]}>
            {patientLocation}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default AlertCard;

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
    fontSize: Theme.size.p,
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
    fontSize: Theme.size.h3,
    fontFamily: Theme.fonts.semibold,
    marginBottom: Theme.margin.vertical / 3,
  },
  value: {
    fontSize: Theme.size.h3,
    fontFamily: Theme.fonts.regular,
  },
  infoRight: {
    alignItems: "flex-end",
  },
});
