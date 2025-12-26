import React, { useState } from "react";
import "../styles/ProductCard.css";

function ProductCard({ product, onAddToCart, isInCart, onAddToWishlist, isInWishlist }) {
	const isOutOfStock = product.status === "Out of Stock";
	const [showDetails, setShowDetails] = useState(false);
	const [showHoverDetails, setShowHoverDetails] = useState(false);

	return (
		<div 
			className={`product-card ${isOutOfStock ? "out-of-stock" : ""}`}
			onMouseEnter={() => setShowHoverDetails(true)}
			onMouseLeave={() => setShowHoverDetails(false)}
		>
			<div className="product-image">
				<button 
					className={`wishlist-icon ${isInWishlist ? 'active' : ''}`}
					onClick={() => onAddToWishlist(product)}
					title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
				>
					{isInWishlist ? "❤️" : "🤍"}
				</button>
				<span className="product-emoji">{product.image}</span>
				<span
					className={`status-badge ${
						isOutOfStock ? "out-of-stock" : "in-stock"
					}`}
				>
					{product.status}
				</span>
				<span className="category-badge">{product.category}</span>

				{showHoverDetails && (
					<div className="hover-details-overlay">
						<div className="hover-details-content">
							<h4>{product.name}</h4>
							<p className="hover-category">📦 {product.category}</p>
							<p className="hover-price">₹{product.price.toLocaleString()}</p>
							<p className="hover-status">{product.status}</p>
							<p className="hover-shipping">📦 Ships in 3-5 days</p>
							<p className="hover-returns">↩️ 7-day returns</p>
						</div>
					</div>
				)}
			</div>

			<div className="product-info">
				<h3>{product.name}</h3>
				<p className="description">{product.description}</p>

				<div className="detail-toggle">
					<button className="details-btn" onClick={() => setShowDetails(!showDetails)}>
						{showDetails ? "Hide details" : "View details"}
					</button>
					<span className="status-chip">{product.status}</span>
				</div>

				{showDetails && (
					<div className="details-panel">
						<ul>
							<li>Category: {product.category}</li>
							<li>Price: ₹{product.price.toLocaleString()}</li>
							<li>Shipping: Usually dispatches in 3-5 days</li>
							<li>Returns: 7-day hassle-free returns</li>
						</ul>
					</div>
				)}

				<div className="product-footer">
					<div className="price-section">
						<span className="currency">₹</span>
						<span className="price">{product.price.toLocaleString()}</span>
					</div>

					<button
						className={`add-to-cart-btn ${isOutOfStock ? "disabled" : ""} ${
							isInCart ? "in-cart" : ""
						}`}
						onClick={() => onAddToCart(product)}
						disabled={isOutOfStock}
					>
						{isInCart ? "✓ In Cart" : isOutOfStock ? "Out of Stock" : "Add to Cart"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default ProductCard;
