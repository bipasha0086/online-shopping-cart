import React, { useEffect, useState } from "react";
import "../styles/LoginPage.css";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  useEffect(() => {
    document.body.classList.add("login-page-active");
    return () => document.body.classList.remove("login-page-active");
  }, []);

  const handlePasswordChange = (val) => {
    setPassword(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password) {
      setError("Please fill in both email and password");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (isSignUp && !fullName.trim()) {
      setError("Please enter your full name");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const stored = localStorage.getItem("authUsers");
      const users = stored ? JSON.parse(stored) : [];

      if (isSignUp) {
        const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (exists) {
          setError("An account with this email already exists");
          setLoading(false);
          return;
        }
        const newUser = { email, password, name: fullName.trim() };
        localStorage.setItem("authUsers", JSON.stringify([...users, newUser]));
        onLogin({ name: newUser.name, email: newUser.email, id: Math.random().toString(36).substr(2, 9) });
        setLoading(false);
        return;
      }

      if (email.toLowerCase() === "demo@example.com" && password === "Demo123!") {
        onLogin({ name: "Demo User", email, id: "demo-user" });
        setLoading(false);
        return;
      }

      const match = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (!match) {
        setError("No account found for this email. Try signing up.");
        setLoading(false);
        return;
      }
      if (match.password !== password) {
        setError("Incorrect password. Please try again.");
        setLoading(false);
        return;
      }

      onLogin({ name: match.name || match.email.split("@")[0], email: match.email, id: Math.random().toString(36).substr(2, 9) });
      setLoading(false);
    }, 500);
  };

  const fillDemo = () => {
    setEmail("demo@example.com");
    setPassword("Demo123!");
    setError("");
  };

  const handleSignupNavigate = () => {
    setIsSignUp(true);
    setTimeout(() => setError(""), 0);
  };

  const handleForgotPassword = () => {
    if (!email.trim()) {
      setError("Please enter your email address first");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setShowForgotModal(false);
    setResetEmailSent(true);
    setError("");
    
    setTimeout(() => {
      setResetEmailSent(false);
    }, 4000);
  };

  return (
    <div className="login-shell">
      <div className="login-card" role="dialog" aria-labelledby="login-title">
        <div className="login-header">
          <div className="brand-row">
            <div className="brand-mark">💎</div>
            <div>
              <p className="eyebrow">Welcome to your shopping app</p>
              <h1 id="login-title">Shopnexal</h1>
            </div>
          </div>
          <p className="hero-kicker">Find everything you need with a fast, secure checkout.</p>
          <div className="perks">
            <span className="perk-chip">⚡ Fast checkout</span>
            <span className="perk-chip">🎯 Smart picks</span>
            <span className="perk-chip">🔒 Secure by default</span>
          </div>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <h2>{isSignUp ? "Create your account" : "Sign in to continue"}</h2>
          <p className="subline">Access your cart, wishlist, and orders in one place.</p>

          {error && <div className="error-message" role="alert">
            <div>{error}</div>
            {error.includes("Incorrect password") && (
              <button
                type="button"
                className="forgot-password-btn"
                onClick={() => setShowForgotModal(true)}
              >
                Forgot password?
              </button>
            )}
          </div>}

          {resetEmailSent && (
            <div className="success-message" role="alert">
              ✓ Password reset email sent to <strong>{email}</strong>. Check your inbox to reset your password.
            </div>
          )}

          {isSignUp && (
            <div className="form-group floating">
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                aria-required="true"
                placeholder=" "
              />
              <label htmlFor="fullName">Full name</label>
            </div>
          )}

          <div className="form-group floating">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
              placeholder=" "
            />
            <label htmlFor="email">Email address</label>
          </div>

          <div className="form-group floating">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              required
              aria-required="true"
              placeholder=" "
            />
            <label htmlFor="password">Password</label>
            <button
              type="button"
              className="reveal-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            className={`cta-primary ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            <span className="cta-label">{isSignUp ? "Create Account" : "Sign In"}</span>
            {loading && <span className="spinner" aria-hidden="true"></span>}
          </button>
        </form>

        <div className="signup-row" aria-live="polite">
          <span>{isSignUp ? "Already have an account?" : "Don’t have an account?"}</span>
          <button
            type="button"
            className="signup-link"
            onClick={() => {
              if (isSignUp) {
                setIsSignUp(false);
              } else {
                handleSignupNavigate();
              }
            }}
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </div>
      </div>

      {showForgotModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Reset Your Password</h3>
            <p className="modal-text">Enter your email address and we'll send you a link to reset your password.</p>
            
            <div className="form-group floating">
              <input
                type="email"
                id="reset-email"
                placeholder=" "
                defaultValue={email}
              />
              <label htmlFor="reset-email">Email address</label>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowForgotModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="cta-primary"
                onClick={handleForgotPassword}
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
