import React, { useState } from "react";
import "../styles/MyOrdersPage.css";

function MyOrdersPage({ orders, onClose }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <h1>📦 My Orders</h1>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <p className="empty-icon">📦</p>
            <h2>No Orders Yet</h2>
            <p>Start shopping and your orders will appear here!</p>
            <button className="continue-shopping" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="orders-content">
            <div className="orders-list">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className={`order-card ${selectedOrder?.id === order.id ? "active" : ""}`}
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="order-header">
                    <div className="order-id">
                      <h3>Order #{order.id.substring(0, 8).toUpperCase()}</h3>
                      <p className="order-date">{order.date}</p>
                    </div>
                    <div className="order-status">
                      <span className={`status-badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="order-summary">
                    <p><strong>{order.items.length}</strong> items</p>
                    <p className="order-total">₹{order.total.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            {selectedOrder && (
              <div className="order-details">
                <h2>Order Details</h2>
                <div className="detail-section">
                  <h3>Order Information</h3>
                  <div className="detail-row">
                    <span>Order ID:</span>
                    <span>#{selectedOrder.id.substring(0, 8).toUpperCase()}</span>
                  </div>
                  <div className="detail-row">
                    <span>Order Date:</span>
                    <span>{selectedOrder.date}</span>
                  </div>
                  <div className="detail-row">
                    <span>Status:</span>
                    <span className={`status-badge ${selectedOrder.status.toLowerCase()}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span>Tracking Number:</span>
                    <span className="tracking">{selectedOrder.trackingNumber}</span>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Items Ordered</h3>
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="order-item">
                      <span className="item-emoji">{item.image}</span>
                      <div className="item-info">
                        <p className="item-name">{item.name}</p>
                        <p className="item-details">
                          Qty: {item.quantity} × ₹{item.price.toLocaleString()}
                        </p>
                      </div>
                      <p className="item-price">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="detail-section">
                  <h3>Order Summary</h3>
                  <div className="detail-row">
                    <span>Subtotal:</span>
                    <span>₹{selectedOrder.total.toLocaleString()}</span>
                  </div>
                  <div className="detail-row">
                    <span>Shipping:</span>
                    <span className="free">FREE</span>
                  </div>
                  <div className="detail-row">
                    <span>Tax (5%):</span>
                    <span>₹{(selectedOrder.total * 0.05).toLocaleString()}</span>
                  </div>
                  <div className="detail-row total">
                    <span>Total:</span>
                    <span>₹{(selectedOrder.total * 1.05).toLocaleString()}</span>
                  </div>
                </div>

                <div className="order-actions">
                  <button className="invoice-btn">📄 Download Invoice</button>
                  <button className="track-btn">📍 Track Order</button>
                  <button className="reorder-btn">🔄 Reorder Items</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrdersPage;
