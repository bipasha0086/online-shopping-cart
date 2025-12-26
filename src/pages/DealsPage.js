import React from "react";
import ProductCard from "../components/ProductCard";
import "../styles/DealsPage.css";

const DEALS_PRODUCTS = [
	{
		id: 1001,
		name: "Wireless Mouse",
		price: 2500,
		originalPrice: 5000,
		discount: 50,
		status: "In Stock",
		image: "🖱️",
		category: "Accessories",
		description: "High precision wireless mouse - FLASH SALE",
	},
	{
		id: 1002,
		name: "USB-C Cable (3m)",
		price: 399,
		originalPrice: 799,
		discount: 50,
		status: "In Stock",
		image: "🔌",
		category: "Accessories",
		description: "High-speed USB-C cable",
	},
	{
		id: 1003,
		name: "Mechanical Keyboard",
		price: 4199,
		originalPrice: 6700,
		discount: 37,
		status: "In Stock",
		image: "⌨️",
		category: "Accessories",
		description: "Premium mechanical keyboard with RGB",
	},
	{
		id: 1004,
		name: "Monitor Stand",
		price: 3450,
		originalPrice: 6900,
		discount: 50,
		status: "In Stock",
		image: "🪑",
		category: "Accessories",
		description: "Adjustable monitor stand",
	},
	{
		id: 1005,
		name: "Desk Lamp",
		price: 1499,
		originalPrice: 2999,
		discount: 50,
		status: "In Stock",
		image: "💡",
		category: "Lighting",
		description: "LED desk lamp with USB charging",
	},
	{
		id: 1006,
		name: "Phone Stand",
		price: 599,
		originalPrice: 1199,
		discount: 50,
		status: "In Stock",
		image: "📱",
		category: "Accessories",
		description: "Adjustable phone stand",
	},
	{
		id: 1007,
		name: "Webcam 1080p",
		price: 1999,
		originalPrice: 3999,
		discount: 50,
		status: "In Stock",
		image: "📷",
		category: "Peripherals",
		description: "HD webcam with auto-focus",
	},
	{
		id: 1008,
		name: "Wireless Headphones",
		price: 4499,
		originalPrice: 8999,
		discount: 50,
		status: "In Stock",
		image: "🎧",
		category: "Accessories",
		description: "Noise-cancelling headphones",
	},
];

function DealsPage({
	cartItems,
	onAddToCart,
	onRemoveFromCart,
	onUpdateCartQuantity,
	isDarkMode,
	wishlistItems,
	onAddToWishlist,
	isInWishlist,
	onClose,
}) {
	return (
		<div className="deals-page">
			<div className="deals-header">
				<h1>🎉 Hot Deals & Offers</h1>
				<p>Incredible discounts on your favorite products</p>
				<div className="deals-banner">
					<span className="flash-badge">⚡ FLASH SALE</span>
					<span className="deals-info">Up to 50% OFF</span>
				</div>
			</div>

			<div className="deals-grid">
				{DEALS_PRODUCTS.map((product) => (
					<div key={product.id} className="deal-card-wrapper">
						<div className="discount-badge">{product.discount}% OFF</div>
						<div className="price-info">
							<span className="original-price">₹{product.originalPrice}</span>
							<span className="sale-price">₹{product.price}</span>
						</div>
						<ProductCard
							product={product}
							onAddToCart={onAddToCart}
							onRemoveFromCart={onRemoveFromCart}
							quantity={
								cartItems.find((item) => item.id === product.id)?.quantity ||
								0
							}
							onUpdateCartQuantity={onUpdateCartQuantity}
							isInWishlist={isInWishlist(product.id)}
							onAddToWishlist={() => onAddToWishlist(product)}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default DealsPage;
