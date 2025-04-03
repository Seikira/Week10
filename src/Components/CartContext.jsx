import React, { createContext, useContext, useReducer } from 'react';

export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                [action.payload.name]: state[action.payload.name]
                    ? { ...state[action.payload.name], quantity: state[action.payload.name].quantity + 1 }
                    : { ...action.payload, quantity: 1 },
            };
        case 'DECREASE_QUANTITY':
            return {
                ...state,
                [action.payload]: state[action.payload].quantity > 1
                    ? { ...state[action.payload], quantity: state[action.payload].quantity - 1 }
                    : (() => {
                        const newState = { ...state };
                        delete newState[action.payload];
                        return newState;
                    })(),
            };
        case 'REMOVE_FROM_CART':
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
};

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, {});

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};
