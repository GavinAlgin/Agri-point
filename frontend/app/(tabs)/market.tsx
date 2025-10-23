import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image, TextInput, ImageBackground } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const vendors = [
  {
    id: '1',
    name: 'The Veggie Guy – Kgapane Phillip',
    category: 'Vegetable & Boer Goat Supplier (Burgersfort)',
    icon: require('@/assets/images/Maano-Khodani.jpg'),
    description: 'Runs a local farm in Mafarafara, supplying Joburg Market, Spar, Nando’s, and rearing prize Boer goats.',
    interest: 'Butternut, Mixed Vegetables, Boer goats',
  },
  {
    id: '2',
    name: 'Matome Cynthia Mokgobu',
    category: 'Vegetable Farmer (Bochum)',
    icon: require('@/assets/images/Farmer_EDIT.webp'),
    description: 'From Gemarke village, supplies Spar, Boxer with spinach, butternut, potatoes and more.',
    interest: 'Spinach, Butternut, Potatoes, Mustard',
  },
  {
    id: '3',
    name: 'AgriGreen (Makhado)',
    category: 'Fruit & Vegetable Supplier',
    icon: require('@/assets/images/mesh.jpg'),
    description: 'Produces avocados, corn, sweet potatoes, lemons and greens with delivery/pick-up services.',
    interest: 'Avocados, Corn, Sweet Potatoes, Lemons, Greens',
  },
  {
    id: '4',
    name: 'Agrinema Farm',
    category: 'Vegetables, Poultry & Ice',
    icon: require('@/assets/images/mesh.jpg'),
    description: 'Established in 2022; supplies premium vegetables, broiler chickens, and ice across Limpopo.',
    interest: 'Tomatoes, Onions, Spinach, Broiler Chickens, Ice Products',
  },
];

const services = [
  {
    title: 'Seeds',
    image: require('@/assets/images/apples.jpg'),
  },
  {
    title: 'Seedlings',
    image: require('@/assets/images/mesh.jpg'),
  },
  {
    title: 'Machinery',
    image: require('@/assets/images/mesh.jpg'),
  },
  {
    title: 'Hire Worker',
    image: require('@/assets/images/mesh.jpg'),
  },
  {
    title: 'Cultivation process',
    image: require('@/assets/images/mesh.jpg'),
  },
  {
    title: 'Crop disease solution',
    image: require('@/assets/images/mesh.jpg'),
  },
];

const MarketRoute = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVendors, setFilteredVendors] = useState(vendors);
  const router = useRouter();

  const handleSearch = () => {
    const filtered = vendors.filter(
      (v) =>
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.interest.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredVendors(filtered);
  };

  return (
    <View style={styles.scene}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search vendor or interest..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.filterBtn}>
          <Ionicons name='search' size={20} color='#fff' />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredVendors}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/(screens)/VendorDetailScreen',
                params: { vendor: JSON.stringify(item) },
              })
            }
          >
            <View style={styles.card}>
              <Image source={item.icon} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.interest}>{item.interest}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const ServicesRoute = () => (
  <FlatList
    data={services}
    keyExtractor={(item) => item.title}
    numColumns={2}
    contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10 }}
    renderItem={({ item }) => (
      <TouchableOpacity style={styles.serviceCard}>
        <ImageBackground source={item.image} style={styles.image} imageStyle={{ borderRadius: 10 }}>
          <View style={styles.overlay}>
            <Text style={styles.text}>{item.title}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    )}
  />
);

export default function MarketAndServices() {
  const [index, setIndex] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [routes] = useState([
    { key: 'market', title: 'Market' },
    { key: 'services', title: 'Services' },
  ]);

  const toggleDropdown = () => setDropdownVisible((prev) => !prev);

  const renderScene = SceneMap({
    market: MarketRoute,
    services: ServicesRoute,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Market</Text>
          <View style={{ position: 'relative' }}>
            <TouchableOpacity
              onPress={toggleDropdown}
              style={styles.iconButton}>
              <Ionicons name="ellipsis-vertical" size={20} color="black" />
            </TouchableOpacity>

            {dropdownVisible && (
              <View style={styles.dropdown}>
                <TouchableOpacity style={styles.dropdownItem}>
                  <Text>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownItem}>
                  <Text>Report</Text>
                </TouchableOpacity>
              </View>
          )}
        </View>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#000' }}
            style={{ backgroundColor: '#fff' }}
            labelStyle={{ color: '#000', fontWeight: 'bold' }}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.02,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  iconButton: {
    marginRight: 12,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
  },
  dropdown: {
    position: 'absolute',
    top: 36,
    right: 0,
    backgroundColor: '#f7f7f7',
    borderRadius: 6,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    width: 120,
    zIndex: 999,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
  },
  filterBtn: {
    backgroundColor: '#000',
    marginLeft: 8,
    padding: 10,
    borderRadius: 8,
  },
  list: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f7f7f7',
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  category: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  interest: {
    fontSize: 13,
    color: '#103713',
    fontWeight: '600',
    backgroundColor: '#e6f2e6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  serviceCard: {
    width: width / 2 - 20,
    height: 140,
    margin: 8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
