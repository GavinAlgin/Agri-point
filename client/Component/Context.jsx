import React,{ createContext, useState} from 'react'
import { PRODUCTS } from '../Data/Product';
//CONTEXT IS USED FOR STATEMANAGEMENT 
export const MarketContext=createContext(null);

//THE FOLLOWING FUNCTION TO HANDLE MORE PRODUCTS ADDED TO THE SITE
var getDefaultCart = ()=>{
    var cart={}
    if(PRODUCTS && PRODUCTS.length > 0){
        for(var i= 1; i<PRODUCTS.length+1; i++){
            cart[i]=0;
        }    
    }
    return cart;
}
function MarketContextProvider (props) {
    var [cartItems, setCartItems] = useState(getDefaultCart())
    //THE FOLLOWING FUNCTION ITS ROLE IS TO ADD THE PRODUCTS TO THE CART PAGE
    var addToCart=(itemId)=>{
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}))
    }
    var removeFromCart=(itemId)=>{
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}))
    }
    var updateCartItemAmount = (newAmount, itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]: newAmount}))
    }
    //ADDING THE TOTAL AMOUNT
    var getTotalCartAmount = () => {
        var totalAmount = 0;
        for(var item in cartItems){
            if(cartItems[item]>0){
                var itemInfo = PRODUCTS.find((product)=>product.id===Number(item));
                totalAmount += cartItems[item] * itemInfo.price
            }
        }
        return totalAmount;
    }
    //THE FOLLOWING CONTAINER IS USED TO PASS THE FUNCTIONS ABOVE TO THE PROVIDER
    var contextValue={cartItems, addToCart, removeFromCart, updateCartItemAmount, getTotalCartAmount};    
  return (
    <MarketContext.Provider value={contextValue}>
        {props.children}
    </MarketContext.Provider>
  )
}

export default MarketContextProvider
