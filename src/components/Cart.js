import React, { useState } from "react";
import "../styles/Cart.css";

function Cart({
  cartItems,
  onRemoveFromCart,
  onUpdateCartQuantity,
  totalPrice,
  onClose,
}) {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      onClose();
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="cart-container">
        <div className="order-success">
          <div className="success-icon">✓</div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your purchase.</p>
          <p>Your order will be delivered soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p className="empty-icon">🛒</p>
          <p>Your cart is empty</p>
          <p className="empty-text">Add some products to get started!</p>
          <button className="continue-shopping-btn" onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <span>{item.image}</span>
                </div>

                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="item-price">₹{item.price.toLocaleString()}</p>
                </div>

                <div className="item-quantity">
                  <button
                    onClick={() =>
                      onUpdateCartQuantity(item.id, item.quantity - 1)
                    }
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      onUpdateCartQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <div className="item-total">
                  <p>₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => onRemoveFromCart(item.id)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span className="free">FREE</span>
            </div>
            <div className="summary-row">
              <span>Tax (5%):</span>
              <span>₹{(totalPrice * 0.05).toLocaleString()}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{(totalPrice * 1.05).toLocaleString()}</span>
            </div>
          </div>

          <div className="cart-actions">
            <button className="continue-btn" onClick={onClose}>
              Continue Shopping
            </button>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
