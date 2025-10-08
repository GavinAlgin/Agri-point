import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useContext} from 'react'
import { PRODUCTS } from '../Data/Product'
import { SafeAreaView } from 'react-native-safe-area-context'
import CartInfo from './CartInfo'
import { MarketContext } from './Context'
import emptyCart from '../Data/icons/shopping.png'
import { AuthContext } from './(auth)/AuthContext'
import { useNavigation } from '@react-navigation/native'

const Cart = () => {
    const {cartItems, getTotalCartAmount}=useContext(MarketContext);
    const totalAmount = getTotalCartAmount();

    const navigation=useNavigation();
    
    //CHECKING IF USER IS LOGGED IN
    const {isLogin, setIsLogin} = useContext(AuthContext);
    const handleCheck = () => {
      if(!isLogin){
        Alert.alert(
          "Login",
          "To continue checking out make sure you are logged in ?",
          [
            {
              text: 'Cancel', 
              style: 'cancel'
            },
            {
              text: 'Login',
              onPress: ()=>{
                navigation.navigate('Login');
              }
            }
          ]
        )
      }else{
        alert("Purchased Successfully");
      }
    }
    
    return (
    <SafeAreaView style={{backgroundColor: "#ffffff"}}>
      <View style={styles.container}>
        {/*          HEADER                 */}
        <View style={styles.header}>
          <View style={styles.innerHead}>
            <Text style={styles.headerText}>Agricart</Text>
          </View>
          <View style={styles.subHeader}>
            {totalAmount > 0 ? (
              <View style={styles.payInfo}>
                <Text style={styles.totalAmount}>Total: R{totalAmount}</Text>
                <TouchableOpacity style={styles.linkCheck} onPress={handleCheck}>
                  <Text style={styles.linkText}>Checkout</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>Cart Is Empty</Text>
              </View>
            )}
          </View>
        </View>

        {/*         ADDED CONTENT          */}
        {totalAmount > 0 ? (
        <ScrollView style={{marginHorizontal: 10}}>
          <View style={styles.content}>
            {
              PRODUCTS.map((product) => {
                if(cartItems[product.id] !== 0){
                  return <CartInfo data={product} key={product.id} />
                }
              })
            }
          </View>
        </ScrollView>  
        ) : (
            <View style={styles.emptyContainer}>
              <Image source={emptyCart} style={styles.emptyImg} />
            </View>
          )
        }
        
      </View>
    </SafeAreaView>
  )
}

export default Cart

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
  subHeader: {
    paddingTop: 10,
  },
  emptyText: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  payInfo: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  totalAmount: {
    fontWeight: 500,
    fontSize: 16,
    width: 200,
  },
  linkCheck: {
    backgroundColor: '#103815',
    padding: 10,
    borderRadius: 10,
    width: 100,
  },
  linkText: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',

  },
  content: {
    borderTopWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 'auto',
    paddingBottom: 120
  },
  emptyContainer: {
    marginHorizontal: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyImg: {
    width: 250,
    height: 250
  }
})