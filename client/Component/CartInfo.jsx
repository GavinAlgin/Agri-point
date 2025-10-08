import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, {useContext} from 'react'
import { Image } from 'react-native'
import { MarketContext } from './Context'
const CartInfo = (props) => {
    const {id, productName, price, productImage}=props.data;
    
    const {cartItems, addToCart, removeFromCart, updateCartItemAmount}=useContext(MarketContext);
    const handleQuantityChange  = (text) => {
      const numericValue=text.replace(/[^0-9]/g, '');
      updateCartItemAmount(Number(numericValue), id);
    }
  return (
    <View style={styles.cartItem}>
      <Image source={productImage} style={styles.prodImage} resizeMode='cover' />
      <View style={styles.desc}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail' >{productName}</Text>

        <Text style={styles.price}>R{price}.00</Text>
        
        <View style={styles.countHandler}>
          <Pressable style={styles.remove} onPress={() => removeFromCart(id)}>
              <Text style={styles.removeText}>-</Text>
          </Pressable>
          <TextInput 
              style={styles.count}
              value={cartItems[id].toString()}
              onChangeText={handleQuantityChange}
              keyboardType='numeric'
          />
          <Pressable style={styles.add} onPress={() => addToCart(id)}>
              <Text style={styles.addText}>+</Text>
          </Pressable>
        </View>

      </View>
    </View>
  )
}

export default CartInfo

const styles = StyleSheet.create({
  cartItem: {
    margin: 5,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 15,
    height: 268
  },
  prodImage: {
    width: 169.8,
    height: 169.8,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  desc: {},
  name: {
    marginHorizontal: 5,
    fontSize: 17,
    fontWeight: 'bold',
    width: 155,
  },
  countHandler: {
    marginHorizontal: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 35,
    paddingVertical: 2
  },
  remove: {
    borderWidth: 1,
    width: 45,
    backgroundColor: '#103815',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: 40
  },
  removeText: {
    textAlign: 'center',
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold'
  },
  add: {
    width: 45,
    backgroundColor: '#103815',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    height: 40
  },
  addText: {
    textAlign: 'center',
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold'
  },
  count: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    width: 70,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    height: 40
    
  },
  price: {
    marginHorizontal: 5,
    fontSize: 15,
    fontWeight: 500,
    width: 155,
  }
})