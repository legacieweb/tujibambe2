import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import SEO from '../components/SEO';
import { AuthContext } from '../context/AuthContext';
import { 
  Mail, 
  Send, 
  MapPin, 
  PhoneCall,
  Clock,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import '../styles/Contact.css';

const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://tujibambe2.onrender.com';

const Contact = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });
    
    try {
      await axios.post(`${API_BASE_URL}/api/contact/inquiry`, formData);
      setStatus({ loading: false, success: true, error: null });
      setFormData(prev => ({ ...prev, message: '' }));
      if (!user) {
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
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

      <div className="contact-hero-refined">
        <div className="contact-container">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>WE ARE HERE FOR YOU</span>
          </div>
          <h1 className="contact-title-large">Let's start your <span className="text-highlight">Inquiry</span></h1>
          <p className="contact-subtitle-minimal">
            Have questions about a safari or event? Fill out the inquiry below and 
            our dedicated team will craft the perfect experience for you.
          </p>
        </div>
      </div>

      <section className="contact-section-minimal">
        <div className="contact-container">
          <div className="contact-grid-modern">
            
            <div className="contact-info-refined">
              <div className="info-group-minimal">
                <h3>Contact Information</h3>
                <p>Reach out to us directly through any of these channels.</p>
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
                    <p>Mon - Sun: 24/7 Availability</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="inquiry-form-card">
              {status.success ? (
                <div className="success-message-modern">
                  <div className="success-icon-container">
                    <CheckCircle2 size={48} className="success-icon" />
                  </div>
                  <h2>Inquiry Received!</h2>
                  <p>Thank you, <strong>{formData.name}</strong>. We've received your request and our specialists are already looking into it.</p>
                  <button onClick={() => setStatus({ ...status, success: false })} className="btn-modern-outline">
                    Send another inquiry <ArrowRight size={18} />
                  </button>
                </div>
              ) : (
                <div className="inquiry-form-wrapper">
                  <div className="form-header">
                    <h3>Send an Inquiry</h3>
                    <p>Tell us what you're looking for</p>
                  </div>

                  <form onSubmit={handleSubmit} className="modern-inquiry-form">
                    {status.error && (
                      <div className="error-banner-minimal">
                        <AlertCircle size={18} />
                        <span>{status.error}</span>
                      </div>
                    )}
                    
                    <div className="inquiry-row">
                      <div className="form-group-modern">
                        <label><User size={14} /> Full Name</label>
                        <input 
                          type="text" 
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          readOnly={!!user}
                          className={user ? 'readonly-input' : ''}
                        />
                      </div>

                      <div className="form-group-modern">
                        <label><Mail size={14} /> Email Address</label>
                        <input 
                          type="email" 
                          name="email"
                          placeholder="email@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          readOnly={!!user}
                          className={user ? 'readonly-input' : ''}
                        />
                      </div>
                    </div>

                    <div className="form-group-modern">
                      <label><MessageCircle size={14} /> Subject</label>
                      <select 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="modern-select"
                      >
                        <option value="" disabled>What are you inquiring about?</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Safari Booking">Safari Booking</option>
                        <option value="Car Hire">Car Hire</option>
                        <option value="Events">Event Planning</option>
                        <option value="Safari Rally">Safari Rally 2026</option>
                      </select>
                    </div>

                    <div className="form-group-modern">
                      <label><MessageCircle size={14} /> Your Message</label>
                      <textarea 
                        name="message"
                        placeholder="Tell us about your travel plans, dates, or any special requests..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className={`btn-inquiry-submit ${status.loading ? 'loading' : ''}`}
                      disabled={status.loading}
                    >
                      {status.loading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>Processing Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Inquiry</span>
                          <Send size={18} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
