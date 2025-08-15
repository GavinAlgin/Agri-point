// import React, { useCallback, useRef, useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, FlatList, ActivityIndicator, ScrollView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
// import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'; 
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// const { width, height } = Dimensions.get('window');

// type CropOrLivestockData = {
//   image: string | null;
//   name: string;
//   type: string;
//   price: string;
//   description: string;
// };

// type EquipmentOrEmployeeData = {
//   name: string;
//   roleOrType: string;
//   details: string;
// };

// const FarmManagement = () => {
//   const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
//   const [isOpen, setIsOpen] = useState(true);
//   const [selectedTab, setSelectedTab] = useState('crops'); // 'crops', 'equipment', or 'employees'
//   const [formData, setFormData] = useState<CropOrLivestockData | EquipmentOrEmployeeData>({
//     image: null,
//     name: '',
//     type: '',
//     price: '',
//     description: '',
//   });
//   const [loading, setLoading] = useState(false); // Loading state
//   const [items, setItems] = useState<CropOrLivestockData[]>([]); // For crops and livestock
//   const [equipment, setEquipment] = useState<EquipmentOrEmployeeData[]>([]); // For equipment and employees
//   const [employees, setEmployees] = useState<EquipmentOrEmployeeData[]>([]); // For employees

//   const toggleBottomSheet = () => setBottomSheetVisible(!bottomSheetVisible);

//   const sheetRef = useRef<BottomSheet>(null);
//   const snapPoints = ["10%", "50%", "60%"];

//   const handleSnapPress = useCallback((index) => {
//     sheetRef.current?.snapToIndex(index);
//     setIsOpen(true);
//   }, []);

//   // Handle image selection for crops/livestock
//   const handleImagePick = async () => {
//     const result = await launchImageLibraryAsync({
//       mediaTypes: MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 1,
//     });
//     if (!result.canceled && result.assets?.length > 0) {
//       setFormData({ ...formData, image: result.assets[0].uri });
//     }
//   };

//   // Handle input changes
//   const handleInputChange = (name: string, value: string) => {
//     setFormData({ ...formData, [name]: value });
//   };

//   // Save Data
//   const handleSave = () => {
//     setLoading(true); // Start loading
//     setTimeout(() => {
//       if (selectedTab === 'crops') {
//         setItems((prevItems) => [...prevItems, formData as CropOrLivestockData]);
//       } else if (selectedTab === 'equipment') {
//         setEquipment((prev) => [...prev, formData as EquipmentOrEmployeeData]);
//       } else if (selectedTab === 'employees') {
//         setEmployees((prev) => [...prev, formData as EquipmentOrEmployeeData]);
//       }
//       setFormData({ image: null, name: '', type: '', price: '', description: '' });
//       setLoading(false); // Stop loading
//       toggleBottomSheet(); // Close the bottom sheet
//     }, 1000); // Simulate async save operation
//   };

//   // Render different item views
//   const renderItem = (item: CropOrLivestockData | EquipmentOrEmployeeData) => {
//     return (
//       <View style={styles.card}>
//         {item.image && <Image source={{ uri: item.image }} style={styles.cardImage} />}
//         <Text style={styles.cardTitle}>{item.name}</Text>
//         <Text style={styles.cardType}>{item.type}</Text>
//         <Text style={styles.cardPrice}>${item.price}</Text>
//         <Text style={styles.cardDescription}>{item.description}</Text>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: isOpen ? '#00000090' : '#fff' }]}>
//       <GestureHandlerRootView>
//       {/* Header */}
//       <View style={styles.headerContainer}>
//         <Text style={styles.headerText}>Farm Management</Text>
//         <TouchableOpacity onPress={toggleBottomSheet} style={styles.dropdownButton}>
//           <Ionicons name="ellipsis-vertical" size={20} color="black" />
//         </TouchableOpacity>
//       </View>

//       {/* Sliding Tabs */}
//       <View style={styles.tabContainer}>
//         <TouchableOpacity onPress={() => setSelectedTab('crops')} style={styles.tabButton}>
//           <Text style={styles.tabText}>Crops/Livestock</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setSelectedTab('equipment')} style={styles.tabButton}>
//           <Text style={styles.tabText}>Equipment</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setSelectedTab('employees')} style={styles.tabButton}>
//           <Text style={styles.tabText}>Employees</Text>
//         </TouchableOpacity>
//       </View>

//       {/* FlatList to display items based on selected tab */}
//       <ScrollView contentContainerStyle={styles.flatlistContainer}>
//         {selectedTab === 'crops' && items.map(renderItem)}
//         {selectedTab === 'equipment' && equipment.map(renderItem)}
//         {selectedTab === 'employees' && employees.map(renderItem)}
//       </ScrollView>

