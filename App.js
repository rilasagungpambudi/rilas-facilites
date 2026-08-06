import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MapScreen from './src/MapScreen';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <MapScreen />
    </SafeAreaProvider>
  );
}
