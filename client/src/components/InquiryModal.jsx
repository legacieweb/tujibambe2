import React, { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';

const InquiryModal = ({ isOpen, onClose, defaultSubject }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="modal-content" style={{
        backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '12px',
        width: '90%', maxWidth: '500px', position: 'relative', border: '1px solid #333'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '1rem', right: '1rem', background: 'none',
          border: 'none', color: '#fff', cursor: 'pointer'
        }}>
          <X size={24} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <CheckCircle size={64} color="#27ae60" style={{ marginBottom: '1rem' }} />
            <h2>Inquiry Sent!</h2>
            <p>We'll get back to you shortly.</p>
          </div>
        ) : (
          <>
            <h2 style={{ marginBottom: '1rem' }}>Inquiry: {defaultSubject}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', background: '#333', border: 'none', color: '#fff' }}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', background: '#333', border: 'none', color: '#fff' }}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  required
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', background: '#333', border: 'none', color: '#fff' }}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" style={{
                width: '100%', padding: '1rem', borderRadius: '4px', backgroundColor: '#e67e22',
                color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
              }}>
                Send Inquiry <Send size={18} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default InquiryModal;
