import Header from '@/components/CustomHeader';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Dimensions, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const LanguageScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selected, setSelected] = useState(true);
  
  const handlePress = () => {
    setSelected(!selected);
  };

  const changeLanguage = (language: string) => {
    setSelectedLanguage(language);
    // Placeholder for language change functionality
    console.log(`Language changed to ${language}`);
    ToastAndroid.show(`Lanaguaged changed to ${language}`,  ToastAndroid.SHORT);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Language'} />

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFD580', padding: 12 }}>
        <AntDesign name="warning" size={20} color="orange" />
        <Text style={{ fontSize: 14, margin: 8, marginLeft: 14 }}>Enabling language changing to your native tongue will be coming soon</Text>
      </View>

      <View style={styles.languageContainer}>
        <View style={styles.languageButton} >
          <TouchableOpacity onPress={() => changeLanguage('English')} style={[styles.checkbox, selected && styles.selectedContainer]}>
            {selected && <View style={styles.checked} />}
          </TouchableOpacity>
          <Text style={styles.languageText}>English</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: 'blue'}}>Default</Text>
        </View>
        <View style={styles.languageButton} >
          <TouchableOpacity onPress={() => changeLanguage('Afrikaans')} style={[styles.checkbox, selected && styles.selectedContainer]}>
            {selected && <View style={styles.checked} />}
          </TouchableOpacity>
          <Text style={styles.languageText}>Afrikaans</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: 'blue'}}>Default</Text>
        </View>
        <View style={styles.languageButton} >
          <TouchableOpacity onPress={() => changeLanguage('Sepedi')} style={[styles.checkbox, selected && styles.selectedContainer]}>
            {selected && <View style={styles.checked} />}
          </TouchableOpacity>
          <Text style={styles.languageText}>Sepedi</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: 'blue'}}>Default</Text>
        </View>
      </View>
      <StatusBar style='dark' />
    </SafeAreaView>
  );
};

const languages = ['English', 'Spanish', 'French'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  languageContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: width * 0.04,
  },
  languageButton: {
    padding: width * 0.05,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  languageText: {
    fontSize: 16,
    fontWeight: 'semibold',
    marginRight: 148,
  },
  selectedContainer: {
    borderColor: 'gray', // Change this to your desired outline color
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    //marginRight: 10,
  },
  checked: {
    width: 14,
    height: 14,
    backgroundColor: 'blue', // Change this to your desired check color
    borderRadius: 4,
  },
});

export default LanguageScreen;