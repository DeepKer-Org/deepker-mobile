import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { Theme } from "@/constants/theme";

interface CustomButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  text: string;
  primary?: boolean;
  customStyle?: ViewStyle;
  textStyle?: ViewStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  text,
  primary,
}) => {
  const backgroundColor = primary ? Theme.colors.green : Theme.colors.blackBlue;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, { backgroundColor: backgroundColor }]}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: Theme.padding.vertical * 0.75,
    borderRadius: Theme.borderRadius,
  },
  text: {
    color: Theme.colors.white,
    textAlign: "center",
    fontFamily: Theme.fonts.medium,
    fontSize: Theme.size.h2,
  },
});
