import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated, Dimensions, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

// Expor konstanta ini agar komponen lain bisa tahu tinggi BottomSheet
export const BOTTOM_SHEET_HEIGHT = height * 0.5;

export default function FacilitiesBottomSheet({ 
  appState, 
  filteredFacilities, 
  selectedType 
}) {
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (appState === 3) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 10,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [appState]);

  const renderFacilityCard = ({ item }) => (
    <View style={styles.card}>
      <Image 
        source={{ uri: `https://picsum.photos/seed/${item.id}/200/150` }} 
        style={styles.cardImage} 
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardType}>{item.type}</Text>
        <Text style={styles.cardAddress} numberOfLines={2}>{item.address}</Text>
        <View style={styles.phoneRow}>
          <Ionicons name="call-outline" size={13} color="#666" />
          <Text style={styles.cardPhone}> {item.phone}</Text>
        </View>
      </View>
    </View>
  );

  if (appState !== 3) return null;

  return (
    <Animated.View 
      style={[
        styles.bottomSheet,
        { transform: [{ translateY: slideAnim }] }
      ]}
    >
      <View style={styles.handleBar} />
      <View style={styles.bottomSheetHeader}>
        <Text style={styles.bottomSheetTitle}>
          Daftar {selectedType || 'Fasilitas'}
        </Text>
        <Text style={styles.countText}>{filteredFacilities.length} lokasi</Text>
      </View>
      <FlatList
        data={filteredFacilities}
        keyExtractor={i => i.id}
        renderItem={renderFacilityCard}
        contentContainerStyle={styles.bottomSheetContent}
        showsVerticalScrollIndicator={false}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: BOTTOM_SHEET_HEIGHT,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 15,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  bottomSheetTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  countText: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: '500',
  },
  bottomSheetContent: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardImage: {
    width: 90,
    height: 100,
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#1a1a1a',
  },
  cardType: {
    fontSize: 11,
    color: '#007AFF',
    marginBottom: 5,
    fontWeight: '500',
  },
  cardAddress: {
    fontSize: 11,
    color: '#888',
    marginBottom: 6,
    lineHeight: 16,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardPhone: {
    fontSize: 11,
    color: '#666',
  },
});
