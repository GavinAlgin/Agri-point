import React, { useRef, useState, useCallback } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, Dimensions, 
  FlatList, Image, TextInput 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

const width = Dimensions.get('window').width;
const defaultImage = require('@/assets/images/mesh.jpg');

// ----- Initial Data -----
const initialCrops = [
  { id: '1', name: 'Tomatoes', category: '12.000 arces | ', icon: defaultImage, interest: 'Raw' },
  { id: '2', name: 'Corn', category: '6.000 arces', icon: defaultImage, interest: 'Processing' },
];
const initialLivestock = [
  { id: '3', name: 'Cattle Farm', category: 'Dairy and Meat', icon: defaultImage, weight: '200kg', condition: 'Healthy' },
  { id: '4', name: 'Chicken Coop', category: 'Eggs & Poultry', icon: defaultImage, weight: '2kg', condition: 'Good' },
];
const initialEquipment = [
  { id: '5', name: 'Tractor', category: 'Machinery', icon: defaultImage, operatingTime: '5h', status: 'Started' },
];

// ----- Component -----
const FarmManagement = () => {
  const router = useRouter();
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = ['50%', '75%'];
  const [isOpen, setIsOpen] = useState(false);

  // Tab handling
  const [index, setIndex] = useState(0);
  const routes = [
    { key: 'crops', title: 'Crops' },
    { key: 'livestock', title: 'Livestock' },
    { key: 'equipment', title: 'Equipment' },
  ];

  // State for each list
  const [crops, setCrops] = useState(initialCrops);
  const [livestock, setLivestock] = useState(initialLivestock);
  const [equipment, setEquipment] = useState(initialEquipment);

  // Form state
  const [form, setForm] = useState({
    name: '',
    category: '',
    interest: '',
    icon: null as string | null,
    weight: '',
    condition: '',
    operatingTime: '',
    status: 'Not Started',
  });

  const openSheet = useCallback(() => {
    sheetRef.current?.snapToIndex(0);
    setIsOpen(true);
  }, []);

  // Pick image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setForm({ ...form, icon: result.assets[0].uri });
    }
  };

  // Handle submit
  const handleSubmit = () => {
    if (!form.name || !form.category) {
      alert('Name and Category are required!');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: form.name,
      category: form.category,
      interest: form.interest,
      icon: form.icon ? { uri: form.icon } : defaultImage,
      weight: form.weight,
      condition: form.condition,
      operatingTime: form.operatingTime,
      status: form.status,
    };

    if (index === 0) setCrops([...crops, newItem]);
    if (index === 1) setLivestock([...livestock, newItem]);
    if (index === 2) setEquipment([...equipment, newItem]);

    setForm({ 
      name: '', category: '', interest: '', icon: null, 
      weight: '', condition: '', operatingTime: '', status: 'Not Started'
    });
    sheetRef.current?.close();
    setIsOpen(false);
  };

  // FlatList renderer
  const renderList = (data: any[], type: string) => (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => router.push('/(screens)/PlantingGuide')}>
          <View style={styles.card}>
            <Image source={item.icon} style={styles.icon} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>

              {/* Dynamic fields */}
              {type === 'crops' && item.interest ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.interest}</Text>
                </View>
              ) : null}

              {type === 'livestock' && (
                <View>
                  <Text style={styles.extraText}>Weight: {item.weight || '-'}</Text>
                  <Text style={styles.extraText}>Condition: {item.condition || '-'}</Text>
                </View>
              )}

              {type === 'equipment' && (
                <View>
                  <Text style={styles.extraText}>Operating Time: {item.operatingTime || '-'}</Text>
                  <Text style={styles.extraText}>Status: {item.status || '-'}</Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Farm Management</Text>
          <TouchableOpacity style={styles.dropdownButton}>
            <Ionicons name="ellipsis-vertical" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.CardContainer}>
          <View style={styles.CardList}>
            <View style={styles.CardContent}>
              <Text style={styles.CardTitle}>
                {crops.length + livestock.length + equipment.length}
              </Text>
              <Text>Total Items</Text>
            </View>
            <View style={styles.CardContent}>
              <Text style={styles.CardTitle}>{livestock.length}</Text>
              <Text>Livestock</Text>
            </View>
            <View style={styles.CardContent}>
              <Text style={styles.CardTitle}>{equipment.length}</Text>
              <Text>Equipment</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {routes.map((route, idx) => (
            <TouchableOpacity
              key={route.key}
              style={[styles.tabButton, index === idx && styles.activeTab]}
              onPress={() => setIndex(idx)}
            >
              <Text style={[styles.tabText, index === idx && styles.activeTabText]}>
                {route.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lists */}
        {index === 0 && renderList(crops, 'crops')}
        {index === 1 && renderList(livestock, 'livestock')}
        {index === 2 && renderList(equipment, 'equipment')}

        {/* Add Button */}
        <View style={styles.BtnContainer}>
          <TouchableOpacity style={styles.addCrop} onPress={openSheet}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>Add to Farm</Text>
          </TouchableOpacity>
        </View>

        {/* Overlay */}
        {isOpen && <View style={styles.overlay} />}

        {/* Bottom Sheet Form */}
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={() => setIsOpen(false)}>
          <BottomSheetView style={styles.BottomSheetContent}>
            <Text style={styles.sheetTitle}>Add New {routes[index].title}</Text>

            <TouchableOpacity onPress={pickImage}>
              <Image 
                source={form.icon ? { uri: form.icon } : defaultImage} 
                style={styles.uploadPreview} 
              />
              <View style={{ padding: 10, borderRadius: 10, backgroundColor: '#ddd', alignItems: 'center', marginBottom: 12, }}>
                <Text style={styles.uploadText}>Upload Image</Text>
              </View>
            </TouchableOpacity>

            {/* Common Fields */}
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Category"
              value={form.category}
              onChangeText={(text) => setForm({ ...form, category: text })}
            />

            {/* Conditional fields */}
            {index === 0 && (
              <TextInput
                style={styles.input}
                placeholder="Interest (optional)"
                value={form.interest}
                onChangeText={(text) => setForm({ ...form, interest: text })}
              />
            )}

            {index === 1 && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Weight (e.g., 120kg)"
                  value={form.weight}
                  onChangeText={(text) => setForm({ ...form, weight: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Condition (e.g., Healthy)"
                  value={form.condition}
                  onChangeText={(text) => setForm({ ...form, condition: text })}
                />
              </>
            )}

            {index === 2 && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Operating Time (e.g., 3h)"
                  value={form.operatingTime}
                  onChangeText={(text) => setForm({ ...form, operatingTime: text })}
                />
                <View style={styles.statusRow}>
                  <Text style={{ fontWeight: '600', marginBottom: 6 }}>Status:</Text>
                  {['Started', 'Not Started'].map((opt) => (
                    <TouchableOpacity
                      key={opt}
                      style={[
                        styles.statusOption,
                        form.status === opt && styles.activeStatus,
                      ]}
                      onPress={() => setForm({ ...form, status: opt })}
                    >
                      <Text style={[
                        styles.statusText, 
                        form.status === opt && styles.activeStatusText
                      ]}>
                        {opt}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            {/* Submit pinned bottom */}
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default FarmManagement;

// ----- Styles -----
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
  headerText: { fontSize: 28, fontWeight: 'bold' },
  dropdownButton: { padding: 10, borderRadius: 8, backgroundColor: '#f0f0f0' },
  CardContainer: { padding: width * 0.04 },
  CardList: { padding: 16, borderRadius: 10, backgroundColor: '#f7f7f7', flexDirection: 'row', justifyContent: 'space-between' },
  CardContent: { padding: 12 },
  CardTitle: { fontSize: 20, fontWeight: 'bold' },
  list: { padding: 16 },
  card: { flexDirection: 'row', padding: 16, backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#eee', marginBottom: 12 },
  icon: { width: 84, height: 84, marginRight: 12, borderRadius: 8 },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: '600' },
  category: { fontSize: 14, color: '#555', marginTop: 4 },
  badge: { backgroundColor: '#103713', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginTop: 6, alignSelf: 'flex-start' },
  badgeText: { fontSize: 12, color: '#fff', fontWeight: '600' },
  extraText: { fontSize: 14, color: '#333', marginTop: 4 },
  addCrop: { padding: width * 0.04, backgroundColor: '#103713', borderRadius: 10, alignItems: 'center' },
  BtnContainer: { padding: width * 0.04 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  tabContainer: { flexDirection: 'row', marginHorizontal: 16, marginBottom: 12, borderRadius: 8, backgroundColor: '#f2f2f2', overflow: 'hidden' },
  tabButton: { flex: 1, paddingVertical: 10, alignItems: 'center' },
  activeTab: { backgroundColor: '#103713' },
  tabText: { fontSize: 16, color: '#333' },
  activeTabText: { color: '#fff', fontWeight: '600' },

  // Bottom Sheet
  BottomSheetContent: { flex: 1, padding: 16, justifyContent: 'flex-start' },
  sheetTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  uploadPreview: { width: 100, height: 100, borderRadius: 10, marginBottom: 8 },
  uploadText: { color: 'black', fontWeight: 'bold', },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, marginBottom: 12 },
  submitBtn: { backgroundColor: '#103713', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 'auto' },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  // Status buttons
  statusRow: { flexDirection: 'row', marginVertical: 8, gap: 8, alignItems: 'center' },
  statusOption: { paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 },
  activeStatus: { backgroundColor: '#103713', borderColor: '#103713' },
  statusText: { fontSize: 14, color: '#333' },
  activeStatusText: { color: '#fff', fontWeight: '600' },
});
