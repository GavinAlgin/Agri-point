import React from 'react';
import { View, Text, StyleSheet, Button, Linking } from 'react-native';

export default function DetailsScreen({ route }: any) {
  const { title, description, detailsLink } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Button title="Learn More" onPress={() => Linking.openURL(detailsLink)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  description: { fontSize: 16, marginBottom: 20 }
});
