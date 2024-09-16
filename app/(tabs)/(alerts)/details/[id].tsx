import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

export default function DetailsScreen() {
const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>DetailsScreen {id}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})