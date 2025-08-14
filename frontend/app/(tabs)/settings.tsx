import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Switch, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Settings = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);
  const toggleNotifications = () => setIsNotificationsEnabled(prev => !prev);
  const toggleDarkMode = () => setIsDarkModeEnabled(prev => !prev);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Settings</Text>

        {/* Dropdown */}
        <View style={{ position: 'relative' }}>
          <TouchableOpacity
            onPress={toggleDropdown}
            style={styles.dropdownButton}>
            <Ionicons name='ellipsis-vertical' size={20} color='black' />
          </TouchableOpacity>

          {dropdownVisible && (
            <View style={styles.dropdown}>
              <TouchableOpacity style={styles.dropdownItem}>
                <Text>Ask AI</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem}>
                <Text>Report</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Settings Options */}
      <ScrollView contentContainerStyle={styles.settingsScroll}>
        {/* Profile Section */}
        <TouchableOpacity style={styles.profileSection}>
          <Image
            source={{
              uri: 'https://i.pravatar.cc/100', // Replace with user's profile image URL
            }}
            style={styles.avatar}
          />
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileStatus}>Hey there! I am using ChatApp.</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        {/* Section 1 */}
        <View style={styles.settingsSection}>
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.settingsText}>Account</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.settingsText}>Privacy</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.settingsText}>Chats</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Section 2 */}
        <View style={styles.settingsSection}>
          <View style={styles.settingsItem}>
            <Text style={styles.settingsText}>Notifications</Text>
            <Switch
              value={isNotificationsEnabled}
              onValueChange={toggleNotifications}
            />
          </View>
          <View style={styles.settingsItem}>
            <Text style={styles.settingsText}>Dark Mode</Text>
            <Switch
              value={isDarkModeEnabled}
              onValueChange={toggleDarkMode}
            />
          </View>
        </View>

        {/* Section 3 */}
        <View style={styles.settingsSection}>
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.settingsText}>Help</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={[styles.settingsText, { color: 'red' }]}>Logout</Text>
            <Ionicons name="log-out-outline" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  dropdownButton: {
    marginRight: 12,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
  },
  dropdown: {
    position: 'absolute',
    top: 44,
    right: 0,
    backgroundColor: '#f7f7f7',
    borderRadius: 6,
    paddingVertical: 6,
    width: 120,
    zIndex: 999,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  settingsScroll: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ccc',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileStatus: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  settingsSection: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginTop: 24,
    paddingVertical: 4,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  settingsText: {
    fontSize: 16,
  },
});
