import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Pressable, StyleSheet, TextInput, Text, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type Crop = {
  name: string;
  area: string;
  location: string;
  icon: keyof typeof iconMap;
};

const iconMap: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
  apple: 'food-apple-outline',
  grapes: 'fruit-grapes-outline',
  watermelon: 'fruit-watermelon',
  corn: 'corn',
  carrot: 'carrot',
  // Add more as needed
};

const AgricultureCategories = () => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [form, setForm] = useState({ name: '', area: '', location: '' });
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['40%'], []);

  const openSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const closeSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleSubmit = () => {
    const lowerName = form.name.toLowerCase();
    const iconKey = Object.keys(iconMap).find((key) =>
      lowerName.includes(key)
    ) as keyof typeof iconMap;

    const newCrop: Crop = {
      name: form.name,
      area: form.area,
      location: form.location,
      icon: iconKey || 'food-apple-outline',
    };

    setCrops((prev) => [...prev, newCrop]);
    setForm({ name: '', area: '', location: '' });
    closeSheet();
  };

  return (
    <GestureHandlerRootView style={styles.categories}>
      {crops.map((crop, index) => (
        <Pressable key={index} style={styles.categoryBtn}>
          <MaterialCommunityIcons name={crop.icon} size={26} color="black" />
        </Pressable>
      ))}

      <TouchableOpacity style={styles.plusButton} onPress={openSheet}>
        <Entypo name="plus" size={26} color="black" />
      </TouchableOpacity>

      <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints} enablePanDownToClose>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.sheetContainer}>
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
            placeholder="e.g. Backyard"
            value={form.location}
            onChangeText={(text) => setForm({ ...form, location: text })}
          />

          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </BottomSheet>
    </GestureHandlerRootView>
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
  sheetContainer: {
    flex: 1,
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
    backgroundColor: '#2e7d32',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
});
