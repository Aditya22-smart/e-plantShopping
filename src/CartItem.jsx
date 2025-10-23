import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Helper function to extract numeric cost from string like "$15" (Task 3, point 6)
  const getNumericCost = (costString) => {
    return parseFloat(costString.substring(1));
  };
  
  // Calculate total cost based on quantity for an item (Task 3, point 6)
  const calculateTotalCost = (item) => {
    // Multiply its quantity with its unit price
    return (getNumericCost(item.cost) * item.quantity).toFixed(2);
  };

  // Calculate total amount for all products in the cart (Task 3, point 1)
  const calculateTotalAmount = () => {
     // Calculate the cost of all of the items in the cart
     return cart.reduce((total, item) => {
      return total + getNumericCost(item.cost) * item.quantity;
    }, 0).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    // In the handleContinueShopping() function, call the onContinueShopping(e) function (Task 3, point 2)
    onContinueShopping(e);
  };

  // Task 3, point 3: Placeholder for checkout functionality
  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Functionality to be added for future reference'); // Add alert code (Task 3, point 3)
  };

  const handleIncrement = (item) => {
    // Dispatch updateQuantity to increase quantity by 1 (Task 3, point 4)
    dispatch(updateQuantity({ name: item.name, amount: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    // If the item's quantity is greater than 1, dispatch updateQuantity to decrease the quantity by 1 (Task 3, point 4)
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, amount: item.quantity - 1 }));
    } else {
      // Else if the quantity would drop to 0, dispatch the removeItem action (Task 3, point 4)
      dispatch(removeItem(item));
    }
  };

  const handleRemove = (item) => {
    // Dispatch the removeItem action to delete the item from the cart (Task 3, point 5)
    dispatch(removeItem(item));
  };


  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Unit Cost: {item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;