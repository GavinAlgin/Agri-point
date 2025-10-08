import {Alert, Pressable, Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import basket from '../../Data/icons/fruits.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthIcons } from '../(auth)/authIcons';
import user from "../../Data/icons/user-interface.png"
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../(auth)/AuthContext';
const MyProfile = () => {
    const navigation=useNavigation();
    
    //CONTEXT LOGIC
    const {isLogin, setIsLogin}=useContext(AuthContext);

    //FUNCTION FOR LOGING OUT
    const handleLogout = () => {
        setIsLogin(false);
        navigation.navigate('Login');
    }

    //FUNCTION FOR DELETING AN ACCOUNT
    const handleDelete = () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account ?",
            [
                {
                    text: 'Cancel', 
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: ()=>{
                        setIsLogin(false);
                        navigation.navigate('Login');
                    }
                }
            ]
        )
    }
    return (
    <SafeAreaView style={{height: '100%'}}>
        <View style={[styles.wrapper, {height: '100%'}]}>
            {/*         LOGO             */}
            <View style={styles.iconCart}>
                <Image source={basket} style={styles.myCart} />
            </View>
            {/*         PROFILE HEADING            */}
            <View style={styles.block}>
                <Text style={{fontSize: 23, fontWeight: 'bold'}}>Profile</Text>
            </View>
            <View style={styles.block}>
                <Text style={{color: 'grey', fontSize: 16}}>Profile details</Text>
            </View>
        
            {/*       PROFILE DETAILS        */}
            <View style={[styles.block, {height: 340}]}>
                {/*   USERNAME   */}
                <View style={styles.row}>
                    <Text style={[styles.cell, { fontSize: 17, fontWeight: 'bold'}]}>
                        Username:
                    </Text>
                </View>
                <View style={[styles.row, { borderBottomColor: 'grey', borderRadius: 15, backgroundColor: '#f2f6ff'}]}>
                    <Image source={user} style={{width: 20, height: 20, margin: 10}}/>
                    <View style={[styles.cell, { width: 100, marginVertical: 9}]}>
                        <Text style={{width: 280}}>xxxxxxxxxxxxxxx</Text>
                    </View>
                </View>

                {/*       EMAIL       */}
                <View style={styles.row}>
                    <Text style={[styles.cell, { fontSize: 17, fontWeight: 'bold'}]}>
                        Email
                    </Text>
                </View>
                <View style={[styles.row, { borderBottomColor: 'grey', borderRadius: 15, backgroundColor: '#f2f6ff'}]}>
                    <Image source={AuthIcons[3]} style={{width: 20, height: 20, margin: 10}}/>
                    <View style={[styles.cell, { width: 100, marginVertical: 9}]}>
                        <Text style={{width: 280}}>xxxxx@gmail.com</Text>
                    </View>
                </View>

                {/*             BUTTONS          */}
                
                {/*     LOGOUT BTN   */}
                <View style={[styles.row,{marginVertical: 10}]}>
                    <View style={[styles.cell, {flex: 1}]}>
                    <Pressable
                        style={({pressed}) => [
                        styles.btn, 
                        {backgroundColor: pressed ? 'grey' : '#103815', opacity: pressed ? 0.8 : 1}
                        ]}
                        onPress={handleLogout}
                    >
                        <Text style={styles.btnTitle}>Log out</Text>
                    </Pressable>
                    </View>
                </View>
                {/*         DELETE ACCOUNT      */}
               <View style={styles.row}>
                    <View style={[styles.cell, {flex: 1}]}>
                    <Pressable
                        style={({pressed}) => [
                        styles.btn, 
                        {backgroundColor: pressed ? 'grey' : '#103815', opacity: pressed ? 0.8 : 1}
                        ]}
                        onPress={handleDelete}
                    >
                        <Text style={styles.btnTitle}>Delete Account</Text>
                    </Pressable>
                    </View>
                </View>
               
            </View>    
        </View>
    </SafeAreaView>
  )
}

export default MyProfile

const styles = StyleSheet.create({
    wrapper: {
        margin: 10,
        //borderWidth: 1,
    },
    block: {
        borderRadius: 10,
        borderColor: 'grey',
        padding: 5,
        //borderWidth: 1
    },
    row: {
        flexDirection: 'row',
        //borderWidth: 1
    },
    btn: {
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    btnTitle:{
        fontSize: 16,
        color: 'white'
    },iconCart: {
        backgroundColor: "#103815",
        borderRadius: 50,
        padding: 6,
        width: 41,
        height: 41
    },
    myCart: {
        width: 30,
        height: 30,
    }
})