// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Modal,
//   Pressable,
//   StyleSheet,
//   Animated,
//   Easing,
//   ScrollView,
// } from 'react-native';
// import { MaterialCommunityIcons, Entypo, Feather } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';

// const CropSelector = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectionMode, setSelectionMode] = useState(false);
//   const [crops, setCrops] = useState([]);
//   const [selectedIndexes, setSelectedIndexes] = useState([]);
//   const [newCrop, setNewCrop] = useState({ name: '', area: '', location: '' });

//   const animationsRef = useRef([]);
//   const router = useRouter();

//   // 🌾 Icon Matching
//   const getIcon = (name: string) => {
//     const key = name.toLowerCase();
//     if (key.includes('grape')) return 'fruit-grapes-outline';
//     if (key.includes('watermelon')) return 'fruit-watermelon';
//     if (key.includes('apple')) return 'food-apple-outline';
//     if (key.includes('banana')) return 'food-apple';
//     if (key.includes('corn')) return 'corn';
//     if (key.includes('rice')) return 'rice';
//     if (key.includes('wheat')) return 'wheat';
//     if (key.includes('tomato')) return 'food-variant';
//     if (key.includes('carrot')) return 'carrot';
//     if (key.includes('pepper')) return 'chili-mild-outline';
//     return 'leaf';
//   };

//   const handleAddCrop = () => {
//     if (!newCrop.name || !newCrop.area || !newCrop.location) return;

//     const newCropObj = { ...newCrop };
//     setCrops([...crops, newCropObj]);
//     animationsRef.current.push(new Animated.Value(1));
//     setNewCrop({ name: '', area: '', location: '' });
//     setModalVisible(false);
//   };

//   const toggleSelection = (index: number) => {
//     if (!selectionMode) return;

//     setSelectedIndexes((prev) =>
//       prev.includes(index)
//         ? prev.filter((i) => i !== index)
//         : [...prev, index]
//     );
//   };

//   const enterSelectionMode = (index: number) => {
//     setSelectionMode(true);
//     setSelectedIndexes([index]);
//   };

//   const deleteSelected = () => {
//     selectedIndexes.forEach((index) => {
//       const anim = animationsRef.current[index];
//       Animated.timing(anim, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//         easing: Easing.out(Easing.ease),
//       }).start(() => {
//         animationsRef.current.splice(index, 1);
//         setCrops((prev) =>
//           prev.filter((_, i) => !selectedIndexes.includes(i))
//         );
//         setSelectedIndexes([]);
//         setSelectionMode(false);
//       });
//     });
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.categories}>
//         {crops.map((crop, index) => {
//           const iconName = getIcon(crop.name);
//           if (!animationsRef.current[index]) {
//             animationsRef.current[index] = new Animated.Value(1);
//           }

//           const isSelected = selectedIndexes.includes(index);

//           return (
//             <Animated.View
//               key={index}
//               style={{
//                 transform: [{ scale: animationsRef.current[index] }],
//                 opacity: animationsRef.current[index],
//               }}>
//               <Pressable
//                 style={[
//                   styles.categoryBtn,
//                   isSelected && styles.selectedBtn,
//                 ]}
//                 onPress={() => toggleSelection(index)}
//                 onLongPress={() => enterSelectionMode(index)}>
//                 <MaterialCommunityIcons name={iconName} size={26} color="black" />
//               </Pressable>
//             </Animated.View>
//           );
//         })}

//         {/* Plus or Delete Selected Button */}
//         <Pressable
//           onPress={() => {
//             if (selectionMode) {
//               deleteSelected();
//             } else {
//               setModalVisible(true);
//             }
//           }}
//           style={[
//             styles.categoryBtn,
//             {
//               backgroundColor: selectionMode ? '#ffdddd' : '#f7f7f7',
//             },
//           ]}>
//           <Entypo
//             name={selectionMode ? 'trash' : 'plus'}
//             size={26}
//             color={selectionMode ? 'red' : 'black'}
//           />
//         </Pressable>
//       </ScrollView>

