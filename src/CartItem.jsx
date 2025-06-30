import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, addItem } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const price = parseFloat(item.cost.substring(1));
      total += price * item.quantity;
    });
    return total;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.substring(1));
    return (price * item.quantity).toFixed(2);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Cart is Empty</h2>
        <button className="get-started-button1" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      {cart.map(item => (
        <div className="cart-item" key={item.name}>
          <img src={item.image} alt={item.name} className="cart-item-image" />
          <div className="cart-item-details">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-cost">{item.cost}</div>
            <div className="cart-item-quantity">
              <button className="cart-item-button" onClick={() => handleDecrement(item)}>-</button>
              <span className="cart-item-quantity-value">{item.quantity}</span>
              <button className="cart-item-button" onClick={() => handleIncrement(item)}>+</button>
            </div>
            <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
          </div>
        </div>
      ))}
      <button className="get-started-button1 continue_shopping_btn" onClick={handleContinueShopping}>Continue Shopping</button>
      <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
    </div>
  );
};

export default CartItem;
