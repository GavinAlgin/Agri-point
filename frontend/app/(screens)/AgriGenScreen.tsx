
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Dimensions,
//   Image,
//   Alert,

// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useLocalSearchParams } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import BottomSheet from '@gorhom/bottom-sheet';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import Header from '@/components/CustomHeader';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// const windowHeight = Dimensions.get('window').height;

// // Government price data
// const governmentPrices = {
//   Tomatoes: 7,
//   Butternut: 6,
//   Spinach: 5,
//   Garlic: 10,
//   Corn: 4,
// };

// // Farmer inventory (can be fetched from a backend later)
// const availableRecords = {
//   Tomatoes: 100,
//   Butternut: 50,
//   Corn: 200,
//   Goat: 5,
//   Chicken: 20,
// };

// const cropsList = Object.keys(availableRecords);

// const VendorDetailScreen = () => {
//   const { vendor } = useLocalSearchParams();
//   const vendorData = JSON.parse(vendor || '{}');

//   const [sheetVisible, setSheetVisible] = useState(false);
//   const [pickedImage, setPickedImage] = useState(null);

//   const pickImage = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission needed', 'Enable access to your gallery.');
//       return;
//     }
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 0.7,
//       allowsEditing: true,
//     });
//     if (!result.canceled) {
//       setPickedImage(result.assets[0].uri);
//     }
//   };

//   const validationSchema = Yup.object().shape({
//     crop: Yup.string().required('Select a crop or livestock'),
//     amount: Yup.number()
//       .typeError('Amount must be a number')
//       .positive('Positive amount required')
//       .required('Amount is required')
//       .test('available-check', 'Exceeds available stock', function (value) {
//         const crop = this.parent.crop;
//         const available = availableRecords[crop] || 0;
//         return value <= available;
//       }),
//     price: Yup.number()
//       .typeError('Price must be a number')
//       .positive('Positive price required')
//       .required('Price is required')
//       .test('min-price-check', function (value) {
//         const crop = this.parent.crop;
//         const minPrice = governmentPrices[crop];
//         if (!minPrice) return true;
//         if (value < minPrice) {
//           return this.createError({
//             message: `Price must be at least R${minPrice}/kg for ${crop}`,
//           });
//         }
//         return true;
//       }),
//     delivery: Yup.string().required('Provide delivery method'),
//     payment: Yup.string().required('Provide payment terms'),
//   });

//   return (
//     <SafeAreaView style={styles.container}>
//       <GestureHandlerRootView>
//       <Header title="Vendor Details" />
//       <ScrollView contentContainerStyle={styles.contentContainer}>
//         <Image source={vendorData.icon} style={styles.image} />
//         <Text style={styles.name}>{vendorData.name}</Text>
//         <Text style={styles.category}>{vendorData.category}</Text>
//         <Text style={styles.interest}>
//           Specializing in: {vendorData.interest}
//         </Text>

//         <View style={styles.recordBox}>
//           <Text style={styles.recordTitle}>Your Farm Records</Text>
//           {Object.entries(availableRecords).map(([item, qty]) => (
//             <Text key={item} style={styles.recordItem}>
//               {item}: {qty} units
//             </Text>
//           ))}
//         </View>

//         <TouchableOpacity
//           style={styles.openSheetButton}
//           onPress={() => setSheetVisible(true)}
//         >
//           <Ionicons name="chatbubbles" size={22} color="#fff" />
//           <Text style={styles.openSheetText}>Propose Deal</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* BOTTOM SHEET */}
//       <BottomSheet
//         visible={sheetVisible}
//         onBackButtonPress={() => setSheetVisible(false)}
//         onBackdropPress={() => setSheetVisible(false)}
//       >
//         <View style={styles.bottomSheetContainer}>
//           <Text style={styles.sheetTitle}>Send Proposal to {vendorData.name}</Text>
//           <ScrollView>
//             <Formik
//               initialValues={{
//                 crop: '',
//                 amount: '',
//                 price: '',
//                 delivery: '',
//                 payment: '',
//               }}
//               validationSchema={validationSchema}
//               onSubmit={(values) => {
//                 const total = (parseFloat(values.amount) * parseFloat(values.price)).toFixed(2);
//                 Alert.alert('Proposal Sent', `
// Crop: ${values.crop}
// Amount: ${values.amount} kg
// Price: R${values.price}/kg
// Total: R${total}
// Delivery: ${values.delivery}
// Payment: ${values.payment}
//                 `);
//                 setSheetVisible(false);
//               }}
//             >
//               {({
//                 handleChange,
//                 handleBlur,
//                 handleSubmit,
//                 values,
//                 errors,
//                 touched,
//                 setFieldValue,
//               }) => {
//                 const total =
//                   values.amount && values.price
//                     ? (parseFloat(values.amount) * parseFloat(values.price)).toFixed(2)
//                     : '0.00';

//                 return (
//                   <>
//                     <Text style={styles.label}>Select Crop / Livestock</Text>
//                     <View style={styles.dropdown}>
//                       {cropsList.map((crop) => (
//                         <TouchableOpacity
//                           key={crop}
//                           onPress={() => setFieldValue('crop', crop)}
//                           style={[
//                             styles.dropdownItem,
//                             values.crop === crop && { backgroundColor: '#cce5cc' },
//                           ]}
//                         >
//                           <Text>{crop}</Text>
//                         </TouchableOpacity>
//                       ))}
//                     </View>
//                     {touched.crop && errors.crop && (
//                       <Text style={styles.error}>{errors.crop}</Text>
//                     )}

