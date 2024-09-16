import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Alert } from '@/types/alert';
import AlertCard from './AlertCard';

interface AlertListProps {
  alerts: Alert[];
}

export const AlertCardList: React.FC<AlertListProps> = ({ alerts }) => {
  return (
    <View style={styles.container}>
      {alerts.map((alert, index) => (
        <AlertCard
          key={index}
          patientName={alert.patientName}
          type={alert.type}
          patientLocation={alert.patientLocation}
        />
      ))}
    </View>
  )
}

export default AlertCardList

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
})