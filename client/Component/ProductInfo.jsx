import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Image } from 'react-native';
//import { Link } from 'expo-router';
import { MarketContext } from './Context';
import { useNavigation } from '@react-navigation/native';

const ProductInfo = (props) => {
    var {id, productName, price, productImage, category, description, rating, stockAvailability}=props.data;

    //PASSING VALUES TO THE MOREINFO COMPONENT
    const navigation = useNavigation();
    const handleMoreInfo = () => {
        navigation.navigate('MoreInfo', {
            id: id,
            productName: productName,
            price: price,
            productImage: productImage,
            category: category,
            description: description,
            rating: rating,
            stockAvailability: stockAvailability 
        })
    }


    //THE FOLLOWING ACCESSES THE FUNCTIONS IN THE CONTEX COMPONENT TO BE USED IN THIS PAGE
    const {addToCart, cartItems} = useContext(MarketContext)
    
    //KEEPS TRACK OF THE PRODUCTS ADDED OR REMOVED
    const cartItemAmount = cartItems[id]
  return (
        <View style={styles.cell}>
            <Image source={productImage} style={styles.prodImage} resizeMode='cover'/>
            <View style={styles.desc}>
                <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{productName}</Text>
                <Text style={styles.price} numberOfLines={1} ellipsizeMode='tail'>R{price}.00</Text>
            </View>
            <Pressable style={styles.add} onPress={()=> addToCart(id)}>
                <Text style={styles.addText} numberOfLines={1} ellipsizeMode='tail' >Place Order {cartItemAmount > 0 && <>({cartItemAmount})</>}</Text>
            </Pressable>
            <Pressable style={styles.moreBtn} onPress={handleMoreInfo}>
                <Text style={styles.moreText}>More Info</Text>    
            </Pressable>
        </View>
  )
}

export default ProductInfo

const styles = StyleSheet.create({
   cell: {
    margin: 5,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 15
   },
   name: {
    marginHorizontal: 5,
    fontSize: 17,
    fontWeight: 'bold',
    width: 155
   },
   price: {
    marginHorizontal: 5,
    fontSize: 15,
    fontWeight: 500,
    width: 155
   },
    prodImage: {
        width: 169,
        height: 169,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    add: {
        marginHorizontal: 5,
        backgroundColor: '#103815',
        padding: 9,
        borderRadius: 10,
        marginVertical: 3
    },
    addText: {
        color: 'white',
        textAlign: 'center',
        width: 140
    },
    moreBtn: {
        backgroundColor: '#103815',
        padding: 9,
        borderRadius: 10,
        marginVertical: 8,
        marginHorizontal: 5
    },
    moreText: {
        textAlign: 'center',
        color: 'white'
    }

    
})