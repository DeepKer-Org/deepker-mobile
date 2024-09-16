import React from "react";
import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Theme } from "@/constants/theme";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Theme.colors.blackBlue,
        tabBarLabelStyle: {
          fontFamily: Theme.fonts.medium,
          fontSize: Theme.size.sm,
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
        name="credentials"
        options={{
          title: "Credentials",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="key" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(alerts)/index"
        options={{
          title: "Alertas",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="crisis-alert" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="general"
        options={{
          title: "General",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