//       {/* Add Item Button */}
//       <TouchableOpacity onPress={() => handleSnapPress(0)} style={styles.addButton}>
//         <Text style={styles.addButtonText}>+ Add {selectedTab === 'crops' ? 'Crop/Livestock' : selectedTab === 'equipment' ? 'Equipment' : 'Employee'}</Text>
//       </TouchableOpacity>

//       {/* Bottom Sheet for Adding Items */}
//       <BottomSheet ref={sheetRef} snapPoints={snapPoints} enablePanDownToClose={true} onClose={() => setIsOpen(false)}>
//         <BottomSheetView style={styles.modalContent}>
//           <Text style={styles.modalTitle}>Add {selectedTab === 'crops' ? 'Crop/Livestock' : selectedTab === 'equipment' ? 'Equipment' : 'Employee'}</Text>

//           {/* Image Picker for Crops */}
//           {selectedTab === 'crops' && (
//             <TouchableOpacity onPress={handleImagePick} style={styles.imagePicker}>
//               {formData.image ? (
//                 <Image source={{ uri: formData.image }} style={styles.imagePreview} />
//               ) : (
//                 <Text style={styles.imagePickerText}>Pick Image</Text>
//               )}
//             </TouchableOpacity>
//           )}

//           {/* Inputs for Adding Data */}
//           <TextInput
//             style={styles.input}
//             placeholder="Name"
//             value={formData.name}
//             onChangeText={(text) => handleInputChange('name', text)}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Type/Role"
//             value={formData.type}
//             onChangeText={(text) => handleInputChange('type', text)}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Price/Details"
//             value={formData.price}
//             onChangeText={(text) => handleInputChange('price', text)}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Description"
//             value={formData.description}
//             onChangeText={(text) => handleInputChange('description', text)}
//           />

//           {/* Save Button */}
//           <TouchableOpacity onPress={handleSave} style={styles.saveButton} disabled={loading}>
//             {loading ? (
//               <ActivityIndicator size="small" color="#fff" />
//             ) : (
//               <Text style={styles.saveButtonText}>Save</Text>
//             )}
//           </TouchableOpacity>
//         </BottomSheetView>
//       </BottomSheet>
//       </GestureHandlerRootView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 16,
//     paddingHorizontal: 16,
//   },
//   headerText: {
//     fontSize: 28,
//     fontWeight: 'bold',
//   },
//   dropdownButton: {
//     padding: 10,
//     borderRadius: 8,
//     backgroundColor: '#f0f0f0',
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     paddingVertical: 10,
//     backgroundColor: '#f7f7f7',
//   },
//   tabButton: {
//     padding: 10,
//   },
//   tabText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   flatlistContainer: {
//     paddingBottom: 80, // Ensure space for the button
//   },
//   addButton: {
//     position: 'absolute',
//     bottom: 20,
//     left: width * 0.25,
//     width: width * 0.5,
//     padding: 15,
//     backgroundColor: '#4caf50',
//     borderRadius: 10,
//   },
//   addButtonText: {
//     textAlign: 'center',
//     color: '#fff',
//     fontSize: 18,
//   },
//   modalContent: {
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//   },
//   modalTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   imagePicker: {
//     padding: 20,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 10,
//     marginBottom: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   imagePreview: {
//     width: 100,
//     height: 100,
//     borderRadius: 10,
//   },
//   input: {
//     height: 45,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 10,
//     marginBottom: 15,
//     paddingHorizontal: 10,
//     fontSize: 16,
//   },
//   saveButton: {
//     paddingVertical: 12,
//     backgroundColor: '#103713',
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 10,
//     margin: 10,
//   },
//   cardImage: {
//     width: '100%',
//     height: 150,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   cardType: {
//     fontSize: 14,
//     color: '#555',
//   },
//   cardPrice: {
//     fontSize: 16,
//     color: '#103713',
//     marginTop: 5,
//   },
//   cardDescription: {
//     fontSize: 14,
//     color: '#555',
//     marginTop: 5,
//   },
// });

// export default FarmManagement;


import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const width = Dimensions.get('window').width;

const search = () => {
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Farm Management</Text>
          <TouchableOpacity style={styles.dropdownButton}>
            <Ionicons name="ellipsis-vertical" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.CardContainer}>
          <View style={styles.CardContent}>
            <Text style={styles.CardTitle}>12</Text>
            <Text>Crops / LiveStock</Text>
          </View>
          <View style={styles.CardContent}>
            <Text style={styles.CardTitle}>2</Text>
            <Text>Employess</Text>
          </View>
          <View style={styles.CardContent}>
            <Text style={styles.CardTitle}>8</Text>
            <Text>Equipment</Text>
          </View>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

export default search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  dropdownButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  CardContainer: {
    padding: width * 0.04,
  },
  CardContent: {
    padding: 18,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CardTitle: {},
});