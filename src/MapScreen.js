import React, { useState, useRef, useEffect, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { FACILITIES } from './data';

import MapHeader from './components/MapHeader';
import MapControls from './components/MapControls';
import FilterModal from './components/FilterModal';
import FacilitiesBottomSheet, { BOTTOM_SHEET_HEIGHT } from './components/FacilitiesBottomSheet';
import HorizontalCards from './components/HorizontalCards';
import BottomNav from './components/BottomNav';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_REGION = {
  latitude: -6.292237,
  longitude: 106.822368,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

// Tombol "Lihat Peta" tampil 16px di atas BottomSheet
const LIHAT_PETA_BOTTOM = BOTTOM_SHEET_HEIGHT + 16;

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const [appState, setAppState] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const mapRef = useRef(null);

  const filteredFacilities = useMemo(() => {
    let filtered = FACILITIES;
    if (selectedType) {
      filtered = filtered.filter(f => f.type === selectedType);
    }
    if (searchQuery) {
      filtered = filtered.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return filtered;
  }, [selectedType, searchQuery]);

  useEffect(() => {
    if (appState === 3 && filteredFacilities.length > 0 && mapRef.current) {
      const first = filteredFacilities[0];
      mapRef.current.animateToRegion({
        latitude: first.lat,
        longitude: first.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }, 1000);
    }
  }, [appState, filteredFacilities]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <MapHeader 
        appState={appState}
        setAppState={setAppState}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredFacilities={filteredFacilities}
      />

      <View style={styles.mapContainer}>
        <MapView 
          ref={mapRef}
          style={styles.map} 
          initialRegion={INITIAL_REGION}
          showsUserLocation
        >
          {filteredFacilities.map(f => (
            <Marker
              key={f.id}
              coordinate={{ latitude: f.lat, longitude: f.lng }}
              title={f.name}
              description={f.type}
            />
          ))}
        </MapView>

        {/* FIX 1: Search input overlay di atas peta — State 1 & 2 */}
        {(appState === 1 || appState === 2) && (
          <View style={styles.mapSearchContainer}>
            <Ionicons name="search" size={18} color="#888" />
            <TextInput
              style={styles.mapSearchInput}
              placeholder="Cari lokasi atau fasilitas..."
              placeholderTextColor="#aaa"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color="#aaa" />
              </TouchableOpacity>
            )}
          </View>
        )}
        
        {(appState === 1 || appState === 2) && (
          <MapControls mapRef={mapRef} initialRegion={INITIAL_REGION} />
        )}
        
        {(appState === 1 || appState === 2) && (
          <View style={styles.filterBtnContainer}>
            <TouchableOpacity style={styles.filterBtn} onPress={() => setAppState(2)}>
              <Ionicons name="options" size={20} color="#fff" />
              <Text style={styles.filterBtnText}>Filter Peta</Text>
            </TouchableOpacity>
          </View>
        )}

        {appState === 4 && (
          <HorizontalCards 
            filteredFacilities={filteredFacilities} 
            setAppState={setAppState} 
          />
        )}
        
        {/* FIX 2: Posisi dinamis tepat di atas BottomSheet */}
        {appState === 3 && (
          <View style={[styles.lihatPetaBtnContainer, { bottom: LIHAT_PETA_BOTTOM }]}>
            <TouchableOpacity style={styles.lihatPetaBtn} onPress={() => setAppState(4)}>
              <Ionicons name="map" size={20} color="#fff" />
              <Text style={styles.lihatPetaBtnText}>Lihat Peta</Text>
            </TouchableOpacity>
          </View>
        )}

        <FacilitiesBottomSheet 
          appState={appState}
          filteredFacilities={filteredFacilities}
          selectedType={selectedType}
        />
      </View>

      {(appState === 1 || appState === 2) && <BottomNav />}

      <FilterModal 
        visible={appState === 2} 
        setAppState={setAppState} 
        setSelectedType={setSelectedType} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  // --- Search input overlay di peta (State 1 & 2) ---
  mapSearchContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    gap: 10,
  },
  mapSearchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },

  // --- Tombol Filter Peta ---
  filterBtnContainer: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
  },
  filterBtn: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  filterBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 15,
  },

  // --- Tombol Lihat Peta ---
  lihatPetaBtnContainer: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 10,
  },
  lihatPetaBtn: {
    flexDirection: 'row',
    backgroundColor: '#FF3B30',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  lihatPetaBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 15,
  },
});
