import React, { useState, useEffect } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Wishlist from "./pages/WishlistPage";
import Settings from "./pages/SettingsPage";
import MyOrders from "./pages/MyOrdersPage";
import MyProfile from "./pages/MyProfilePage";
import HelpSupport from "./pages/HelpSupportPage";
import CategoriesPage from "./pages/CategoriesPage";
import DealsPage from "./pages/DealsPage";
import NewArrivalsPage from "./pages/NewArrivalsPage";
import AddressesPage from "./pages/AddressesPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [currentPage, setCurrentPage] = useState("home"); // home, cart, wishlist, settings, orders, profile, help
  const [orders, setOrders] = useState([]);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
    if (storedDarkMode) {
      setIsDarkMode(JSON.parse(storedDarkMode));
    }
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setCartItems([]);
    setWishlistItems([]);
    setCurrentPage("home");
    localStorage.removeItem("user");
  };

  const addToWishlist = (product) => {
    const exists = wishlistItems.find(item => item.id === product.id);
    if (exists) {
      setWishlistItems(wishlistItems.filter(item => item.id !== product.id));
    } else {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toLocaleDateString(),
      status: "Delivered",
      trackingNumber: "TRACK" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    };
    
    setOrders([...orders, newOrder]);
    setCartItems([]);
    setCurrentPage("home");
  };

  const updateUserProfile = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  return (
    <div className="app">
      {isLoggedIn ? (
        <>
          <Navbar 
            user={user} 
            onLogout={handleLogout} 
            cartCount={cartItems.length}
            isDarkMode={isDarkMode}
            onThemeToggle={() => setIsDarkMode(!isDarkMode)}
            wishlistCount={wishlistItems.length}
            onNavigate={setCurrentPage}
            currentPage={currentPage}
            ordersCount={orders.length}
          />

          {currentPage === "home" && (
            <HomePage 
              user={user} 
              cartItems={cartItems} 
              onAddToCart={addToCart}
              onRemoveFromCart={removeFromCart}
              onUpdateCartQuantity={updateCartQuantity}
              isDarkMode={isDarkMode}
              wishlistItems={wishlistItems}
              onAddToWishlist={addToWishlist}
              isInWishlist={isInWishlist}
              onCheckout={() => setCurrentPage("cart")}
            />
          )}

          {currentPage === "cart" && (
            <Cart
              cartItems={cartItems}
              onRemoveFromCart={removeFromCart}
              onUpdateCartQuantity={updateCartQuantity}
              totalPrice={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
              onClose={() => setCurrentPage("home")}
              onCheckout={handleCheckout}
            />
          )}

          {currentPage === "wishlist" && (
            <Wishlist
              wishlistItems={wishlistItems}
              onRemoveFromWishlist={addToWishlist}
              onAddToCart={addToCart}
              onClose={() => setCurrentPage("home")}
              cartItems={cartItems}
              isInWishlist={isInWishlist}
            />
          )}

          {currentPage === "orders" && (
            <MyOrders
              orders={orders}
              onClose={() => setCurrentPage("home")}
            />
          )}

          {currentPage === "profile" && (
            <MyProfile
              user={user}
              onUpdateProfile={updateUserProfile}
              onClose={() => setCurrentPage("home")}
            />
          )}

          {currentPage === "settings" && (
            <Settings
              user={user}
              onClose={() => setCurrentPage("home")}
              isDarkMode={isDarkMode}
              onThemeToggle={() => setIsDarkMode(!isDarkMode)}
            />
          )}

          {currentPage === "help" && (
            <HelpSupport
              onClose={() => setCurrentPage("home")}
            />
          )}

          {currentPage === "categories" && (
            <CategoriesPage
              cartItems={cartItems}
              onAddToCart={addToCart}
              onRemoveFromCart={removeFromCart}
              onUpdateCartQuantity={updateCartQuantity}
              isDarkMode={isDarkMode}
              wishlistItems={wishlistItems}
              onAddToWishlist={addToWishlist}
              isInWishlist={isInWishlist}
              onClose={() => setCurrentPage("home")}
            />
          )}

          {currentPage === "deals" && (
            <DealsPage
              cartItems={cartItems}
              onAddToCart={addToCart}
              onRemoveFromCart={removeFromCart}
              onUpdateCartQuantity={updateCartQuantity}
              isDarkMode={isDarkMode}
              wishlistItems={wishlistItems}
              onAddToWishlist={addToWishlist}
              isInWishlist={isInWishlist}
              onClose={() => setCurrentPage("home")}
            />
          )}

          {currentPage === "new" && (
            <NewArrivalsPage
              cartItems={cartItems}
              onAddToCart={addToCart}
              onRemoveFromCart={removeFromCart}
              onUpdateCartQuantity={updateCartQuantity}
              isDarkMode={isDarkMode}
              wishlistItems={wishlistItems}
              onAddToWishlist={addToWishlist}
              isInWishlist={isInWishlist}
              onClose={() => setCurrentPage("home")}
            />
          )}

          {currentPage === "addresses" && (
            <AddressesPage
              user={user}
              onClose={() => setCurrentPage("home")}
            />
          )}
        </>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
