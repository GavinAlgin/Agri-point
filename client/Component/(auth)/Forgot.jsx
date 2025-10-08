import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthIcons } from './authIcons';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Forgot() {

    const [newPassword, setNewPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');

    const [rePassword, setRePassword] = useState('');
    const [rePasswordError, setRePasswordError] = useState('');

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const emailSymbol=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       
    const handleSubmit = () => {
      if(!email.trim()){
        setEmailError('email field is empty')
        return; 
      }else if(!emailSymbol.test(email)){
        setEmailError('email is invalid');
        return;
      }else if(!newPassword.trim()){
        setNewPasswordError('password field is empty')
        return;
      }else if(newPassword.length < 8){
        setNewPasswordError('password must be 8 characters long')
        return;
      }else if(!rePassword.trim()){
        setRePasswordError('re-enter password')
        return;            
      }else if(newPassword != rePassword){
        setRePasswordError("password doesnt match")
        return;
      }else{
        //validated successfully, send data
        alert('password changed successfully')
        newPassword.target.value=''
        rePassword.target.value=''
      }
      setNewPasswordError('');
      setRePasswordError('');
        
    }
    //          PASSWORD VISIBILITY TOOGLE
    const [showPassword, setShowPassword] = useState(false);
    const toogleVisibility = () => {
        setShowPassword(!showPassword)
    }
    //          PASSWORD VISIBILITY TOOGLE
    const [showPassword2, setShowPassword2] = useState(false);
    const toogleVisibility2 = () => {
        setShowPassword2(!showPassword2)
    }    

    //NAVIGATION BETWEEN SCREENS
    const navigation=useNavigation()
  return (
    <SafeAreaView style={{ height: '100%'}}>
        <View style={[styles.wrapper, {height: '100%'}]}>
            {/*            BACK BUTTON        */}
            <View style={[styles.block, {marginLeft: -9}]}>
                <TouchableOpacity onPress={() => {navigation.navigate('Login')}}>
                    <Image source={AuthIcons[0]} style={{width: 35, height: 35}} />
                </TouchableOpacity>
            </View>
            {/*         LOGIN HEADING            */}
            <View style={styles.block}>
                <Text style={{fontSize: 23, fontWeight: 'bold'}}>Change password</Text>
            </View>
            <View style={styles.block}>
                <Text style={{color: 'grey', fontSize: 16}}>Continue by changing password</Text>
            </View>        
            {/*               LOGIN FORM                   */}
            <View style={[styles.block, {height: 340}]}>

                {/*     email input and error handling       */}
                <View style={styles.row}>
                    <Text style={[styles.cell, { fontSize: 17, fontWeight: 'bold'}]}>
                        Email
                    </Text>
                </View>
                {emailError ? 
                <View style={styles.row}>
                    <Text style={[styles.cell, { fontSize: 15, fontWeight: 'bold', color: 'red'}]}>
                        {emailError}
                    </Text>
                </View> : null }
                <View style={[styles.row,{borderWidth: 2, borderColor: 'grey', borderRadius: 10}]}>
                    <Image source={AuthIcons[3]} style={{width: 20, height: 20, margin: 12}}/>
                    <View style={[styles.cell, {width: 100}]}>
                    <TextInput 
                        placeholder='Enter your email'
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            if(setEmailError) setEmailError('')
                        }}
                        style={{width: 280}}
                    />
                    </View>
                </View>
    
                {/*   password input and error handling     */}
                <View style={styles.row}>
                    <Text style={[styles.cell, { fontSize: 17, fontWeight: 'bold'}]}>
                        Password
                    </Text>
                </View>
                { newPasswordError ?
                <View style={styles.row}>
                    <Text style={[styles.cell, {textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: 'red'}]}>
                        {newPasswordError}
                    </Text> 
                </View> : null }
                <View style={[styles.row, {borderWidth: 2, borderColor: 'grey', borderRadius: 10}]}>
                    <Image source={AuthIcons[4]} style={{width: 20, height: 20, margin: 10}}/>
                    <View style={styles.cell}>
                        <TextInput 
                            placeholder='Enter new password'
                            value={newPassword}
                            secureTextEntry={!showPassword}
                            onChangeText={(text) => {
                                setNewPassword(text);
                                if(newPasswordError) setNewPasswordError('')
                            }}
                            style={{width: 260}}
                        />
                    </View>
                    <Pressable onPress={toogleVisibility}>
                        {showPassword ? 
                            <Image source={AuthIcons[2]} style={{width: 20, height: 20, margin: 10}}/> :
                            <Image source={AuthIcons[1]} style={{width: 20, height: 20, margin: 10}}/> 
                        }
                    </Pressable>
                </View>

                {/*     password input and error handling    */}
                <View style={styles.row}>
                    <Text style={[styles.cell, { fontSize: 17, fontWeight: 'bold'}]}>
                       Re - Password
                    </Text>
                </View>
                {rePasswordError ? 
                <View style={styles.row}>
                    <Text style={[styles.cell, {textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: 'red'}]}>
                        {rePasswordError}
                    </Text>
                </View> : null }
                <View style={[styles.row, {borderWidth: 2, borderColor: 'grey', borderRadius: 10}]}>
                    <Image source={AuthIcons[4]} style={{width: 20, height: 20, margin: 10}}/>
                    <View style={styles.cell}>
                    <TextInput 
                        placeholder='Re-Enter Password'
                        secureTextEntry={!showPassword2}
                        value={rePassword}
                        onChangeText={(text) => {
                            setRePassword(text);
                            if(rePasswordError) setRePasswordError('')
                        }}
                        style={{width: 260}}
                    />
                    </View>
                    <Pressable onPress={toogleVisibility2}>
                        {showPassword2 ? 
                            <Image source={AuthIcons[2]} style={{width: 20, height: 20, margin: 10}}/> :
                            <Image source={AuthIcons[1]} style={{width: 20, height: 20, margin: 10}}/> 
                        }
                    </Pressable>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.cell, {color: 'grey'}]}>Password must be 8 characters</Text>
                </View>
                {/*             buttons                */}
                {/*     LOGIN BTN   */}
                <View style={styles.row}>
                    <View style={[styles.cell, {paddingTop: 10, flex: 1}]}>
                    <Pressable
                        style={({pressed}) => [
                        styles.btn, 
                        {backgroundColor: pressed ? 'grey' : '#103815', opacity: pressed ? 0.8 : 1}
                        ]}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.btnTitle}>Change Password</Text>
                    </Pressable>
                    </View>
                </View>
            </View>    
        </View>
    </SafeAreaView>
)
}                
export default Forgot

const styles = StyleSheet.create({
    wrapper: {
        margin: 10
    },
    block: {
        borderRadius: 10,
        borderColor: 'grey',
        padding: 5
    },
    row: {
        flexDirection: 'row'
    },
    cell: {
        //flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        //margin: 2
    },
    btn: {
        padding: 17,
        borderRadius: 8,
        alignItems: 'center'
    },
    btnTitle:{
        fontSize: 16,
        color: 'white'
    }
})