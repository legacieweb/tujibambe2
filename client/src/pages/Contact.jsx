import React, { useState } from 'react';
import SEO from '../components/SEO';
import { 
  Mail, 
  Send, 
  MapPin, 
  PhoneCall,
  MessageCircle,
  CheckCircle,
  Globe,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import '../styles/Home.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for contacting us! We will get back to you shortly.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page home" style={{ paddingTop: '100px', background: '#050505' }}>
      <SEO 
        title="Connect With Us - Tujibambe Adventures"
        description="Ready for your next African adventure? Get in touch with our experts today. We're available 24/7 to help you plan your perfect journey."
        keywords="contact Tujibambe, Kenya safari help, travel experts Nairobi, adventure planning"
        canonical="https://tujibambe.iyonicorp.com/contact"
      />

      {/* Hero Header - Minimalist */}
      <section style={{ 
        padding: '120px 0 60px', 
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="container">
          <span className="elite-subtitle" style={{ letterSpacing: '8px' }}>GET IN TOUCH</span>
          <h1 className="elite-title" style={{ fontSize: '5rem', marginBottom: '20px' }}>
            Let's Start Your <br /><span className="text-gradient">Journey</span>
          </h1>
        </div>
      </section>

      {/* Main Contact Section */}
      <section style={{ paddingBottom: '120px' }}>
        <div className="elite-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '80px' }}>
          
          <div className="contact-sidebar">
            <div style={{ marginBottom: '60px' }}>
              <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '30px' }}>Our <span className="text-gradient">Studio</span></h2>
              <div style={{ display: 'grid', gap: '40px' }}>
                <div style={{ display: 'flex', gap: '25px' }}>
                  <div style={{ color: 'var(--primary)' }}><MapPin size={32} /></div>
                  <div>
                    <h4 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '8px' }}>Nairobi HQ</h4>
                    <p style={{ color: '#888', lineHeight: '1.6' }}>123 Adventure Lane, Westlands Tower<br />Nairobi, Kenya</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '25px' }}>
                  <div style={{ color: 'var(--primary)' }}><Mail size={32} /></div>
                  <div>
                    <h4 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '8px' }}>Email Us</h4>
                    <p style={{ color: '#888' }}>hello@tujibambe.com</p>
                    <p style={{ color: '#888' }}>support@tujibambe.com</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '25px' }}>
                  <div style={{ color: 'var(--primary)' }}><PhoneCall size={32} /></div>
                  <div>
                    <h4 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '8px' }}>Call Us</h4>
                    <p style={{ color: '#888' }}>+254 (000) 111-222</p>
                    <p style={{ color: '#888' }}>+254 (000) 333-444</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ 
              background: 'rgba(39, 174, 96, 0.05)', 
              padding: '40px', 
              borderRadius: '30px', 
              border: '1px solid rgba(39, 174, 96, 0.1)' 
            }}>
              <h4 style={{ color: 'white', marginBottom: '15px' }}>Working Hours</h4>
              <div style={{ display: 'grid', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#777' }}>Mon - Fri</span>
                  <span style={{ color: 'white' }}>8:00 AM - 6:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#777' }}>Saturday</span>
                  <span style={{ color: 'white' }}>9:00 AM - 4:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: '700' }}>Emergency</span>
                  <span style={{ color: 'white', fontWeight: '700' }}>24/7 Available</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper" style={{
            background: 'rgba(255,255,255,0.02)',
            padding: '80px',
            borderRadius: '50px',
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: '0 50px 100px rgba(0,0,0,0.5)'
          }}>
            <h2 style={{ fontSize: '3rem', color: 'white', marginBottom: '15px' }}>Send a <span className="text-gradient">Message</span></h2>
            <p style={{ color: '#777', marginBottom: '50px', fontSize: '1.1rem' }}>Have a specific question or want a custom itinerary? Fill out the form and our specialists will reach out.</p>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '35px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.1)', padding: '20px 0', color: 'white', fontSize: '1.1rem', outline: 'none' }} 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.1)', padding: '20px 0', color: 'white', fontSize: '1.1rem', outline: 'none' }} 
                  />
                </div>
              </div>
              
              <div className="form-group">
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.1)', padding: '20px 0', color: 'white', fontSize: '1.1rem', outline: 'none' }}
                >
                  <option value="" disabled style={{ background: '#111' }}>Select a topic</option>
                  <option value="General Inquiry" style={{ background: '#111' }}>General Inquiry</option>
                  <option value="Safari Booking" style={{ background: '#111' }}>Safari Booking</option>
                  <option value="Car Hire" style={{ background: '#111' }}>Car Hire Inquiry</option>
                  <option value="Events" style={{ background: '#111' }}>Event Planning</option>
                </select>
              </div>

              <div className="form-group">
                <textarea 
                  name="message"
                  placeholder="Tell us about your dream trip..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5" 
                  style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.1)', padding: '20px 0', color: 'white', fontSize: '1.1rem', outline: 'none', resize: 'none' }} 
                ></textarea>
              </div>
              
              <div style={{ marginTop: '20px' }}>
                <button type="submit" className="btn-modern-primary" style={{ border: 'none', padding: '20px 60px', fontSize: '1.2rem' }}>
                  <span className="btn-text">Send Message</span>
                  <span className="btn-icon"><Send size={20} /></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Map or Global Support Section */}
      <section style={{ padding: '100px 0', background: '#000', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="elite-subtitle">WORLDWIDE SUPPORT</span>
            <h2 className="elite-title" style={{ fontSize: '3rem', marginBottom: '30px' }}>Always <span className="text-gradient">Within Reach</span></h2>
            <p className="elite-description">No matter where you are in the world, our team is ready to assist. We speak English, Swahili, French, and German to ensure seamless communication.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
