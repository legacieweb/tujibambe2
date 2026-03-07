import React, { useState } from 'react';
import axios from 'axios';
import SEO from '../components/SEO';
import { 
  Mail, 
  Send, 
  MapPin, 
  PhoneCall,
  Clock,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import '../styles/Contact.css';

const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://tujibambe2.onrender.com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });
    
    try {
      await axios.post(`${API_BASE_URL}/api/contact/inquiry`, formData);
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
    } catch (err) {
      console.error('Submission error:', err);
      setStatus({ 
        loading: false, 
        success: false, 
        error: err.response?.data?.message || 'Something went wrong. Please try again later.' 
      });
    }
  };

  return (
    <div className="contact-page">
      <SEO 
        title="Contact Us - Tujibambe Adventures"
        description="Get in touch with our experts to plan your perfect African journey. We're available 24/7."
        keywords="contact Tujibambe, travel experts Nairobi, adventure planning"
        canonical="https://tujibambe.iyonicorp.com/contact"
      />

      <div className="contact-hero-minimal">
        <div className="contact-container">
          <h1 className="contact-title-large">Get in <span className="text-highlight">Touch</span></h1>
          <p className="contact-subtitle-minimal">
            We'd love to hear from you. Our team is always here to help.
          </p>
        </div>
      </div>

      <section className="contact-section-minimal">
        <div className="contact-container">
          <div className="contact-grid-modern">
            
            <div className="contact-info-refined">
              <div className="info-group-minimal">
                <h3>Contact Information</h3>
                <p>Fill out the form and our team will get back to you within 24 hours.</p>
              </div>

              <div className="contact-links-minimal">
                <a href="tel:+254726511419" className="contact-link-card">
                  <div className="icon-box-minimal"><PhoneCall size={20} /></div>
                  <div className="link-details">
                    <span>Call us</span>
                    <p>+254 (726) 511-419</p>
                  </div>
                </a>

                <a href="mailto:hello@iyonicorp.com" className="contact-link-card">
                  <div className="icon-box-minimal"><Mail size={20} /></div>
                  <div className="link-details">
                    <span>Email us</span>
                    <p>hello@iyonicorp.com</p>
                  </div>
                </a>

                <div className="contact-link-card">
                  <div className="icon-box-minimal"><MapPin size={20} /></div>
                  <div className="link-details">
                    <span>Visit us</span>
                    <p>123 Adventure Lane, Nairobi, Kenya</p>
                  </div>
                </div>

                <div className="contact-link-card">
                  <div className="icon-box-minimal"><Clock size={20} /></div>
                  <div className="link-details">
                    <span>Working Hours</span>
                    <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-refined">
              {status.success ? (
                <div className="success-message-minimal">
                  <CheckCircle2 size={48} className="success-icon" />
                  <h2>Message Sent!</h2>
                  <p>Thank you for reaching out. We will get back to you shortly.</p>
                  <button onClick={() => setStatus({ ...status, success: false })} className="btn-reset">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="minimal-form">
                  {status.error && (
                    <div className="error-banner-minimal">
                      <AlertCircle size={18} />
                      <span>{status.error}</span>
                    </div>
                  )}
                  
                  <div className="form-group-minimal">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group-minimal">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group-minimal">
                    <label>Subject</label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Select a topic</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Safari Booking">Safari Booking</option>
                      <option value="Car Hire">Car Hire</option>
                      <option value="Events">Event Planning</option>
                    </select>
                  </div>

                  <div className="form-group-minimal">
                    <label>Message</label>
                    <textarea 
                      name="message"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className={`btn-minimal-submit ${status.loading ? 'loading' : ''}`}
                    disabled={status.loading}
                  >
                    {status.loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
