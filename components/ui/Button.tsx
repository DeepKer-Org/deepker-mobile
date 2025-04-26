import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Theme } from "@/constants/theme";

interface ButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  text: string;
  backgroundColor?: "primary" | "warning" | "default";
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  text,
  backgroundColor = "default",
}) => {

  const buttonBackgroundColor = {
    primary: Theme.colors.green,
    warning: Theme.colors.red,
    default: Theme.colors.blackBlue,
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, { backgroundColor: buttonBackgroundColor[backgroundColor] }]}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: Theme.padding.vertical * 0.75,
    borderRadius: Theme.borderRadius,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    // Shadow for Android
    elevation: 6,
  },
  text: {
    color: Theme.colors.white,
    textAlign: "center",
    fontFamily: Theme.fonts.medium,
    fontSize: 20,
  },
});
