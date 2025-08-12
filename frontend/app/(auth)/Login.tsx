import { StyleSheet, Text, View, TextInput, Pressable, Switch } from 'react-native'
import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthIcons } from './authIcons';
import { Image } from 'react-native';

function Login() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //

    //          VALIDATING USERS DETAILS
    const [usernameValue, setUsernameValue] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const [passwordValue, setPasswordValue] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const handleSubmit = () => {
        
        if(!usernameValue.trim()){
            setUsernameError('username field is empty')
            return;
        }else if(!passwordValue.trim()){
            setPasswordError('password field is empty')
            return;            
        }else{
            //validated successfully, send data
            alert(`username: ${usernameValue}, password: ${passwordValue}`)
        }
        setUsernameError('');
        setPasswordError('')
        
    }
    ///////////////////////////////////////////////////////////

    //          PASSWORD VISIBILITY TOOGLE
    const [showPassword, setShowPassword] = useState(false);
    const toogleVisibility = () => {
        setShowPassword(!showPassword)
    }

    //          CHECKBOX HANDLING
    const [checked, setChecked]=useState(false)

  return (
    <SafeAreaView style={{backgroundColor: '#edf3ff', height: '100%'}}>
        <View style={[styles.wrapper, {height: '100%'}]}>
            {/*         BACK BUTTON ROW             */}
            <View style={[styles.block, {marginLeft: -9}]}>
                <Link href='/' >
                    <Image source={AuthIcons[0]} style={{width: 35, height: 35, borderRadius: 50}} />
                </Link>
            </View>
            {/*         LOGIN HEADING            */}
            <View style={styles.block}>
                <Text style={{fontSize: 23, fontWeight: 'bold'}}>Log In</Text>
            </View>
            <View style={styles.block}>
                <Text style={{color: 'grey', fontSize: 16}}>Log in to continue haversting</Text>
            </View>
        
            {/*               LOGIN FORM                   */}
            <View style={[styles.block, {height: 340}]}>
                
                {/*   username input and error handling     */}
                <View style={styles.row}>
                    <Text style={[styles.cell, { fontSize: 17, fontWeight: 'bold'}]}>
                        Email
                    </Text>
                </View>
                { usernameError ?
                <View style={styles.row}>
                    <Text style={[styles.cell, {fontSize: 15, fontWeight: 'bold', color: 'red'}]}>
                        {usernameError}
                    </Text> 
                </View> : null }
                <View style={[styles.row, {borderWidth: 2, borderColor: 'grey', borderRadius: 15, backgroundColor: '#f2f6ff'}]}>
                    <Image source={AuthIcons[3]} style={{width: 20, height: 20, margin: 10}}/>
                    <View style={[styles.cell, { borderColor: 'grey', borderRadius: 10, width: 100}]}>
                        <TextInput 
                            placeholder='Enter your email'
                            value={usernameValue}
                            onChangeText={(text) => {
                                setUsernameValue(text);
                                if(usernameError) setUsernameError('')
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
                <View style={[styles.row,{borderWidth: 2, borderColor: 'grey', borderRadius: 15,backgroundColor: '#f2f6ff'}]}>
                    <Image source={AuthIcons[4]} style={{width: 20, height: 20, margin: 9}}/>
                    <View style={styles.cell}>
                        <TextInput 
                            placeholder='Enter your password'
                            secureTextEntry={!showPassword}
                            value={passwordValue}
                            onChangeText={(text) => {
                                setPasswordValue(text);
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

                {/*             BUTTONS                */}
                {/*         CHECKBOX AND FORGOT PASSWORD    */}
                <View style={styles.row}>
                    <Switch 
                        value={checked}
                        onValueChange={setChecked}
                    />
                    <Text style={{color: 'grey', marginTop: 13, marginHorizontal: 5}}>Keep me logged in</Text>
                    <Link href='/Forgot' style={{margin: 13, marginHorizontal: 50}}>
                        <Text style={{color: '#0d7eff', fontWeight: 'bold'}} onPress={() => router.push('/(auth)/Forgot')}>Forgot Password</Text>
                    </Link>
                </View>
                {/*     LOGIN BTN   */}
                <View style={styles.row}>
                    <View style={[styles.cell, {flex: 1}]}>
                    <Pressable
                        style={({pressed}) => [
                        styles.btn, 
                        {backgroundColor: pressed ? 'grey' : '#0d7efe', opacity: pressed ? 0.8 : 1}
                        ]}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.btnTitle}>Log In</Text>
                    </Pressable>
                    </View>
                </View>

                <View style={[styles.row,{flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%'}]}>
                    <Text style={[styles.cell, {color: 'grey'}]}>Or log in with</Text>
                </View>

                {/*     REGISTER BTN     */}
                <View style={[styles.row,{ alignItems: 'center', justifyContent: 'center'}]}>
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
                    Don't have an account ? <Link href='/Registration'><Text style={{color: '#0d7efe', fontWeight: 'bold' }}>Sign up</Text></Link>
                </Text>
            </View>
        </View>
    </SafeAreaView>
)
}                
export default Login

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
    }
})