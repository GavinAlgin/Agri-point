import { useRouter } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video } from 'expo-av';

const { width, height } = Dimensions.get('window');

const Onboarding: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Background Video */}
        <Video
          source={require('@/assets/images/motionmesh.mp4')} 
          style={styles.video}
          resizeMode="cover"
          shouldPlay
          isLooping
          isMuted
        />

        {/* Overlay content */}
        <View style={styles.overlay}>
          <View style={styles.bottomSection}>
            <View style={styles.content}>
              <Text style={styles.title}>Welcome to Agri Point.</Text>
              <Text style={styles.subtitle}>
                A multi personalized AI farm tool platform for assisting with everyday farming,
                data analysis and visualization. Features that assist with amazing productivity.
              </Text>
            </View>

            <TouchableOpacity style={styles.proceedButton} onPress={() => router.push('/(auth)/Login')}>
              <Text style={styles.proceedButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  overlay: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.04,
    justifyContent: 'flex-end',
    zIndex: 1,
  },
  bottomSection: {
    width: '100%',
  },
  content: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    lineHeight: 24,
    textAlign: 'left',
  },
  proceedButton: {
    // backgroundColor: '#000',
    backgroundColor: '#31572C',
    paddingVertical: 18,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Onboarding;
