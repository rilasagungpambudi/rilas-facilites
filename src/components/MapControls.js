import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MapControls({ mapRef, initialRegion }) {
  const handleZoomIn = () => {
    mapRef.current?.getCamera().then(cam => {
      if (cam.altitude) {
         cam.altitude /= 2;
      }
      cam.zoom += 1;
      mapRef.current?.animateCamera(cam);
    });
  };

  const handleZoomOut = () => {
    mapRef.current?.getCamera().then(cam => {
      if (cam.altitude) {
         cam.altitude *= 2;
      }
      cam.zoom -= 1;
      mapRef.current?.animateCamera(cam);
    });
  };

  const handleRecenter = () => {
    mapRef.current?.animateToRegion(initialRegion, 1000);
  };

  return (
    <View style={styles.mapControls}>
      <TouchableOpacity style={styles.controlBtn} onPress={handleZoomIn}>
        <Ionicons name="add" size={24} color="#333" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlBtn} onPress={handleZoomOut}>
        <Ionicons name="remove" size={24} color="#333" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlBtn} onPress={handleRecenter}>
        <Ionicons name="locate" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mapControls: {
    position: 'absolute',
    right: 16,
    top: '30%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  controlBtn: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
