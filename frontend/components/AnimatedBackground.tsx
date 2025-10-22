// components/AnimatedBackground.tsx
import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { useSharedValue, withRepeat, withTiming, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

type Blob = {
  x: number;
  y: number;
  radius: number;
  hue: number;
};

function randomBlobs(count: number): Blob[] {
  return Array.from({ length: count }).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 100 + Math.random() * 150,
    hue: Math.random() * 360,
  }));
}

const blobs = randomBlobs(5);

export const AnimatedBackground: React.FC = () => {
  const anim = useSharedValue(0);

  useEffect(() => {
    anim.value = withRepeat(
      withTiming(1, { duration: 20000 }),
      -1,
      true
    );
  }, []);

  const blobStyles = blobs.map((blob, idx) => {
    return useAnimatedStyle(() => {
      const phase = anim.value;
      // Shift radius slightly, or position offsets
      const offset = Math.sin(phase * Math.PI * 2 + idx) * 20;
      return {
        left: blob.x + offset,
        top: blob.y + offset,
        width: blob.radius * 1.2,
        height: blob.radius * 1.2,
        borderRadius: (blob.radius * 1.2) / 2,
        backgroundColor: `hsl(${blob.hue}, 60%, 70%)`,
        opacity: interpolate(phase, [0, 1], [0.4, 0.7], Extrapolate.CLAMP),
      };
    });
  });

  return (
    <View style={styles.container}>
      {blobStyles.map((style, i) => (
        <Animated.View key={i} style={[styles.blob, style]} />
      ))}
      {/* Blur overlay to soften */}
      <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  blob: {
    position: 'absolute',
  },
});
