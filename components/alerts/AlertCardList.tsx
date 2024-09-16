import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Patient } from '@/types/patient';
import AlertCard from './AlertCard';

interface PatientListProps {
  patients: Patient[];
}

export const AlertCardList: React.FC<PatientListProps> = ({ patients }) => {
  return (
    <View style={styles.container}>
      {patients.map((patient, index) => (
        <AlertCard
          key={index}
          name={patient.name}
          diagnosis={patient.diagnosis}
          location={patient.location}
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