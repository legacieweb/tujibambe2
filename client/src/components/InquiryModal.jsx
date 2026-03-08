import React, { useState, useContext, useEffect } from 'react';
import { X, Send, User, Mail, MessageSquare, Info, Loader2, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../styles/InquiryModal.css';

const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://tujibambe2.onrender.com';

const InquiryModal = ({ isOpen, onClose, defaultSubject = '' }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: defaultSubject || '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      await axios.post(`${API_BASE_URL}/api/contact/inquiry`, formData);
      setStatus({ loading: false, success: true, error: null });
      setTimeout(() => {
        setStatus({ loading: false, success: false, error: null });
        setFormData(prev => ({ ...prev, message: '' }));
        onClose();
      }, 3000);
    } catch (err) {
      setStatus({ 
        loading: false, 
        success: false, 
        error: err.response?.data?.message || 'Failed to send inquiry' 
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="inquiry-modal-overlay" onClick={onClose}>
      <div className="inquiry-modal-container" onClick={e => e.stopPropagation()}>
        <button className="inquiry-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="inquiry-modal-header">
          <div className="inquiry-icon-badge">
            <Info size={24} />
          </div>
          <h2>Send an Inquiry</h2>
          <p>We'll get back to you within 24 hours.</p>
        </div>

        {status.success ? (
          <div className="inquiry-success-state">
            <div className="success-pulse">
              <CheckCircle size={64} />
            </div>
            <h3>Message Sent!</h3>
            <p>Thank you for reaching out. Our team will contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="inquiry-modal-form">
            {status.error && (
              <div className="inquiry-error-banner">
                {status.error}
              </div>
            )}
            
            <div className="inquiry-form-group">
              <label><User size={16} /> Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Your Name"
                required 
                readOnly={!!user}
              />
            </div>

            <div className="inquiry-form-group">
              <label><Mail size={16} /> Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="email@example.com"
                required 
                readOnly={!!user}
              />
            </div>

            <div className="inquiry-form-group">
              <label><MessageSquare size={16} /> Subject</label>
              <select name="subject" value={formData.subject} onChange={handleChange} required>
                <option value="">Select a topic</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Safari Booking">Safari Booking</option>
                <option value="Car Hire">Car Hire</option>
                <option value="Events">Event Planning</option>
              </select>
            </div>

            <div className="inquiry-form-group">
              <label><MessageSquare size={16} /> Your Message</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="How can we help you?"
                required
                rows="4"
              ></textarea>
            </div>

            <button type="submit" className="inquiry-submit-btn" disabled={status.loading}>
              {status.loading ? (
                <><Loader2 size={20} className="animate-spin" /> Sending...</>
              ) : (
                <><Send size={20} /> Send Inquiry</>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default InquiryModal;
