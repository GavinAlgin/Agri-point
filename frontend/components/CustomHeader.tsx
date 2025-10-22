import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { Menu, Provider as PaperProvider } from 'react-native-paper';
import { useRouter } from 'expo-router';

const Header = ({ title, }) => {
  const [visible, setVisible] = React.useState(false);
  const router = useRouter();

  return (
    <PaperProvider>
      <View style={styles.header}>
        <Pressable style={styles.backContainer} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#007AFF" />
          <Text style={styles.backText}>Back</Text>
        </Pressable>

        <Text style={styles.title}>{title}</Text>

        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Pressable onPress={() => setVisible(true)} style={styles.optionsBtn}>
              <Entypo name="dots-three-vertical" size={24} color="black" />
            </Pressable>
          }>
          <Menu.Item onPress={() => alert('Report selected')} title="Report" />
          <Menu.Item onPress={() => alert('Settings selected')} title="Settings" />
        </Menu>
      </View>
    </PaperProvider>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  backContainer: { flexDirection: 'row', alignItems: 'center' },
  backText: { marginLeft: 6, fontSize: 16, color: '#007AFF' },
  title: { fontSize: 18, fontWeight: '600', flex: 1, textAlign: 'center', color: '#000' },
  optionsBtn: { padding: 10, backgroundColor: '#f7f7f7', borderRadius: 10, },
});
