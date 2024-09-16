import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const PastDetails = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>PastDetails</Text>
    </View>
  )
}

export default PastDetails

const styles = StyleSheet.create({})