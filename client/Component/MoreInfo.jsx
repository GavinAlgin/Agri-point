import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PRODUCTS } from '../Data/Product'
import basket from '../Data/icons/fruits.png';
import { useNavigation, useRoute } from '@react-navigation/native'

const MoreInfo = () => {
  const navigation = useNavigation();
    //const params = useLocalSearchParams();
    const route = useRoute();
    const {id, productName, price, productImage, category, description, rating, stockAvailability} = route.params || {};
  //EXTRACT THE PRODUCT DATA FROM DATA

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/*            HEADER               */}
        <View style={styles.header}>
          <View style={styles.innerHead}>
            <Text style={styles.headerText}>Agridetails</Text>
            <View style={styles.iconCart}>
              <Image source={basket} style={styles.myCart} />
            </View>
          </View>
        </View>

        {/*          CONTENT               */}      
        <ScrollView>
          <View style={styles.content}>
            <Image source={productImage} onError={(e)=> console.log('Image error: ', e.nativeEvent.error)} resizeMode='cover' style={styles.prodImage}/>
            {/*         DETAILS              */}
            <View style={styles.details}>
              
              <Text style={{fontWeight: 500}}>Product Name :</Text>
              <Text style={styles.pName}>{productName}</Text>
              
              <Text style={{fontWeight: 500}}>Product Price :</Text>
              <Text style={styles.pPrice}>R{price}.00</Text>
              
              <Text style={{fontWeight: 500}}>Stock Availability :</Text>
              <Text style={styles.pPrice}>{stockAvailability ? "Available":"Not Available"}</Text>
              
              <Text style={{fontWeight: 500}}>Product Type :</Text>
              <Text style={[styles.pType,{borderBottomWidth: 2}]}>{category}</Text>
              
              <Text style={{fontWeight: 500}}>Rating :</Text>
              <Text style={styles.pSeller}>{rating}</Text>
              
              <Text style={{fontWeight: 500}}>Description :</Text>
              <Text style={[styles.pSeller,{borderBottomWidth: 0}]}>{description}</Text>
            </View>
          </View>
        </ScrollView> 
      </View>
    </SafeAreaView>
  )
}

export default MoreInfo

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  header: {
    borderBottomWidth: 3,
    padding: 6,
    margin: 10,
    borderColor: "#403233"
  },
  innerHead: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    
  },
  headerText: { 
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  iconCart: {
    backgroundColor: "#103815",
    borderRadius: 50,
    padding: 6
  },
  myCart: {
    width: 30,
    height: 30,
  },
  content: {
    height: 'auto',
    borderWidth: 1,
    borderRadius: 15,
    marginHorizontal: 10,
    paddingBottom: 120
  },
  prodImage: {
    width: 362,
    height: 362,
    borderRadius: 15
  },
  details: {
    padding: 7,
    borderTopWidth: 2,
    marginVertical: 10,
    marginHorizontal: 8,  
  },
  pName: {
    fontWeight: 'bold',
    fontSize: 20,
    borderBottomWidth: 2,
    paddingVertical: 3
  },
  pPrice: {
    fontWeight: 700,
    fontSize: 16,
    borderBottomWidth: 2,
    paddingVertical: 3
  },
  pSeller: {
    fontWeight: 700,
    fontSize: 16,
    borderBottomWidth: 2,
    paddingVertical: 3
  },
  pType: {
    fontWeight: 700,
    fontSize: 16,
    paddingVertical: 3
  }
})