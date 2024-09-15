import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{fontFamily: "Poppins-Medium"}}>My Super App!</Text>
      <Text style={{fontFamily: "Poppins-Black"}}>My Super App!</Text>
      <Text style={{fontFamily: "Poppins-Bold"}}>My Super App!</Text>
      <Text style={{fontFamily: "Poppins-Regular"}}>My Super App!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
