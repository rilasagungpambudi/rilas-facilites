import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MapHeader({ 
  appState, 
  setAppState, 
  selectedType, 
  setSelectedType, 
  searchQuery, 
  setSearchQuery, 
  filteredFacilities 
}) {
  if (appState === 1 || appState === 2) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Public Facilities</Text>
      </View>
    );
  }

  if (appState === 3 || appState === 4) {
    return (
      <View style={styles.headerState3}>
        <View style={styles.header3Top}>
          <TouchableOpacity onPress={() => { setAppState(1); setSelectedType(null); }}>
            <Ionicons name="close" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.header3Title}>
            {filteredFacilities.length} {selectedType || 'Facilities'}
          </Text>
          <TouchableOpacity onPress={() => setAppState(2)}>
            <Ionicons name="filter" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Cari fasilitas..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerState3: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  header3Top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  header3Title: {
    fontSize: 16,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
});
