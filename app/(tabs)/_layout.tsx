import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Credentials",
          tabBarIcon: ({ color }) => (
            <Text style={{ color: color }}>Creds</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="general"
        options={{
          title: "General",
          tabBarIcon: ({ color }) => (
            <Text style={{ color: color }}>General</Text>
          ),
        }}
      />
    </Tabs>
  );
}
