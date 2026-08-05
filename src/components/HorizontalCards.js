import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HorizontalCards({ filteredFacilities, setAppState }) {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.horizontalCardsContainer, { bottom: Math.max(insets.bottom + 10, 20) }]}>
      <FlatList
        data={filteredFacilities}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        snapToInterval={width * 0.8 + 20}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item }) => (
          <View style={[styles.card, styles.horizontalCard]}>
            <Image source={{ uri: `https://picsum.photos/seed/${item.id}/200/150` }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardType}>{item.type}</Text>
              <Text style={styles.cardAddress} numberOfLines={2}>{item.address}</Text>
              <TouchableOpacity style={styles.detailBtn}>
                <Text style={styles.detailBtnText}>Lihat Detail</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.backToListBtn} onPress={() => setAppState(3)}>
        <Ionicons name="list" size={20} color="#fff" />
        <Text style={styles.backToListText}>Kembali ke List</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  horizontalCardsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },
  horizontalCard: {
    width: width * 0.8,
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    height: 140,
  },
  cardImage: {
    width: 100,
    height: '100%',
  },
  cardContent: {
    flex: 1,
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardType: {
    fontSize: 12,
    color: '#007AFF',
    marginBottom: 8,
  },
  cardAddress: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  detailBtn: {
    marginTop: 'auto',
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  detailBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  backToListBtn: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 12,
  },
  backToListText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
});
