import Header from '@/components/CustomHeader'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const VendorDetailScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Vendor Details'} />
      <View></View>
    </SafeAreaView>
  )
}

export default VendorDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
