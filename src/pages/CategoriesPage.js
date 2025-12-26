import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/CategoriesPage.css";

const CATEGORIES = [
	{
		id: 1,
		name: "Accessories",
		icon: "🎧",
		description: "Keyboards, mice, headphones, and more",
		products: [
			{
				id: 101,
				name: "Wireless Mouse",
				price: 5000,
				status: "In Stock",
				image: "🖱️",
				category: "Accessories",
				description: "High precision wireless mouse with ergonomic design",
			},
			{
				id: 102,
				name: "Mechanical Keyboard",
				price: 6700,
				status: "Out of Stock",
				image: "⌨️",
				category: "Accessories",
				description: "Premium mechanical keyboard with RGB lighting",
			},
			{
				id: 103,
				name: "Wireless Headphones",
				price: 8999,
				status: "In Stock",
				image: "🎧",
				category: "Accessories",
				description: "Noise-cancelling wireless headphones",
			},
		],
	},
	{
		id: 2,
		name: "Displays",
		icon: "🖥️",
		description: "Monitors, screens, and displays",
		products: [
			{
				id: 201,
				name: "Monitor",
				price: 8700,
				status: "In Stock",
				image: "🖥️",
				category: "Displays",
				description: "27-inch 4K ultra HD monitor",
			},
			{
				id: 202,
				name: "Laptop Monitor",
				price: 5999,
				status: "In Stock",
				image: "💻",
				category: "Displays",
				description: "Portable 15.6-inch display",
			},
		],
	},
	{
		id: 3,
		name: "Peripherals",
		icon: "🖨️",
		description: "Printers, scanners, and other devices",
		products: [
			{
				id: 301,
				name: "Printer",
				price: 5050,
				status: "In Stock",
				image: "🖨️",
				category: "Peripherals",
				description: "All-in-one wireless printer",
			},
			{
				id: 302,
				name: "Web Camera",
				price: 3999,
				status: "In Stock",
				image: "📷",
				category: "Peripherals",
				description: "4K USB web camera",
			},
		],
	},
];

function CategoriesPage({
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
	const [selectedCategory, setSelectedCategory] = useState(null);

	return (
		<div className="categories-page">
			<div className="categories-header">
				<h1>Shop by Categories</h1>
				<p>Browse our collection by category</p>
			</div>

			{!selectedCategory ? (
				<div className="categories-grid">
					{CATEGORIES.map((category) => (
						<div
							key={category.id}
							className="category-card"
							onClick={() => setSelectedCategory(category)}
							role="button"
							tabIndex={0}
							onKeyDown={(e) =>
								(e.key === "Enter" || e.key === " ") &&
								setSelectedCategory(category)
							}
						>
							<div className="category-icon">{category.icon}</div>
							<h3>{category.name}</h3>
							<p>{category.description}</p>
							<div className="category-products-count">
								{category.products.length} products
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="category-products">
					<button
						className="back-button"
						onClick={() => setSelectedCategory(null)}
					>
						← Back to Categories
					</button>

					<h2>{selectedCategory.name}</h2>

					<div className="products-grid">
						{selectedCategory.products.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								onAddToCart={onAddToCart}
								onRemoveFromCart={onRemoveFromCart}
								quantity={
									cartItems.find((item) => item.id === product.id)
										?.quantity || 0
								}
								onUpdateCartQuantity={onUpdateCartQuantity}
								isInWishlist={isInWishlist(product.id)}
								onAddToWishlist={() => onAddToWishlist(product)}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default CategoriesPage;
