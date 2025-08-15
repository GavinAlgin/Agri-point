// screens/Market.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const vendors = [
  {
    id: '1',
    name: 'Fresh Farm Produce',
    category: 'An local Vegetables vendor re-seller and distributor',
    icon: require('@/assets/images/mesh.jpg'),
    interest: 'Tomatoes',
  },
  {
    id: '2',
    name: 'Local Bakery',
    category: 'Breads & Pastries',
    icon: require('@/assets/images/mesh.jpg'),
    interest: 'Wheat Flour',
  },
  {
    id: '3',
    name: 'Organic Honey Co.',
    category: 'Honey',
    icon: require('@/assets/images/mesh.jpg'),
    interest: 'Wildflowers',
  },
];

const Market = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVendors, setFilteredVendors] = useState(vendors);

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

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
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Explore</Text>

        {/* Dropdown Button */}
        <View style={{ position: 'relative' }}>
          <TouchableOpacity onPress={toggleDropdown} style={{ marginRight: 12, padding: 12, borderRadius: 10, backgroundColor: '#f7f7f7', }}>
            <Ionicons name='ellipsis-vertical' size={20} color='black' />
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

      {/* Search and Filter */}
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

      {/* Vendor List */}
      <FlatList
        data={filteredVendors}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push('/(screens)/VendorDetailScreen')}>
            <View style={styles.card}>
              <Image source={item.icon} style={styles.icon} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.category}>{item.category}</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.interest}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Market;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
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
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#f8f8f8',
    borderWidth: 1,
    marginBottom: 12,
    alignItems: 'center',
  },
  icon: {
    width: 84,
    height: 84,
    marginRight: 12,
    borderRadius: 8,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  category: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  badge: {
    backgroundColor: '#103713',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  Favouritebtn: {
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#f7f7f7',
  }
});
