import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Patient } from "@/types/patient";
import { Theme } from "@/constants/theme";
import { LinearGradient } from 'expo-linear-gradient';

interface PatientCardProps {
  name: Patient["name"];
  diagnosis: Patient["diagnosis"];
  location: Patient["location"];
}

const AlertCard: React.FC<PatientCardProps> = ({
  name,
  diagnosis,
  location,
}) => {
  return (
    <View style={styles.card}>
      <LinearGradient
      colors={['#0A7AD6', '#0A63AC']}
      style={styles.background}
    ></LinearGradient>
      <Text style={styles.patientName}>Pac. {name}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={styles.label}>Diagnóstico:</Text>
          <Text style={styles.value}>{diagnosis}</Text>
        </View>
        <View style={[styles.info, styles.infoRight]}>
          <Text style={styles.label}>Lugar:</Text>
          <Text style={styles.value}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

export default AlertCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 120, 
    paddingVertical: Theme.padding.vertical,
    paddingHorizontal: Theme.padding.horizontal,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    // Shadow for Android
    elevation: 5,
  },
  background: {
    borderRadius: Theme.borderRadius,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  patientName: {
    color: Theme.colors.white,
    fontSize: Theme.sizes.p,
    fontFamily: Theme.fonts.semibold,
    marginBottom: Theme.margin.vertical,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    flexDirection: "column"
  },
  label: {
    color: Theme.colors.white,
    fontSize: Theme.sizes.h3,
    fontFamily: Theme.fonts.semibold,
    marginBottom: Theme.margin.vertical/2,
  },
  value: {
    color: Theme.colors.white,
    fontSize: Theme.sizes.h3,
  },
  infoRight: {
    alignItems: "flex-end",
  },
});
