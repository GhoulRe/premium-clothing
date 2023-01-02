import { createContext, useState, useEffect } from "react";


const addCartItem = (cartItems, productToAdd) => {

    const exists = cartItems.find((cartItem) =>
        cartItem.id === productToAdd.id);

    if (exists) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, productToRemove) => {
    const exits = cartItems.find((cartItem) => cartItem.id === productToRemove.id);

    if (exits.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
    }

    return cartItems.map((cartItem) =>
        cartItem.id === productToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    );
};


const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}


export const cartDropdownContext = createContext({
    isClickedDropdown: false,
    setIsClickedDropdown: () => { },
    cartItem: [],
    addItemToCart: () => { },
    removeItemCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartTotal:0
})

export const CartDropdownProvider = ({ children }) => {
    const [isClickedDropdown, setIsClickedDropdown] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear))
    }


    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount)
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setCartTotal(newCartTotal)
    }, [cartItems])


    const value = { isClickedDropdown, setIsClickedDropdown, cartItems, addItemToCart, cartCount, removeItemCart, clearItemFromCart,cartTotal };
    return (
        <cartDropdownContext.Provider value={value}>{children}</cartDropdownContext.Provider>
    )
}

