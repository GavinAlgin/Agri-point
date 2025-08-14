// // components/Header.js
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
// import { AntDesign, Entypo } from '@expo/vector-icons';

// const Header = ({ title, onBackPress }) => {
//   const [modalVisible, setModalVisible] = useState(false);

//   return (
//     <View style={styles.header}>
//       <TouchableOpacity onPress={onBackPress} style={styles.backContainer}>
//         <AntDesign name="arrowleft" size={24} color="black" />
//         <Text style={styles.backText}>Back</Text>
//       </TouchableOpacity>

//       <Text style={styles.title}>{title}</Text>

//       <Pressable onPress={() => setModalVisible(true)} style={styles.optionsBtn}>
//         <Entypo name="dots-three-vertical" size={20} color="black" />
//       </Pressable>

//       {/* Dropdown Modal */}
//       <Modal transparent={true} visible={modalVisible} animationType="fade">
//         <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
//           <View style={styles.dropdown}>
//             <Pressable onPress={() => alert('Report selected')}>
//               <Text style={styles.dropdownItem}>Report</Text>
//             </Pressable>
//             <Pressable onPress={() => alert('Settings selected')}>
//               <Text style={styles.dropdownItem}>Settings</Text>
//             </Pressable>
//           </View>
//         </Pressable>
//       </Modal>
//     </View>
//   );
// };

// export default Header;

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#F9F9F9',
//     borderBottomColor: '#E0E0E0',
//     borderBottomWidth: 1,
//   },
//   backContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   backText: {
//     marginLeft: 6,
//     fontSize: 16,
//     color: '#007AFF',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#000',
//     flex: 1,
//     textAlign: 'center',
//   },
//   optionsBtn: {
//     padding: 4,
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'flex-end',
//     paddingTop: 50,
//     paddingRight: 20,
//     backgroundColor: 'rgba(0,0,0,0.1)',
//   },
//   dropdown: {
//     width: 150,
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 5,
//   },
//   dropdownItem: {
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     fontSize: 16,
//   },
// });
// components/Header.js
import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Menu, Provider as PaperProvider } from 'react-native-paper';

const Header = ({ title, onBackPress }) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <PaperProvider>
      <View style={styles.header}>
        <Pressable style={styles.backContainer} onPress={onBackPress}>
          <AntDesign name="arrowleft" size={24} color="#007AFF" />
          <Text style={styles.backText}>Back</Text>
        </Pressable>

        <Text style={styles.title}>{title}</Text>

        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Pressable onPress={() => setVisible(true)} style={styles.optionsBtn}>
              <AntDesign name="ellipsis1" size={24} color="black" />
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
  optionsBtn: { padding: 4 },
});
