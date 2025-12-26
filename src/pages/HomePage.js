import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import "../styles/HomePage.css";

const PRODUCTS = [
	{
		id: 1,
		name: "Wireless Mouse",
		price: 5000,
		status: "In Stock",
		image: "🖱️",
		category: "Accessories",
		description: "High precision wireless mouse with ergonomic design",
	},
	{
		id: 2,
		name: "Mechanical Keyboard",
		price: 6700,
		status: "Out of Stock",
		image: "⌨️",
		category: "Accessories",
		description: "Premium mechanical keyboard with RGB lighting",
	},
	{
		id: 3,
		name: "Monitor",
		price: 8700,
		status: "In Stock",
		image: "🖥️",
		category: "Displays",
		description: "27-inch 4K ultra HD monitor",
	},
	{
		id: 4,
		name: "Printer",
		price: 5050,
		status: "In Stock",
		image: "🖨️",
		category: "Peripherals",
		description: "All-in-one wireless printer",
	},
	{
		id: 5,
		name: "Monitor Stand",
		price: 6900,
		status: "Out of Stock",
		image: "🪑",
		category: "Accessories",
		description: "Adjustable monitor stand with storage",
	},
	{
		id: 6,
		name: "Desk Lamp",
		price: 6700,
		status: "In Stock",
		image: "💡",
		category: "Lighting",
		description: "LED desk lamp with USB charging",
	},
	{
		id: 7,
		name: "USB-C Fast Charger",
		price: 3500,
		status: "In Stock",
		image: "🔌",
		category: "Power",
		description: "65W GaN charger with dual USB-C ports",
	},
	{
		id: 8,
		name: "Laptop Pro 15",
		price: 82000,
		status: "In Stock",
		image: "💻",
		category: "Computers",
		description: "15-inch performance laptop with 16GB RAM and 512GB SSD",
	},
	{
		id: 9,
		name: "iPad Air",
		price: 62000,
		status: "In Stock",
		image: "📱",
		category: "Tablets",
		description: "10.9-inch tablet with Liquid Retina display and Apple Pencil support",
	},
	{
		id: 10,
		name: "Laptop Sleeve 15",
		price: 2500,
		status: "In Stock",
		image: "👜",
		category: "Accessories",
		description: "Padded waterproof sleeve for 15-inch laptops",
	},
	{
		id: 11,
		name: "USB-C Hub 7-in-1",
		price: 5400,
		status: "Out of Stock",
		image: "🧩",
		category: "Accessories",
		description: "7-port hub with HDMI, USB-A, SD, and Ethernet",
	},
	{
		id: 12,
		name: "Noise-Cancelling Headset",
		price: 12500,
		status: "In Stock",
		image: "🎧",
		category: "Audio",
		description: "Over-ear ANC headset with 30-hour battery",
	},
	{
		id: 13,
		name: "External SSD 1TB",
		price: 15900,
		status: "In Stock",
		image: "💾",
		category: "Storage",
		description: "Portable NVMe SSD with USB 3.2 Gen 2",
	},
	{
		id: 14,
		name: "HDMI 2.1 Cable",
		price: 1900,
		status: "Out of Stock",
		image: "🔗",
		category: "Accessories",
		description: "2-meter ultra-high-speed HDMI cable (8K ready)",
	},
	{
		id: 15,
		name: "Pro Mouse Pad",
		price: 1200,
		status: "In Stock",
		image: "🖼️",
		category: "Accessories",
		description: "Extended desk mat with anti-slip base",
	},
];

function HomePage({
	user,
	cartItems,
	onAddToCart,
	onRemoveFromCart,
	onUpdateCartQuantity,
	showCart,
	onCartClose,
	isDarkMode,
	wishlistItems,
	onAddToWishlist,
	isInWishlist,
}) {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");

	const categories = ["All", ...new Set(PRODUCTS.map((p) => p.category))];

	const filteredProducts = PRODUCTS.filter((product) => {
		const matchesSearch = product.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesCategory =
			selectedCategory === "All" || product.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	const totalPrice = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	return (
		<div className="home-page">
			{showCart ? (
				<Cart
					cartItems={cartItems}
					onRemoveFromCart={onRemoveFromCart}
					onUpdateCartQuantity={onUpdateCartQuantity}
					totalPrice={totalPrice}
					onClose={onCartClose}
				/>
			) : (
				<>
					<div className="search-section">
						<h1>Welcome to Shopnexal, {user.name}! 👋</h1>
						<p>Elevate your setup — discover, love, repeat.</p>

						<div className="search-bar">
							<input
								type="text"
								placeholder="🔍 Search products..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>

						<div className="category-filter">
							<h3>Categories:</h3>
							<div className="category-buttons">
								{categories.map((category) => (
									<button
										key={category}
										className={`category-btn ${
											selectedCategory === category ? "active" : ""
										}`}
										onClick={() => setSelectedCategory(category)}
									>
										{category}
									</button>
								))}
							</div>
						</div>
					</div>

					<div className="products-section">
						<h2>Products ({filteredProducts.length})</h2>
						{filteredProducts.length === 0 ? (
							<div className="no-products">
								<p>No products found matching your criteria</p>
							</div>
						) : (
							<div className="products-grid">
								{filteredProducts.map((product) => (
									<ProductCard
										key={product.id}
										product={product}
										onAddToCart={onAddToCart}
										isInCart={cartItems.some((item) => item.id === product.id)}
										onAddToWishlist={onAddToWishlist}
										isInWishlist={isInWishlist(product.id)}
									/>
								))}
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
}

export default HomePage;
