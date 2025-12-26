import React, { useState } from 'react';
import '../styles/MyProfilePage.css';

const MyProfilePage = ({ user, onUpdateProfile, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || '',
    profilePicture: user?.profilePicture || '👤'
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      setMessage('Name and email are required!');
      return;
    }
    
    onUpdateProfile(formData);
    setMessage('✓ Profile updated successfully!');
    setIsEditing(false);
    
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || '',
      state: user?.state || '',
      zipCode: user?.zipCode || '',
      profilePicture: user?.profilePicture || '👤'
    });
    setIsEditing(false);
    setMessage('');
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="profile-content">
          {/* Profile Picture Section */}
          <div className="profile-picture-section">
            <div className="profile-avatar">{formData.profilePicture}</div>
            {isEditing && (
              <div className="emoji-selector">
                <button onClick={() => setFormData({...formData, profilePicture: '👨'})}>👨</button>
                <button onClick={() => setFormData({...formData, profilePicture: '👩'})}>👩</button>
                <button onClick={() => setFormData({...formData, profilePicture: '👦'})}>👦</button>
                <button onClick={() => setFormData({...formData, profilePicture: '👧'})}>👧</button>
                <button onClick={() => setFormData({...formData, profilePicture: '🧑'})}>🧑</button>
              </div>
            )}
          </div>

          {/* Message Alert */}
          {message && (
            <div className={`message-alert ${message.includes('✓') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          {/* Profile Information */}
          <div className="profile-info">
            {!isEditing ? (
              <div className="view-mode">
                <div className="info-group">
                  <label>Full Name</label>
                  <p>{formData.name}</p>
                </div>
                <div className="info-group">
                  <label>Email</label>
                  <p>{formData.email}</p>
                </div>
                <div className="info-group">
                  <label>Phone</label>
                  <p>{formData.phone || 'Not provided'}</p>
                </div>
                <div className="info-group">
                  <label>Address</label>
                  <p>{formData.address || 'Not provided'}</p>
                </div>
                <div className="info-group">
                  <label>City</label>
                  <p>{formData.city || 'Not provided'}</p>
                </div>
                <div className="info-group">
                  <label>State</label>
                  <p>{formData.state || 'Not provided'}</p>
                </div>
                <div className="info-group">
                  <label>Zip Code</label>
                  <p>{formData.zipCode || 'Not provided'}</p>
                </div>

                <div className="action-buttons">
                  <button className="edit-btn" onClick={() => setIsEditing(true)}>
                    ✎ Edit Profile
                  </button>
                </div>
              </div>
            ) : (
              <div className="edit-mode">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                    />
                  </div>

                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="State"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Enter zip code"
                  />
                </div>

                <div className="action-buttons">
                  <button className="save-btn" onClick={handleSave}>
                    ✓ Save Changes
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    ✕ Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Account Statistics */}
          <div className="account-stats">
            <h3>Account Information</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-icon">📅</span>
                <p className="stat-label">Member Since</p>
                <p className="stat-value">2024</p>
              </div>
              <div className="stat-card">
                <span className="stat-icon">🛒</span>
                <p className="stat-label">Total Orders</p>
                <p className="stat-value">12</p>
              </div>
              <div className="stat-card">
                <span className="stat-icon">❤️</span>
                <p className="stat-label">Wishlist Items</p>
                <p className="stat-value">5</p>
              </div>
              <div className="stat-card">
                <span className="stat-icon">⭐</span>
                <p className="stat-label">Rewards Points</p>
                <p className="stat-value">2450</p>
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div className="account-security">
            <h3>Account Security</h3>
            <div className="security-options">
              <div className="security-item">
                <div className="security-info">
                  <h4>Password</h4>
                  <p>Change your password regularly to keep your account secure</p>
                </div>
                <button className="secondary-btn">Change Password</button>
              </div>
              <div className="security-item">
                <div className="security-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Add an extra layer of security to your account</p>
                </div>
                <button className="secondary-btn">Enable 2FA</button>
              </div>
              <div className="security-item">
                <div className="security-info">
                  <h4>Active Sessions</h4>
                  <p>Manage your active login sessions</p>
                </div>
                <button className="secondary-btn">View Sessions</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
