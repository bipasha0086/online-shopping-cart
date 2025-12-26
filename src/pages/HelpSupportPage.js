import React, { useState } from 'react';
import '../styles/HelpSupportPage.css';

const HelpSupportPage = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('faq');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      id: 1,
      category: 'Shipping',
      question: 'How long does shipping take?',
      answer: 'Standard shipping typically takes 5-7 business days. Express shipping takes 2-3 business days. International shipping may take 10-15 business days depending on the destination.'
    },
    {
      id: 2,
      category: 'Shipping',
      question: 'Do you offer free shipping?',
      answer: 'Yes! We offer free shipping on orders over $50. For orders under $50, shipping costs $5.99 for standard delivery.'
    },
    {
      id: 3,
      category: 'Returns',
      question: 'What is your return policy?',
      answer: 'We accept returns within 30 days of purchase. Items must be unused and in original packaging. Once we receive and inspect your return, we\'ll process your refund within 5-7 business days.'
    },
    {
      id: 4,
      category: 'Returns',
      question: 'How do I initiate a return?',
      answer: 'To start a return, go to your order history, select the item, and click "Return Item". Follow the instructions to print your return label and ship the item back to us.'
    },
    {
      id: 5,
      category: 'Account',
      question: 'How do I reset my password?',
      answer: 'Click on the "Forgot Password" link on the login page and enter your email address. You\'ll receive an email with a link to reset your password within 10 minutes.'
    },
    {
      id: 6,
      category: 'Account',
      question: 'How do I delete my account?',
      answer: 'You can delete your account from the Settings page under "Account Security". Note that this action is permanent and cannot be undone.'
    },
    {
      id: 7,
      category: 'Billing',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted.'
    },
    {
      id: 8,
      category: 'Billing',
      question: 'Is it safe to enter my credit card information?',
      answer: 'Yes, your payment information is protected with 256-bit SSL encryption. We never store your full credit card details - only a secure token for future transactions.'
    },
    {
      id: 9,
      category: 'Technical',
      question: 'Why is the website running slowly?',
      answer: 'Try clearing your browser cache and cookies, or use a different browser. If the issue persists, contact our support team and include details about your browser and internet speed.'
    },
    {
      id: 10,
      category: 'Technical',
      question: 'I\'m having trouble logging in. What should I do?',
      answer: 'First, try resetting your password using the "Forgot Password" link. If you still can\'t log in, clear your cache and cookies, then try again. Contact support if the problem continues.'
    }
  ];

  const categories = ['All', 'Shipping', 'Returns', 'Account', 'Billing', 'Technical'];

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.subject && formData.message) {
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        category: 'general',
        subject: '',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const categories_state = [activeTab];

  return (
    <div className="help-support-page">
      <div className="help-container">
        <div className="help-header">
          <h1>Help & Support</h1>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="help-tabs">
          <button 
            className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            ❓ FAQ
          </button>
          <button 
            className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            💬 Contact Support
          </button>
        </div>

        <div className="help-content">
          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="faq-section">
              <div className="faq-intro">
                <p>Find answers to common questions below. If you can't find what you're looking for, please contact our support team.</p>
              </div>

              <div className="faq-list">
                {faqs.map(faq => (
                  <div 
                    key={faq.id} 
                    className={`faq-item ${expandedFAQ === faq.id ? 'expanded' : ''}`}
                  >
                    <div 
                      className="faq-question"
                      onClick={() => toggleFAQ(faq.id)}
                    >
                      <div className="question-content">
                        <span className="category-tag">{faq.category}</span>
                        <h3>{faq.question}</h3>
                      </div>
                      <span className="expand-icon">{expandedFAQ === faq.id ? '▼' : '▶'}</span>
                    </div>
                    {expandedFAQ === faq.id && (
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Support Tab */}
          {activeTab === 'contact' && (
            <div className="contact-section">
              <div className="contact-intro">
                <h2>Get in Touch</h2>
                <p>Can't find what you're looking for? Our support team is here to help!</p>
              </div>

              {submitted && (
                <div className="success-message">
                  <span className="success-icon">✓</span>
                  <p>Thank you! Your support ticket has been submitted. We'll get back to you within 24 hours.</p>
                </div>
              )}

              <form className="support-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="shipping">Shipping Question</option>
                    <option value="return">Return Request</option>
                    <option value="billing">Billing Issue</option>
                    <option value="technical">Technical Problem</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleFormChange}
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Please provide detailed information about your issue..."
                    rows="6"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  📧 Submit Ticket
                </button>
              </form>

              <div className="contact-info">
                <h3>Other Ways to Reach Us</h3>
                <div className="contact-methods">
                  <div className="contact-method">
                    <span className="method-icon">📞</span>
                    <div>
                      <h4>Phone Support</h4>
                      <p>xyz</p>
                      <p className="time">Monday - Friday, 9AM - 6PM EST</p>
                    </div>
                  </div>
                  <div className="contact-method">
                    <span className="method-icon">✉️</span>
                    <div>
                      <h4>Email Support</h4>
                      <p>support@shopnexal.com</p>
                      <p className="time">Response within 24 hours</p>
                    </div>
                  </div>
                  <div className="contact-method">
                    <span className="method-icon">💬</span>
                    <div>
                      <h4>Live Chat</h4>
                      <p>Chat with our team</p>
                      <p className="time">Available 24/7</p>
                    </div>
                  </div>
                  <div className="contact-method">
                    <span className="method-icon">🕐</span>
                    <div>
                      <h4>Response Time</h4>
                      <p>Typically within 2-4 hours</p>
                      <p className="time">Priority support available for premium members</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpSupportPage;
