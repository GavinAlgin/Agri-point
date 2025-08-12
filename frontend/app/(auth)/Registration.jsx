import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { AuthIcons } from './authIcons';
function Registration() {
    const router=useRouter();
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const emailSymbol=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const handleSubmit = () => {

        if(!username.trim()){
            setUsernameError('username field is empty')
            return;
        }else if(!email.trim()){
            setEmailError('email field is empty')
            return;            
        }else if(!emailSymbol.test(email)){
            setEmailError('email is invalid');
            return;
        }else if(!password.trim()){
            setPasswordError('password field is empty')
            return;
        }else if(password.length < 8){
            setPasswordError('password is too short, enter a max of 8 characters and above');
            return;
        }else{                
            //validated successfully, send data
            alert(`username: ${username}, password: ${password}, email: ${email} `)
        }
        setUsernameError('');
        setEmailError('');
        setPasswordError('');
        
    }

    //          PASSWORD VISIBILITY TOOGLE
    const [showPassword, setShowPassword] = useState(false);
    const toogleVisibility = () => {
        setShowPassword(!showPassword)
    }
    
  return (
    <SafeAreaView style={{backgroundColor: '#edf3ff', height: '100%'}}>    
        <View style={[styles.wrapper, {height: '100%'}]}>
            {/*            BACK BUTTON        */}
            <View style={[styles.block, {marginLeft: -9}]}>
                <Link href={'/Login'}>
                    <Image source={AuthIcons[0]} style={{width: 35, height: 35}} />
                </Link>
            </View>
            {/*         LOGIN HEADING            */}
            <View style={styles.block}>
                <Text style={{fontSize: 23, fontWeight: 'bold'}}>Create an account</Text>
            </View>
            <View style={styles.block}>
                <Text style={{color: 'grey', fontSize: 16}}>Set up your profile and haverst fast</Text>
            </View>
            {/*               LOGIN FORM                   */}
            <View style={[styles.block, {height: 340}]}>
                
                {/*   username input and error handling     */}
                <View style={styles.row}>
                    <Text style={[styles.cell, { fontSize: 17, fontWeight: 'bold'}]}>
                        Name
                    </Text>
                </View>
                { usernameError ?
                <View style={styles.row}>
                    <Text style={[styles.cell, { fontSize: 15, fontWeight: 'bold', color: 'red'}]}>
                        {usernameError}
                    </Text> 
                </View> : null }
                <View style={[styles.row, {borderWidth: 2, borderColor: 'grey', borderRadius: 15, backgroundColor: '#f2f6ff'}]}>
                    <Image source={AuthIcons[5]} style={{width: 20, height: 20, margin: 10}}/>
                    <View style={[styles.cell, {width: 100}]}>
                        <TextInput 
                            placeholder='Enter Name'
                            value={username}
                            onChangeText={(text) => {
                                setUsername(text);
                                if(usernameError) setUsernameError('')
                            }}
                            style={{width: 280}}
                        />
                    </View>
                </View>

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
                        placeholder='Enter Email'
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            if(setEmailError) setEmailError('')
                        }}
                        style={{width: 280}}
                    />
                    </View>
                </View>

                {/*     password input and error handling    */}
                <View style={styles.row}>
                    <Text style={[styles.cell, { fontSize: 17, fontWeight: 'bold'}]}>
                        Password
                    </Text>
                </View>
                {passwordError ? 
                <View style={styles.row}>
                    <Text style={[styles.cell, { fontSize: 15, fontWeight: 'bold', color: 'red'}]}>
                        {passwordError}
                    </Text>
                </View> : null }
                <View style={[styles.row, {borderWidth: 2, borderColor: 'grey', borderRadius: 10}]}>
                    <Image source={AuthIcons[4]} style={{width: 20, height: 20, margin: 10}}/>
                    <View style={styles.cell }>
                    <TextInput 
                        placeholder='Enter Password'
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                            if(passwordError) setPasswordError('')
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
                <View style={styles.row}>
                    <Text style={[styles.cell, {color: 'grey'}]}>Password must be 8 characters</Text>
                </View>

                {/*             buttons                */}
                {/*     LOGIN BTN   */}
                <View style={[styles.row, {marginTop: 9}]}>
                    <View style={[styles.cell, {flex: 1}]}>
                    <Pressable
                        style={({pressed}) => [
                        styles.btn, 
                        {backgroundColor: pressed ? 'grey' : '#0d7efe', opacity: pressed ? 0.8 : 1}
                        ]}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.btnTitle}>Sign Up</Text>
                    </Pressable>
                    </View>
                </View>
                <View style={[styles.row,{ alignItems: 'center', justifyContent: 'center', padding: 10}]}>
                    <View style={styles.cell}>
                        <Pressable
                            style={[ styles.btn, {backgroundColor: '#f2f6ff',width: 100}]}
                        >
                            <Image source={AuthIcons[7]} style={{width: 20, height: 20}}/>
                            <Text style={[styles.btnTitle, {color: 'black'}]}>Apple</Text>
                        </Pressable>
                    </View>
                    <View style={[styles.cell,{width: 40}]}></View>
                    <View style={styles.cell}>
                        <Pressable
                            style={[ styles.btn, {backgroundColor: '#f2f6ff',width: 100}]}
                        >
                            <Image source={AuthIcons[6]} style={{width: 20, height: 20}}/>
                            <Text style={[styles.btnTitle, {color: 'black'}]}>Google</Text>
                        </Pressable>
                    </View>
                </View>
            </View> 
            <View style={{flex: 1}}>
                <Text style={{position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center', color: 'grey'}}>
                    Already have an account ? <Link href='/Login'><Text style={{color: '#0d7efe', fontWeight: 'bold' }}>Log In</Text></Link>
                </Text>
            </View>   
        </View>
    </SafeAreaView>
)
}                
export default Registration

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
    btn: {
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',

    },
    btnTitle:{
        fontSize: 16,
        color: 'white'
    }
})