//       {/* Modal Bottom Sheet */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Pressable
//               style={styles.closeIcon}
//               onPress={() => setModalVisible(false)}
//               hitSlop={10}>
//               <Feather name="x" size={22} color="#333" />
//             </Pressable>

//             <Text style={styles.modalTitle}>Add New Crop</Text>

//             <TextInput
//               placeholder="Crop Name (e.g. Apple)"
//               value={newCrop.name}
//               onChangeText={(text) => setNewCrop({ ...newCrop, name: text })}
//               style={styles.input}
//             />
//             <TextInput
//               placeholder="Area (sq meters)"
//               keyboardType="numeric"
//               value={newCrop.area}
//               onChangeText={(text) => setNewCrop({ ...newCrop, area: text })}
//               style={styles.input}
//             />
//             <TextInput
//               placeholder="Location"
//               value={newCrop.location}
//               onChangeText={(text) => setNewCrop({ ...newCrop, location: text })}
//               style={styles.input}
//             />

//             <Pressable style={styles.submitBtn} onPress={handleAddCrop}>
//               <Text style={styles.submitText}>Submit</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default CropSelector;

// const styles = StyleSheet.create({
//   categories: {
//     flexDirection: 'row',
//     gap: 10,
//     alignItems: 'center',
//   },
//   categoryBtn: {
//     padding: 16,
//     borderRadius: 10,
//     backgroundColor: '#f7f7f7',
//     width: 60,
//     alignItems: 'center',
//   },
//   selectedBtn: {
//     borderWidth: 2,
//     borderColor: 'red',
//     backgroundColor: '#ffe6e6',
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0,0,0,0.4)',
//   },
//   modalContainer: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderTopRightRadius: 20,
//     borderTopLeftRadius: 20,
//     position: 'relative',
//   },
//   closeIcon: {
//     position: 'absolute',
//     top: 12,
//     right: 12,
//     zIndex: 10,
//     padding: 10,
//     borderRadius: 10,
//     backgroundColor: '#f7f7f7'
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 12,
//     paddingTop: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 10,
//   },
//   submitBtn: {
//     backgroundColor: '#103713',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   submitText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
// });

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  Pressable,
  StyleSheet,
  Animated,
  Easing,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {
  MaterialCommunityIcons,
  Entypo,
  Feather,
} from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const CropSelector = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [crops, setCrops] = useState([]);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [newCrop, setNewCrop] = useState({
    name: '',
    area: '',
    location: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const animationsRef = useRef([]);
  const router = useRouter();

  // 🌾 Icon Matching
  const getIcon = (name: string) => {
    const key = name.toLowerCase();
    if (key.includes('grape')) return 'fruit-grapes-outline';
    if (key.includes('watermelon')) return 'fruit-watermelon';
    if (key.includes('apple')) return 'food-apple-outline';
    if (key.includes('banana')) return 'food-apple';
    if (key.includes('corn')) return 'corn';
    if (key.includes('rice')) return 'rice';
    if (key.includes('wheat')) return 'wheat';
    if (key.includes('tomato')) return 'food-variant';
    if (key.includes('carrot')) return 'carrot';
    if (key.includes('pepper')) return 'chili-mild-outline';
    return 'leaf';
  };

  const handleAddCrop = async () => {
    if (!newCrop.name || !newCrop.area || !newCrop.location) {
      setErrorMessage('All fields are required.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // 🔹 Replace with your Django backend URL
      const response = await fetch('http://your-backend-url/api/crops/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCrop),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || 'Failed to submit crop. Try again.'
        );
      }
      ToastAndroid.show("Failed to submit crop, Try Again.",  ToastAndroid.SHORT);

      const newCropObj = { ...newCrop };
      setCrops([...crops, newCropObj]);
      animationsRef.current.push(new Animated.Value(1));
      setNewCrop({ name: '', area: '', location: '' });
      setModalVisible(false);
    } catch (error: any) {
      console.error('Submit Error:', error);
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSelection = (index: number) => {
    if (!selectionMode) return;
    setSelectedIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const enterSelectionMode = (index: number) => {
    setSelectionMode(true);
    setSelectedIndexes([index]);
  };

  const deleteSelected = () => {
    selectedIndexes.forEach((index) => {
      const anim = animationsRef.current[index];
      Animated.timing(anim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start(() => {
        animationsRef.current.splice(index, 1);
        setCrops((prev) =>
          prev.filter((_, i) => !selectedIndexes.includes(i))
        );
        setSelectedIndexes([]);
        setSelectionMode(false);
      });
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}>
        {crops.map((crop, index) => {
          const iconName = getIcon(crop.name);
          if (!animationsRef.current[index]) {
            animationsRef.current[index] = new Animated.Value(1);
          }

          const isSelected = selectedIndexes.includes(index);

          return (
            <Animated.View
              key={index}
              style={{
                transform: [{ scale: animationsRef.current[index] }],
                opacity: animationsRef.current[index],
              }}>
              <Pressable
                style={[
                  styles.categoryBtn,
                  isSelected && styles.selectedBtn,
                ]}
                onPress={() => {
                  if (selectionMode) {
                    toggleSelection(index);
                  } else {
                    // 👇 Navigate with crop details
                    router.push({
                      pathname: '/crop-details',
                      params: {
                        name: crop.name,
                        area: crop.area,
                        location: crop.location,
                      },
                    });
                  }
                }}
                onLongPress={() => enterSelectionMode(index)}>
                <MaterialCommunityIcons
                  name={iconName}
                  size={26}
                  color="black"
                />
              </Pressable>
            </Animated.View>
          );
        })}

        {/* ➕ Plus or 🗑️ Delete Button */}
        <Pressable
          onPress={() => {
            if (selectionMode) {
              deleteSelected();
            } else {
              setModalVisible(true);
            }
          }}
          style={[
            styles.categoryBtn,
            {
              backgroundColor: selectionMode ? '#ffdddd' : '#f7f7f7',
            },
          ]}>
          <Entypo
            name={selectionMode ? 'trash' : 'plus'}
            size={26}
            color={selectionMode ? 'red' : 'black'}
          />
        </Pressable>
      </ScrollView>

      {/* Modal Bottom Sheet */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Pressable
              style={styles.closeIcon}
              onPress={() => {
                setModalVisible(false);
                setErrorMessage('');
              }}
              hitSlop={10}>
              <Feather name="x" size={22} color="#333" />
            </Pressable>

            <Text style={styles.modalTitle}>Add New Crop</Text>

            <TextInput
              placeholder="Crop Name (e.g. Apple)"
              value={newCrop.name}
              onChangeText={(text) =>
                setNewCrop({ ...newCrop, name: text })
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Area (sq meters)"
              keyboardType="numeric"
              value={newCrop.area}
              onChangeText={(text) =>
                setNewCrop({ ...newCrop, area: text })
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Location"
              value={newCrop.location}
              onChangeText={(text) =>
                setNewCrop({ ...newCrop, location: text })
              }
              style={styles.input}
            />

            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}

            <Pressable
              style={[
                styles.submitBtn,
                isSubmitting && { opacity: 0.7 },
              ]}
              onPress={handleAddCrop}
              disabled={isSubmitting}>
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitText}>Submit</Text>
              )}
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CropSelector;

const styles = StyleSheet.create({
  categories: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  categoryBtn: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    width: 60,
    alignItems: 'center',
  },
  selectedBtn: {
    borderWidth: 2,
    borderColor: 'red',
    backgroundColor: '#ffe6e6',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    paddingTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  submitBtn: {
    backgroundColor: '#103713',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
    marginTop: -5,
  },
});
