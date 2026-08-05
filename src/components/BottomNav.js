import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BottomNav() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bottomNav, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="home" size={24} color="#007AFF" />
        <Text style={styles.navTextActive}>Beranda</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="map-outline" size={24} color="#888" />
        <Text style={styles.navText}>Peta</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="person-outline" size={24} color="#888" />
        <Text style={styles.navText}>Profil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
    paddingBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  navTextActive: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 4,
    fontWeight: 'bold',
  },
});
