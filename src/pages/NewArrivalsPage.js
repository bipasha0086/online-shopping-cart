import React from "react";
import ProductCard from "../components/ProductCard";
import "../styles/NewArrivalsPage.css";

const NEW_ARRIVALS = [
	{
		id: 2001,
		name: "Mechanical Keyboard Pro",
		price: 7999,
		status: "In Stock",
		image: "⌨️",
		category: "Accessories",
		description: "New gaming mechanical keyboard with RGB",
		isNew: true,
	},
	{
		id: 2002,
		name: "4K Webcam",
		price: 5999,
		status: "In Stock",
		image: "📷",
		category: "Peripherals",
		description: "Ultra HD 4K webcam with AI features",
		isNew: true,
	},
	{
		id: 2003,
		name: "Wireless Charging Pad",
		price: 1999,
		status: "In Stock",
		image: "🔋",
		category: "Accessories",
		description: "Fast wireless charging for all devices",
		isNew: true,
	},
	{
		id: 2004,
		name: "Smart Monitor Light",
		price: 3499,
		status: "In Stock",
		image: "💡",
		category: "Lighting",
		description: "AI-powered monitor light that adjusts automatically",
		isNew: true,
	},
	{
		id: 2005,
		name: "USB Hub 7-in-1",
		price: 2499,
		status: "In Stock",
		image: "🔌",
		category: "Accessories",
		description: "Multi-port USB-C hub with 4K display",
		isNew: true,
	},
	{
		id: 2006,
		name: "Ergonomic Mouse Pad",
		price: 1299,
		status: "In Stock",
		image: "🖱️",
		category: "Accessories",
		description: "Premium wrist-supporting mouse pad",
		isNew: true,
	},
	{
		id: 2007,
		name: "Portable Monitor 15.6\"",
		price: 7499,
		status: "In Stock",
		image: "🖥️",
		category: "Displays",
		description: "Portable USB-C display for professionals",
		isNew: true,
	},
	{
		id: 2008,
		name: "Bluetooth Speaker Cube",
		price: 2999,
		status: "In Stock",
		image: "🔊",
		category: "Audio",
		description: "Compact Bluetooth speaker with 360° sound",
		isNew: true,
	},
	{
		id: 2009,
		name: "Gaming Headset",
		price: 5499,
		status: "In Stock",
		image: "🎧",
		category: "Audio",
		description: "Professional gaming headset with surround sound",
		isNew: true,
	},
	{
		id: 2010,
		name: "Laptop Cooling Stand",
		price: 1799,
		status: "In Stock",
		image: "❄️",
		category: "Accessories",
		description: "Active cooling stand for laptops",
		isNew: true,
	},
	{
		id: 2011,
		name: "Mechanical Switches Set",
		price: 899,
		status: "In Stock",
		image: "⚙️",
		category: "Accessories",
		description: "Replacement mechanical switches pack",
		isNew: true,
	},
	{
		id: 2012,
		name: "Cable Organizer Kit",
		price: 599,
		status: "In Stock",
		image: "📦",
		category: "Accessories",
		description: "Complete cable management solution",
		isNew: true,
	},
];

function NewArrivalsPage({
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
		<div className="new-arrivals-page">
			<div className="new-arrivals-header">
				<h1>✨ New Arrivals</h1>
				<p>Check out the latest products just added to our store</p>
				<div className="new-badge-info">
					🆕 Recently added items
				</div>
			</div>

			<div className="new-arrivals-grid">
				{NEW_ARRIVALS.map((product) => (
					<div key={product.id} className="new-item-wrapper">
						<div className="new-badge">NEW</div>
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

export default NewArrivalsPage;
