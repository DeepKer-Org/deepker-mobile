import React from "react";
import { Tabs, useSegments } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Theme } from "@/constants/theme";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Theme.colors.blue,
        tabBarLabelStyle: {
          fontFamily: Theme.fonts.medium,
          fontSize: 14,
        },
        tabBarItemStyle: {
          paddingVertical: Platform.OS === "ios" ? 5 : 10,
        },
        tabBarStyle: {
          height: Platform.OS === "ios" ? 80 : 70,
          paddingBottom: Platform.OS === "ios" ? 20 : 0,
        },
        headerStyle: {
          backgroundColor: Theme.colors.whiteBlue, 
          height: Platform.OS === "ios" ? 60 : 50
        },
        headerTitle: () => null
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Alertas",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="crisis-alert" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Cuenta",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="account-box" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