//                     <Text style={styles.label}>
//                       Available: {values.crop ? availableRecords[values.crop] : '-'} units
//                     </Text>

//                     <Text style={styles.label}>Amount (kg/units)</Text>
//                     <TextInput
//                       style={styles.input}
//                       keyboardType="numeric"
//                       onChangeText={handleChange('amount')}
//                       onBlur={handleBlur('amount')}
//                       value={values.amount}
//                       placeholder="Enter amount"
//                     />
//                     {touched.amount && errors.amount && (
//                       <Text style={styles.error}>{errors.amount}</Text>
//                     )}

//                     <Text style={styles.label}>Price per unit (R)</Text>
//                     <TextInput
//                       style={styles.input}
//                       keyboardType="numeric"
//                       onChangeText={handleChange('price')}
//                       onBlur={handleBlur('price')}
//                       value={values.price}
//                       placeholder="Enter price"
//                     />
//                     {touched.price && errors.price && (
//                       <Text style={styles.error}>{errors.price}</Text>
//                     )}

//                     <Text style={styles.label}>Estimated Total: R{total}</Text>

//                     <Text style={styles.label}>Delivery Method</Text>
//                     <TextInput
//                       style={styles.input}
//                       onChangeText={handleChange('delivery')}
//                       onBlur={handleBlur('delivery')}
//                       value={values.delivery}
//                       placeholder="e.g., Delivery, On-site pickup"
//                     />
//                     {touched.delivery && errors.delivery && (
//                       <Text style={styles.error}>{errors.delivery}</Text>
//                     )}

//                     <Text style={styles.label}>Payment Terms</Text>
//                     <TextInput
//                       style={styles.input}
//                       onChangeText={handleChange('payment')}
//                       onBlur={handleBlur('payment')}
//                       value={values.payment}
//                       placeholder="e.g., Cash on delivery"
//                     />
//                     {touched.payment && errors.payment && (
//                       <Text style={styles.error}>{errors.payment}</Text>
//                     )}

//                     <TouchableOpacity
//                       style={styles.uploadButton}
//                       onPress={pickImage}
//                     >
//                       <Ionicons name="camera" size={20} color="#fff" />
//                       <Text style={styles.uploadText}>
//                         {pickedImage ? 'Change Image' : 'Upload Sample Image'}
//                       </Text>
//                     </TouchableOpacity>
//                     {pickedImage && (
//                       <Image
//                         source={{ uri: pickedImage }}
//                         style={styles.previewImage}
//                       />
//                     )}

//                     <TouchableOpacity
//                       style={styles.submitButton}
//                       onPress={handleSubmit}
//                     >
//                       <Text style={styles.submitText}>Send Proposal</Text>
//                     </TouchableOpacity>
//                   </>
//                 );
//               }}
//             </Formik>
//           </ScrollView>
//         </View>
//       </BottomSheet>
//       </GestureHandlerRootView>
//     </SafeAreaView>
//   );
// };

// export default VendorDetailScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   contentContainer: { padding: 20, alignItems: 'center' },
//   image: { width: '100%', height: 180, borderRadius: 12, marginBottom: 16 },
//   name: { fontSize: 22, fontWeight: 'bold', color: '#1a1a1a' },
//   category: { fontSize: 16, color: '#666', marginBottom: 8 },
//   interest: { fontSize: 15, fontStyle: 'italic', color: '#447744', marginBottom: 20 },
//   recordBox: {
//     width: '100%',
//     backgroundColor: '#f5f5f5',
//     borderRadius: 10,
//     padding: 16,
//     marginBottom: 20,
//   },
//   recordTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
//   recordItem: { fontSize: 14, marginBottom: 4 },
//   openSheetButton: {
//     flexDirection: 'row',
//     backgroundColor: '#103713',
//     padding: 14,
//     width: '100%',
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 8,
//   },
//   openSheetText: { color: '#fff', fontWeight: '600', fontSize: 16 },

//   bottomSheetContainer: {
//     maxHeight: windowHeight * 0.9,
//     backgroundColor: '#fff',
//     padding: 20,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//   },
//   sheetTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16, textAlign: 'center' },

//   label: { fontSize: 14, fontWeight: '500', marginTop: 10 },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 10,
//     fontSize: 16,
//     backgroundColor: '#fefefe',
//     marginBottom: 6,
//   },
//   error: { fontSize: 12, color: '#c00', marginTop: 2 },

//   dropdown: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//     marginBottom: 10,
//   },
//   dropdownItem: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     marginBottom: 6,
//   },

//   uploadButton: {
//     flexDirection: 'row',
//     backgroundColor: '#2e7d32',
//     padding: 12,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 10,
//     gap: 8,
//   },
//   uploadText: { color: '#fff', fontSize: 16 },
//   previewImage: {
//     width: '100%',
//     height: 160,
//     marginTop: 10,
//     borderRadius: 8,
//   },

//   submitButton: {
//     backgroundColor: '#1b5e20',
//     padding: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   submitText: { color: '#fff', fontWeight: '600', fontSize: 16 },
// });
