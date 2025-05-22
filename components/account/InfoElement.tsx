import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Theme } from "@/constants/theme";

interface InfoElementProps {
  label: string;
  value: string;
  lastElement?: boolean;
}

const InfoElement: React.FC<InfoElementProps> = ({
  label,
  value,
  lastElement,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.columns}>
        <Text style={styles.text}>{label}</Text>
        <Text style={styles.text}>{value}</Text>
      </View>
      {lastElement !== true ? <View style={styles.separator} /> : null}
    </View>
  );
};

export default InfoElement;

const styles = StyleSheet.create({
  container: {
    marginTop: Theme.margin.vertical / 1.5,
  },
  separator: {
    backgroundColor: Theme.colors.blue,
    height: 1,
    marginTop: Theme.margin.vertical / 1.5,
  },
  columns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: Theme.fonts.regular,
    fontSize: 18,
  }
});
