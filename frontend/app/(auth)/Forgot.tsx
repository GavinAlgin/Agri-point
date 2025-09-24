import { FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useMemo, } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../server/api';
import { useRouter } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';

const { width } = Dimensions.get('window');

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [uid, setUid] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%', '70%'], []);

  const handleSendResetEmail = async () => {
    try {
      await api.post('/auth/password/reset/', { email });
      ToastAndroid.show("Reset email sent. Check your inbox.", ToastAndroid.SHORT);
      bottomSheetRef.current?.expand();
    } catch (err: any) {
      console.error(err);
      ToastAndroid.show('Error: ' + (err?.response?.data?.detail || 'Something went wrong'), ToastAndroid.SHORT);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      ToastAndroid.show('Passwords do not match', ToastAndroid.SHORT);
      return;
    }

    try {
      setLoading(true);
      await api.post('/auth/password/reset/confirm/', {
        uid,
        token,
        new_password1: newPassword,
        new_password2: confirmPassword,
      });
      ToastAndroid.show("Password reset successful.", ToastAndroid.SHORT);
      bottomSheetRef.current?.close();
      router.push('/(auth)/Login');
    } catch (err: any) {
      console.error(err);
      ToastAndroid.show(
        'Error: ' + (err?.response?.data?.detail || 'Reset failed'),
        ToastAndroid.SHORT
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.HeaderContainer}>
        <FontAwesome5 name="star-of-life" size={24} color="white" />
      </View>

      <View style={styles.Content}>
        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Reset Password,</Text>
        <Text style={{ color: '#777', fontSize: 18 }}>
          Enter your email and we&apos;ll send you a reset link. Then paste the UID and Token below.
        </Text>
      </View>

      <View style={styles.loginForm}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.InputBtn}
        />
      </View>

      <View style={styles.Btns}>
        <TouchableOpacity style={styles.LoginBtn} onPress={handleSendResetEmail}>
          <Text style={styles.BtnTitle}>Send Reset Link</Text>
        </TouchableOpacity>

        <View style={styles.Separator} />

        <TouchableOpacity style={styles.LoginBtn} onPress={() => router.push('/(auth)/Login')}>
          <Text style={styles.BtnTitle}>Back to Login</Text>
        </TouchableOpacity>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
      >
        <View style={{ padding: 16 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>Reset Password</Text>

          <TextInput
            placeholder="UID"
            value={uid}
            onChangeText={setUid}
            style={styles.InputBtn}
          />
          <TextInput
            placeholder="Token"
            value={token}
            onChangeText={setToken}
            style={styles.InputBtn}
          />
          <TextInput
            placeholder="New Password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            style={styles.InputBtn}
          />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.InputBtn}
          />

          <TouchableOpacity style={styles.LoginBtn} onPress={handleResetPassword} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.BtnTitle}>Reset Password</Text>
            )}
          </TouchableOpacity>
        </View>
      </BottomSheet>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Forgot;


const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: width * 0.04,
    },
    HeaderContainer: {
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#103713',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 50,
    },
    Content: {
        flexDirection: 'column',
        marginTop: 28,
    },
    loginForm: {
        marginTop: 28,
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 16,
    },
    InputBtn: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        width:  width * 0.9,
        height: 50,
    },
    Btns: {
        flexDirection: 'column',
        marginTop: 28,
        gap: 18,
    },
    LoginBtn: {
        padding: 12,
        backgroundColor: '#103713',
        borderRadius: 10,
        alignItems: 'center'
    },
    BtnTitle: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    Forgot: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    Separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginVertical: 12,
    },

})