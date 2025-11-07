import React, { useState, useRef, useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const CropSelector = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [crops, setCrops] = useState([]);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [newCrop, setNewCrop] = useState({ name: '', area: '', location: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const animationsRef = useRef([]);
  const router = useRouter();

  const getIcon = (name) => {
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

  const loadStoredCrops = async () => {
    try {
      const stored = await AsyncStorage.getItem('userCrops');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    const fetchCrops = async () => {
      const stored = await loadStoredCrops();
      setCrops(stored);
      animationsRef.current = stored.map(() => new Animated.Value(1));
    };
    fetchCrops();
  }, []);

  const handleAddCrop = async () => {
    if (!newCrop.name || !newCrop.area || !newCrop.location) {
      setErrorMessage('All fields are required.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const updatedCrops = [...crops, newCrop];
      await AsyncStorage.setItem('userCrops', JSON.stringify(updatedCrops));
      ToastAndroid.show('Crop saved!', ToastAndroid.SHORT);

      setCrops(updatedCrops);
      animationsRef.current.push(new Animated.Value(1));
      setNewCrop({ name: '', area: '', location: '' });
      setModalVisible(false);
    } catch (error) {
      setErrorMessage('Failed to save crop.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSelection = (index) => {
    if (!selectionMode) return;
    setSelectedIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const enterSelectionMode = (index) => {
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
        AsyncStorage.setItem('userCrops', JSON.stringify(
          crops.filter((_, i) => !selectedIndexes.includes(i))
        ));
      });
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>
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
                style={[styles.categoryBtn, isSelected && styles.selectedBtn]}
                onPress={() => {
                  if (selectionMode) {
                    toggleSelection(index);
                  } else {
                    router.push({
                      pathname: '/(screens)/EducateScreen',
                      params: {
                        crop: JSON.stringify(crop),
                      },
                    });
                  }
                }}
                onLongPress={() => enterSelectionMode(index)}>
                <MaterialCommunityIcons name={iconName} size={26} color="black" />
              </Pressable>
            </Animated.View>
          );
        })}

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
            { backgroundColor: selectionMode ? '#ffdddd' : '#f7f7f7' },
          ]}>
          <Entypo name={selectionMode ? 'trash' : 'plus'} size={26} color={selectionMode ? 'red' : 'black'} />
        </Pressable>
      </ScrollView>

      {/* Modal Bottom Sheet */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Pressable style={styles.closeIcon} onPress={() => {
              setModalVisible(false);
              setErrorMessage('');
            }} hitSlop={10}>
              <Feather name="x" size={22} color="#333" />
            </Pressable>

            <Text style={styles.modalTitle}>Add New Crop</Text>

            <TextInput
              placeholder="Enter Crop / Livestock"
              value={newCrop.name}
              onChangeText={(text) => setNewCrop({ ...newCrop, name: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Enter Arces"
              keyboardType="numeric"
              value={newCrop.area}
              onChangeText={(text) => setNewCrop({ ...newCrop, area: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Enter Location"
              value={newCrop.location}
              onChangeText={(text) => setNewCrop({ ...newCrop, location: text })}
              style={styles.input}
            />

            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}

            <Pressable style={[styles.submitBtn, isSubmitting && { opacity: 0.7 }]} onPress={handleAddCrop} disabled={isSubmitting}>
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


//prompt
// "I want to start a small-scale farming project. I am located in [insert location], and I’m interested in [insert crop or livestock]. I have about [insert space, in square meters, acres, or hectares] of land available.

// Please advise me on:

// Whether this crop or livestock is suitable for my location and climate

// What type of setup or infrastructure I’ll need to get started

// How many units (plants/animals) I can realistically manage in this space

// What are the common challenges in this type of farming in my region

// Any beginner-friendly tips, cost-saving suggestions, or low-budget strategies to help me succeed"