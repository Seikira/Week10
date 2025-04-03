import React from 'react';
import { useCart } from '../components/CartContext';

export const Cart = () => {
    const { cart, dispatch } = useCart();

    const total = Object.values(cart).reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    return (
        <div className="cart">
            <h2>Shopping Cart</h2>
            {Object.keys(cart).length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                Object.values(cart).map((item) => (
                    <div key={item.name} className="cart-item">
                        <span>{item.name} - Quantity: {item.quantity} - ${(item.price * item.quantity).toFixed(2)}</span>

                        <button className="decrease-qty" onClick={() => dispatch({ type: 'DECREASE_QUANTITY', payload: item.name })}>-</button>
                        <button className="increase-qty" onClick={() => dispatch({ type: 'ADD_TO_CART', payload: item })}>+</button>

                        <button className="remove-from-cart" onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.name })}>
                            Remove
                        </button>
                    </div>
                ))
            )}
            <h3>Total: ${total}</h3>
        </div>
    );
};
