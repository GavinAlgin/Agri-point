import React, { useState } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

type Crop = {
  name: string;
  area: string;
  location: string;
  icon: keyof typeof iconMap;
};

const iconMap: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
  // Crops
  apple: 'food-apple-outline',
  grapes: 'fruit-grapes-outline',
  watermelon: 'fruit-watermelon',
  corn: 'corn',
  carrot: 'carrot',
  // Animals
  cow: 'cow',
  goat: 'goat',
  sheep: 'sheep',
  chicken: 'egg-outline',
  pig: 'pig-variant-outline',
};


const AgricultureCategories = () => {
  const navigation = useNavigation<any>();
  const router = useRouter();
  const [crops, setCrops] = useState<Crop[]>([]);
  const [form, setForm] = useState({ name: '', area: '', location: '' });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(0))[0]; // for slide up animation

  const openModal = () => {
    setIsModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setIsModalVisible(false));
  };

  const handleSubmit = () => {
    const lowerName = form.name.toLowerCase();
    const iconKey = Object.keys(iconMap).find((key) => lowerName.includes(key)) as keyof typeof iconMap;

    const newCrop: Crop = {
      name: form.name,
      area: form.area,
      location: form.location,
      icon: iconKey || 'food-apple-outline',
    };

    setCrops((prev) => [...prev, newCrop]);
    setForm({ name: '', area: '', location: '' });
    closeModal();

    // Navigate to Guidelines screen with form data
    router.push({
      pathname: '/(screens)/EducateScreen',
      params: {
        location: form.location,
        type: form.name,
        area: form.area,
      },
    });
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [400, 0], // slide up from bottom
  });

  return (
    <View style={styles.categories}>
      {/* {crops.map((crop, index) => (
        <Pressable key={index} style={styles.categoryBtn}>
          <MaterialCommunityIcons name={crop.icon} size={26} color="black" />
        </Pressable>
      ))} */}
      {crops.map((crop, index) => (
      <Pressable
        key={index}
        style={styles.categoryBtn}
        onPress={() =>
          router.push({
            pathname: '/(screens)/EducateScreen',
            params: {
              location: crop.location,
              type: crop.name,
              area: crop.area,
            },
          })
        }>
        <MaterialCommunityIcons name={crop.icon} size={30} color="#103713" />
        {/* <Text style={{ fontSize: 12, marginTop: 4 }}>{crop.name}</Text> */}
      </Pressable>
    ))}

      <TouchableOpacity style={styles.plusButton} onPress={openModal}>
        <Entypo name="plus" size={26} color="black" />
      </TouchableOpacity>

      {/* Modal Bottom Sheet */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="none"
        onRequestClose={closeModal}>
        <Pressable style={styles.backdrop} onPress={closeModal} />

        <Animated.View style={[styles.modalContainer, { transform: [{ translateY }] }]}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.sheetContainer}
          >
            <Text style={styles.label}>What do you want to plant?</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Apple"
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
            />

            <Text style={styles.label}>How many square meters?</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 50"
              keyboardType="numeric"
              value={form.area}
              onChangeText={(text) => setForm({ ...form, area: text })}
            />

            <Text style={styles.label}>Where?</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Dalmada AH"
              value={form.location}
              onChangeText={(text) => setForm({ ...form, location: text })}
            />

            <Pressable style={styles.submitButton} onPress={handleSubmit}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
            </Pressable>
          </KeyboardAvoidingView>
        </Animated.View>
      </Modal>
    </View>
  );
};

export default AgricultureCategories;

const styles = StyleSheet.create({
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  categoryBtn: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    width: 60,
    alignItems: 'center',
  },
  plusButton: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    width: 60,
    alignItems: 'center',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  sheetContainer: {
    padding: 20,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: '#103713',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
});



        {/* <View style={styles.categories}>
          <Pressable style={styles.categoryBtn} onPress={() => router.push('/(screens)/EducateScreen')}>
            <MaterialCommunityIcons name="fruit-grapes-outline" size={26} color="black" />
          </Pressable>
          <Pressable style={styles.categoryBtn}>
            <MaterialCommunityIcons name="fruit-watermelon" size={26} color="black" />
          </Pressable>
          <Pressable style={styles.categoryBtn}>
            <MaterialCommunityIcons name="food-apple-outline" size={26} color="black" />
          </Pressable>
          <Pressable style={{ padding: 16, borderRadius: 10, backgroundColor: '#f7f7f7', width: 60, alignItems: 'center', }}>
            <Entypo name="plus" size={26} color="black" />
          </Pressable>
        </View> */}