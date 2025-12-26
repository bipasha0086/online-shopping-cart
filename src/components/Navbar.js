import React, { useEffect, useRef, useState } from "react";
import "../styles/Navbar.css";

function Navbar({ user, onLogout, cartCount, isDarkMode, onThemeToggle, wishlistCount, onNavigate, currentPage, ordersCount }) {
	const [showProfile, setShowProfile] = useState(false);
	const [showDrawer, setShowDrawer] = useState(false);
	const [navTheme, setNavTheme] = useState(() => localStorage.getItem("nav-theme") || "dark");
	const [searchTerm, setSearchTerm] = useState("");
	const profileRef = useRef(null);
	const avatarRef = useRef(null);
	const drawerRef = useRef(null);
	const hamburgerRef = useRef(null);

	useEffect(() => {
		document.documentElement.setAttribute("data-navtheme", navTheme);
		localStorage.setItem("nav-theme", navTheme);
	}, [navTheme]);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (showProfile && profileRef.current && !profileRef.current.contains(e.target) && avatarRef.current && !avatarRef.current.contains(e.target)) {
				setShowProfile(false);
			}
			if (showDrawer && drawerRef.current && !drawerRef.current.contains(e.target) && hamburgerRef.current && !hamburgerRef.current.contains(e.target)) {
				setShowDrawer(false);
			}
		};
		const handleKey = (e) => {
			if (e.key === "Escape") {
				setShowProfile(false);
				setShowDrawer(false);
			}
		};
		document.addEventListener("click", handleClickOutside);
		document.addEventListener("keydown", handleKey);
		return () => {
			document.removeEventListener("click", handleClickOutside);
			document.removeEventListener("keydown", handleKey);
		};
	}, [showProfile, showDrawer]);

	const toggleNavTheme = () => {
		setNavTheme((prev) => (prev === "light" ? "dark" : "light"));
		onThemeToggle?.();
	};

	const toggleDrawer = () => {
		setShowDrawer((prev) => !prev);
		setShowProfile(false);
	};

	const toggleProfile = () => {
		setShowProfile((prev) => !prev);
		setShowDrawer(false);
	};

	const initial = (user?.name || user?.email || "U").trim().charAt(0).toUpperCase();

	return (
		<nav className="navbar" role="navigation" aria-label="Main navigation">
			<div className="navbar-container">
				<div className="nav-left">
					<button
						ref={hamburgerRef}
						className={`icon-btn hamburger ${showDrawer ? "is-open" : ""}`}
						aria-label="Open menu"
						aria-expanded={showDrawer}
						aria-controls="side-menu"
						onClick={toggleDrawer}
					>
						<span></span>
						<span></span>
						<span></span>
					</button>

					<div className="navbar-brand" onClick={() => onNavigate("home")} role="button" tabIndex={0} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onNavigate("home")}>
						<h1>Shopnexal</h1>
					</div>
				</div>

				<div className="nav-center">
					<div className="search">
						<span className="search-icon" aria-hidden="true">🔍</span>
						<input
							type="search"
							className="search-input"
							placeholder="Search products…"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							aria-label="Search products"
						/>
					</div>
				</div>

				<div className="nav-right">
					<button
						className="icon-btn badge-btn"
						aria-label="Wishlist"
						data-count={wishlistCount}
						onClick={() => onNavigate("wishlist")}
						title="Wishlist"
					>
						❤️
					</button>

					<button
						className="icon-btn badge-btn"
						aria-label="Cart"
						data-count={cartCount}
						onClick={() => onNavigate("cart")}
						title="Cart"
					>
						🛒
					</button>

					<button
						className="icon-btn theme-toggle"
						aria-label="Toggle navigation theme"
						onClick={toggleNavTheme}
						title="Toggle theme"
					></button>

					<button
						ref={avatarRef}
						className="icon-btn avatar"
						aria-label="Open profile menu"
						aria-haspopup="true"
						aria-expanded={showProfile}
						aria-controls="profile-menu"
						onClick={toggleProfile}
					>
						<span className="avatar-initial">{initial}</span>
					</button>

					<div
						ref={profileRef}
						id="profile-menu"
						className={`dropdown ${showProfile ? "is-open" : ""}`}
						role="menu"
						aria-hidden={!showProfile}
					>
						<div className="dropdown-header">
							<div className="avatar-sm">{initial}</div>
							<div>
								<div className="name">{user?.name || "User"}</div>
								<div className="email">{user?.email || "user@example.com"}</div>
							</div>
						</div>
						<button className="dropdown-item" role="menuitem" onClick={() => { onNavigate("profile"); setShowProfile(false); }}>My Profile</button>
						<button className="dropdown-item" role="menuitem" onClick={() => { onNavigate("orders"); setShowProfile(false); }}>My Orders</button>
						<button className="dropdown-item" role="menuitem" onClick={() => { onNavigate("addresses"); setShowProfile(false); }}>Addresses</button>
						<button className="dropdown-item" role="menuitem" onClick={() => { onNavigate("wishlist"); setShowProfile(false); }}>Wishlist</button>
						<button className="dropdown-item" role="menuitem" onClick={() => { onNavigate("settings"); setShowProfile(false); }}>Settings</button>
						<button className="dropdown-item logout" role="menuitem" onClick={onLogout}>Logout</button>
					</div>
				</div>
			</div>

			<aside
				ref={drawerRef}
				id="side-menu"
				className={`side-menu ${showDrawer ? "is-open" : ""}`}
				aria-label="Site menu"
			>
				<button className="side-link" onClick={() => { onNavigate("home"); setShowDrawer(false); }}>Home</button>
				<button className="side-link" onClick={() => { onNavigate("categories"); setShowDrawer(false); }}>Shop / Categories</button>
				<button className="side-link" onClick={() => { onNavigate("deals"); setShowDrawer(false); }}>Deals & Offers</button>
				<button className="side-link" onClick={() => { onNavigate("new"); setShowDrawer(false); }}>New Arrivals</button>
				<button className="side-link" onClick={() => { onNavigate("orders"); setShowDrawer(false); }}>Orders</button>
				<button className="side-link" onClick={() => { onNavigate("wishlist"); setShowDrawer(false); }}>Wishlist</button>
				<button className="side-link" onClick={() => { onNavigate("cart"); setShowDrawer(false); }}>Cart</button>
				<button className="side-link" onClick={() => { onNavigate("help"); setShowDrawer(false); }}>Help & Support</button>
			</aside>
			{showDrawer && <div className="side-overlay" onClick={() => setShowDrawer(false)}></div>}
		</nav>
	);
}

export default Navbar;
