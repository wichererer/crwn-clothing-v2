import { createContext, useState,  useReducer } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CART_ACTION_TYPES = {
  'ADD_ITEM_TO_CART': 'ADD_ITEM_TO_CART',
  'REMOVE_ITEM_FROM_CART': 'REMOVE_ITEM_FROM_CART',
  'CLEAR_ITEM_FROM_CART': 'CLEAR_ITEM_FROM_CART'
}

const cartReducer = (state, action) => {
  const {type, payload} = action;

  switch (type) {
    case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
      const cartItemsAfterAdd = addCartItem(state.cartItems, payload);
      return {
        ...state,
        cartItems: cartItemsAfterAdd,
        cartCount: cartItemsAfterAdd.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0),
        cartTotal: cartItemsAfterAdd.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
      }
    case CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART:
      const cartItemsAfterRemove = removeCartItem(state.cartItems, payload);
      return {
        ...state,
        cartItems: cartItemsAfterRemove,
        cartCount: cartItemsAfterRemove.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0),
        cartTotal: cartItemsAfterRemove.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
      }
    case CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART:
      const cartItemsAfterClear = clearCartItem(state.cartItems, payload);
      return {
        ...state,
        cartItems: cartItemsAfterClear,
        cartCount: cartItemsAfterClear.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0),
        cartTotal: cartItemsAfterClear.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
      }

    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
}
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
}


export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [{cartItems, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const addItemToCart = (productToAdd) => {
    dispatch({type: CART_ACTION_TYPES.ADD_ITEM_TO_CART, payload: productToAdd})
  };

  const removeItemToCart = (cartItemToRemove) => {
    dispatch({type: CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART, payload: cartItemToRemove})
  };

  const clearItemFromCart = (cartItemToClear) => {
    dispatch({type: CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART, payload: cartItemToClear})
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
