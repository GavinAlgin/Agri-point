import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import home from '../../Data/icons/home.png';
import cart from '../../Data/icons/shopping-cart.png';
import user from '../../Data/icons/user-interface.png';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../(auth)/AuthContext';

const Tab = () => {
  const navigation = useNavigation();
  //ACCESING STATES FROM THE AUTHCONTEXT
  const {isLogin, setIsLogin}=useContext(AuthContext)

  return (
    <View style={styles.tab}>
      <TouchableOpacity style={styles.tabItem} onPress={() => {navigation.navigate("Market")}}>
        <Image source={home} style={{width: 24, height: 24}} />
        <Text style={styles.tabText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem} onPress={() => {navigation.navigate("Cart")}}>
        <Image source={cart} style={{width: 24, height: 24}} />
        <Text style={styles.tabText}>Cart</Text>
      </TouchableOpacity>
      {isLogin ? (        
        <TouchableOpacity style={styles.tabItem} onPress={() => {navigation.navigate("MyProfile")}}>
          <Image source={user} style={{width: 24, height: 24}} />
          <Text style={styles.tabText}>Account</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.tabItem} onPress={() => {navigation.navigate("Login")}}>
          <Image source={user} style={{width: 24, height: 24}} />
          <Text style={styles.tabText}>Login</Text>
        </TouchableOpacity>
      )

      }
            
    </View>
  )
}

export default Tab

const styles = StyleSheet.create({
    tab: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#ddd',
      height: 120,
      paddingBottom: 30,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },

    tabItem: {
      alignItems: 'center',
      marginHorizontal: 30,
      width: 58
    },
    tabText: {
      fontSize: 11,
      fontWeight: 500
    }
})