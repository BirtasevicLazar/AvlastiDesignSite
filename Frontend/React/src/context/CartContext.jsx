import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex(
        (item) => 
          item.id === action.payload.id && 
          item.size === action.payload.size && 
          item.color === action.payload.color
      );

      if (existingItemIndex > -1) {
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity += action.payload.quantity || 1;
        return {
          ...state,
          items: newItems,
          total: Number(state.total) + (Number(action.payload.price) * (action.payload.quantity || 1)),
        };
      }

      return {
        ...state,
        items: [...state.items, { 
          ...action.payload, 
          quantity: action.payload.quantity || 1
        }],
        total: Number(state.total) + (Number(action.payload.price) * (action.payload.quantity || 1)),
      };

    case 'REMOVE_FROM_CART':
      const itemToRemove = state.items.find(
        item => 
          item.id === action.payload.id && 
          item.size === action.payload.size && 
          item.color === action.payload.color
      );
      
      if (!itemToRemove) return state;

      const updatedItems = state.items.filter(
        item => 
          !(item.id === action.payload.id && 
            item.size === action.payload.size && 
            item.color === action.payload.color)
      );
      
      return {
        ...state,
        items: updatedItems,
        total: Number(state.total) - (Number(itemToRemove.price) * itemToRemove.quantity),
      };

    case 'UPDATE_QUANTITY':
      const updatedCartItems = state.items.map((item) => {
        if (
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
        ) {
          return {
            ...item,
            quantity: Math.max(1, action.payload.quantity),
          };
        }
        return item;
      });

      const newTotal = updatedCartItems.reduce(
        (sum, item) => sum + (Number(item.price) * item.quantity),
        0
      );

      return {
        ...state,
        items: updatedCartItems,
        total: newTotal,
      };

    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const initialState = {
    items: JSON.parse(localStorage.getItem('cart')) || [],
    total: Number(localStorage.getItem('cartTotal')) || 0,
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const calculatedTotal = state.items.reduce(
      (sum, item) => sum + (Number(item.price) * item.quantity),
      0
    );

    localStorage.setItem('cart', JSON.stringify(state.items));
    localStorage.setItem('cartTotal', calculatedTotal.toString());
  }, [state.items]);

  const addToCart = (product) => {
    if (!product.size) {
      console.error('Proizvod mora imati izabranu veličinu');
      return false;
    }

    if (product.colors && product.colors.length > 0 && !product.color) {
      console.error('Proizvod mora imati izabranu boju');
      return false;
    }

    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { 
        ...product, 
        price: Number(product.price),
        size: product.size,
        color: product.color || null
      } 
    });

    return true;
  };

  const removeFromCart = (item) => {
    dispatch({ 
      type: 'REMOVE_FROM_CART', 
      payload: { 
        id: item.id,
        size: item.size,
        color: item.color
      } 
    });
  };

  const updateQuantity = (item, quantity) => {
    dispatch({ 
      type: 'UPDATE_QUANTITY', 
      payload: { 
        id: item.id,
        size: item.size,
        color: item.color,
        quantity 
      } 
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        total: Number(state.total),
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 