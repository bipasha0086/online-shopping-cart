import React from "react";
import ProductCard from "../components/ProductCard";
import "../styles/WishlistPage.css";

function WishlistPage({ wishlistItems, onRemoveFromWishlist, onAddToCart, onClose, cartItems, isInWishlist }) {
  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1>❤️ My Wishlist</h1>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <p className="empty-icon">🤍</p>
            <h2>Your Wishlist is Empty</h2>
            <p>Add products to your wishlist and they'll appear here!</p>
            <button className="continue-shopping" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="wishlist-info">
              <p>You have <strong>{wishlistItems.length}</strong> items in your wishlist</p>
            </div>

            <div className="wishlist-products">
              <div className="products-grid">
                {wishlistItems.map((product) => (
                  <div key={product.id} className="wishlist-item">
                    <ProductCard
                      product={product}
                      onAddToCart={onAddToCart}
                      isInCart={cartItems.some((item) => item.id === product.id)}
                      onAddToWishlist={onRemoveFromWishlist}
                      isInWishlist={isInWishlist(product.id)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="wishlist-actions">
              <button className="continue-shopping" onClick={onClose}>
                Continue Shopping
              </button>
              <button className="move-all-to-cart" onClick={() => {
                wishlistItems.forEach(item => onAddToCart(item));
              }}>
                🛒 Add All to Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default WishlistPage;
