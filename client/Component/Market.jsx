import {Image, StyleSheet, Text, View, TextInput, ScrollView, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PRODUCTS } from '../Data/Product'
import { useNavigation } from '@react-navigation/native'
import basket from '../Data/icons/fruits.png';
import errorSearch from '../Data/icons/error.png';
import ProductInfo from './ProductInfo'

const Market = () => {
    const navigation = useNavigation();
    
    const [searchText, setSearchText] = useState('');
    
    // Search Logic
    const filteredProducts=PRODUCTS.filter(product => 
            product.productName.toLowerCase().includes(searchText.toLowerCase()) || product.category.toLowerCase().includes(searchText.toLowerCase())
        )
    return (
        <SafeAreaView>
            <View style={styles.container}>
                {/*            HEADER               */}
                <View style={styles.header}>
                    <View style={styles.innerHead}>
                        <Text style={styles.headerText}>Agrimarket</Text>

                        <View style={styles.iconCart}>
                            <Image source={basket} style={styles.myCart} />
                        </View>
                    </View>
                    <View style={styles.search}>
                        <TextInput placeholder='Search Here' style={styles.searchText}  placeholderTextColor={'black'}
                        value={searchText}
                        onChangeText={(text) => setSearchText(text)}
                        />
                    </View>
                </View>

                {/*                 CONTENT         */}
                <ScrollView style={{marginHorizontal: 10}}>
                    <View style={styles.content}>
                        {/* PRODUCTS WILL APPEAR HERE */}
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product)=> <ProductInfo key={product.id} data={product}/>)
                        ) : (
                            <View style={styles.notFoundContainer}>
                                <Text style={styles.notFoundText}>
                                    {searchText ? `No products found for "${searchText}"`: 'No products available'}
                                </Text>
                                <Image source={errorSearch} style={styles.errorImg} />
                            </View>
                        )
                        }
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
  )
}
export default Market;
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
        borderTopWidth: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 'auto',
        paddingBottom: 120
    },
    notFoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    notFoundText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center'
    },
    errorImg: {
        width: 250,
        height: 250,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})