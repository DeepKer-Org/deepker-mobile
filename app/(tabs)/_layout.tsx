import { Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
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
          title: "Alerts",
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
