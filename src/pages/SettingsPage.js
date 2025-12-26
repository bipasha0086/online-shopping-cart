import React, { useState } from "react";
import "../styles/SettingsPage.css";

function SettingsPage({ user, onClose, isDarkMode, onThemeToggle }) {
  const [activeTab, setActiveTab] = useState("account");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <h1>⚙️ Settings</h1>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="settings-content">
          <div className="settings-tabs">
            <button
              className={`tab-btn ${activeTab === "account" ? "active" : ""}`}
              onClick={() => setActiveTab("account")}
            >
              👤 Account
            </button>
            <button
              className={`tab-btn ${activeTab === "preferences" ? "active" : ""}`}
              onClick={() => setActiveTab("preferences")}
            >
              🎨 Preferences
            </button>
            <button
              className={`tab-btn ${activeTab === "notifications" ? "active" : ""}`}
              onClick={() => setActiveTab("notifications")}
            >
              🔔 Notifications
            </button>
            <button
              className={`tab-btn ${activeTab === "privacy" ? "active" : ""}`}
              onClick={() => setActiveTab("privacy")}
            >
              🔒 Privacy
            </button>
          </div>

          <div className="settings-panel">
            {activeTab === "account" && (
              <div className="setting-section">
                <h2>Account Settings</h2>
                <div className="setting-item">
                  <label>Email:</label>
                  <p className="setting-value">{user.email}</p>
                </div>
                <div className="setting-item">
                  <label>Name:</label>
                  <p className="setting-value">{user.name}</p>
                </div>
                <div className="setting-item">
                  <label>Member Since:</label>
                  <p className="setting-value">December 2025</p>
                </div>
                <button className="update-btn">Update Profile</button>
                <button className="change-password-btn">Change Password</button>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="setting-section">
                <h2>Preferences</h2>
                <div className="setting-item">
                  <label>Theme:</label>
                  <button
                    className="theme-btn"
                    onClick={onThemeToggle}
                  >
                    {isDarkMode ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode"}
                  </button>
                </div>
                <div className="setting-item">
                  <label>Language:</label>
                  <select className="preference-select">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Currency:</label>
                  <select className="preference-select">
                    <option>₹ Indian Rupee</option>
                    <option>$ US Dollar</option>
                    <option>€ Euro</option>
                    <option>£ British Pound</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="setting-section">
                <h2>Notification Settings</h2>
                <div className="setting-item toggle-item">
                  <div>
                    <label>Push Notifications</label>
                    <p className="setting-description">Get notifications about orders and updates</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                    className="toggle-switch"
                  />
                </div>
                <div className="setting-item toggle-item">
                  <div>
                    <label>Email Updates</label>
                    <p className="setting-description">Receive promotional emails and offers</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailUpdates}
                    onChange={(e) => setEmailUpdates(e.target.checked)}
                    className="toggle-switch"
                  />
                </div>
                <div className="setting-item toggle-item">
                  <div>
                    <label>Order Updates</label>
                    <p className="setting-description">Get email notifications for order status</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="toggle-switch"
                  />
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="setting-section">
                <h2>Privacy & Security</h2>
                <div className="setting-item">
                  <label>Two-Factor Authentication:</label>
                  <button className="security-btn">Enable 2FA</button>
                </div>
                <div className="setting-item">
                  <label>Session Timeout:</label>
                  <select className="preference-select">
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>Never</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Delete Account:</label>
                  <p className="setting-description">Permanently delete your account and all data</p>
                  <button className="delete-btn">Delete Account</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="settings-footer">
          <button className="save-btn">💾 Save Changes</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
