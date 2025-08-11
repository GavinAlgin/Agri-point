import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

const settings = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>settings</Text>
    </SafeAreaView>
  )
}

export default settings

const  styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff'
  }
})
