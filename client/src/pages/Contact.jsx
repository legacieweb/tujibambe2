import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageCircle, 
  Clock, 
  Globe, 
  ChevronRight, 
  Sparkles,
  Zap,
  PhoneCall,
  Headphones,
  CheckCircle
} from 'lucide-react';
import '../styles/Home.css';
import heroVideo from '../assets/184737-873923039_small.mp4';

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
    <div className="home" style={{ paddingTop: '100px', background: '#050505' }}>
      {/* Hero Header */}
      <section style={{ 
        padding: '120px 0 60px', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(39, 174, 96, 0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0
        }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="elite-subtitle" style={{ letterSpacing: '4px', opacity: 0.8 }}>Available 24/7</span>
          <h1 className="elite-title" style={{ fontSize: '4.5rem', marginBottom: '20px' }}>
            Let's <span className="text-gradient">Connect</span>
          </h1>
          <p className="elite-description" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem' }}>
            Ready to start your next adventure? Our experts are here to help you design a journey that's uniquely yours.
          </p>
        </div>
      </section>

      {/* Contact Grid Section */}
      <section style={{ paddingBottom: '100px' }}>
        <div className="elite-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '60px', alignItems: 'start' }}>
          
          <div className="contact-info-grid" style={{ display: 'grid', gap: '24px' }}>
            <div className="contact-card" style={{ 
              background: 'rgba(255,255,255,0.02)', 
              padding: '40px', 
              borderRadius: '24px', 
              border: '1px solid rgba(255,255,255,0.05)',
              transition: 'all 0.3s ease'
            }}>
              <div className="elite-icon-box" style={{ marginBottom: '25px' }}><MapPin size={32} /></div>
              <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '15px' }}>Visit Our Studio</h3>
              <p style={{ color: '#aaa', lineHeight: '1.6' }}>123 Adventure Lane, Westlands Tower<br />Nairobi, Kenya</p>
              <a href="#" style={{ color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '20px', fontWeight: '600' }}>
                Get Directions <ChevronRight size={16} />
              </a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div className="contact-card" style={{ 
                background: 'rgba(255,255,255,0.02)', 
                padding: '30px', 
                borderRadius: '24px', 
                border: '1px solid rgba(255,255,255,0.05)' 
              }}>
                <div className="elite-icon-box" style={{ background: 'rgba(39, 174, 96, 0.1)', color: '#27ae60', marginBottom: '20px' }}><PhoneCall size={24} /></div>
                <h4 style={{ color: 'white', marginBottom: '10px' }}>Call Us</h4>
                <p style={{ color: '#aaa', fontSize: '0.9rem' }}>+254 (000) 111-222</p>
              </div>
              <div className="contact-card" style={{ 
                background: 'rgba(255,255,255,0.02)', 
                padding: '30px', 
                borderRadius: '24px', 
                border: '1px solid rgba(255,255,255,0.05)' 
              }}>
                <div className="elite-icon-box" style={{ background: 'rgba(52, 152, 219, 0.1)', color: '#3498db', marginBottom: '20px' }}><Mail size={24} /></div>
                <h4 style={{ color: 'white', marginBottom: '10px' }}>Email Us</h4>
                <p style={{ color: '#aaa', fontSize: '0.9rem' }}>hello@tujibambe.com</p>
              </div>
            </div>

            <div className="contact-card" style={{ 
              background: 'linear-gradient(135deg, rgba(39, 174, 96, 0.1) 0%, rgba(5, 5, 5, 0.02) 100%)', 
              padding: '40px', 
              borderRadius: '24px', 
              border: '1px solid rgba(39, 174, 96, 0.2)'
            }}>
              <h3 style={{ color: 'white', fontSize: '1.4rem', marginBottom: '15px' }}>Corporate Enquiries</h3>
              <p style={{ color: '#aaa', marginBottom: '20px' }}>Planning a group event or team building? Our specialized team can help.</p>
              <button className="btn-modern-primary" style={{ padding: '12px 25px' }}>
                <span className="btn-text">Group Travel</span>
              </button>
            </div>
          </div>

          <div className="contact-form-container" style={{ 
            background: 'rgba(255,255,255,0.01)', 
            padding: '60px', 
            borderRadius: '40px', 
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(20px)'
          }}>
            <h2 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '15px' }}>Send a Message</h2>
            <p style={{ color: '#777', marginBottom: '40px' }}>We usually respond within 2 hours during business hours.</p>
            
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '30px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '12px', color: '#999', fontSize: '0.9rem' }}>Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '18px', borderRadius: '16px', color: 'white', outline: 'none' }} 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '12px', color: '#999', fontSize: '0.9rem' }}>Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '18px', borderRadius: '16px', color: 'white', outline: 'none' }} 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '12px', color: '#999', fontSize: '0.9rem' }}>Subject</label>
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '18px', borderRadius: '16px', color: 'white', outline: 'none' }}
                >
                  <option value="" disabled style={{ background: '#111' }}>Select a topic</option>
                  <option value="General Inquiry" style={{ background: '#111' }}>General Inquiry</option>
                  <option value="Booking Support" style={{ background: '#111' }}>Booking Support</option>
                  <option value="Custom Tour" style={{ background: '#111' }}>Custom Tour Request</option>
                  <option value="Partnership" style={{ background: '#111' }}>Partnership Opportunities</option>
                </select>
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '12px', color: '#999', fontSize: '0.9rem' }}>Your Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6" 
                  style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '18px', borderRadius: '16px', color: 'white', outline: 'none', resize: 'none' }} 
                  placeholder="Tell us about your travel plans..."
                ></textarea>
              </div>
              
              <button type="submit" className="btn-modern-primary" style={{ 
                border: 'none', 
                width: '100%', 
                height: '60px',
                justifyContent: 'center',
                fontSize: '1.1rem',
                borderRadius: '16px'
              }}>
                <span className="btn-text">Send Message</span>
                <span className="btn-icon"><Send size={20} /></span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section - Minimal & Modern */}
      <section style={{ padding: '100px 0', background: '#000' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="elite-subtitle">Assistance</span>
            <h2 className="elite-title" style={{ fontSize: '3.5rem' }}>Common <span className="text-gradient">Questions</span></h2>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px' 
          }}>
            {[
              { q: "How do I book a tour?", a: "Browse our curated adventures on the Tours page and follow the intuitive booking process." },
              { q: "What should I pack?", a: "We provide comprehensive packing guides for every destination once your booking is confirmed." },
              { q: "Custom itineraries?", a: "Absolutely. Our specialists love creating bespoke journeys tailored to your specific dreams." },
              { q: "Cancellation policy?", a: "Flexible options are available. Please refer to our terms or contact support for specifics." }
            ].map((faq, i) => (
              <div key={i} style={{ 
                background: 'rgba(255,255,255,0.02)', 
                padding: '40px', 
                borderRadius: '24px', 
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'transform 0.3s ease'
              }} className="faq-card">
                <h3 style={{ color: 'white', fontSize: '1.25rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <MessageCircle size={20} color="var(--primary)" /> {faq.q}
                </h3>
                <p style={{ color: '#888', lineHeight: '1.7' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social & Community Section */}
      <section style={{ padding: '100px 0', background: '#050505' }}>
        <div className="elite-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div className="image-frame" style={{ height: '500px', borderRadius: '40px', overflow: 'hidden' }}>
            <img 
              src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Travel Community" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <span className="elite-subtitle">Join the Tribe</span>
            <h2 className="elite-title" style={{ fontSize: '3rem', marginBottom: '25px' }}>Always <span className="text-gradient">Connected</span></h2>
            <p className="elite-description" style={{ marginBottom: '40px' }}>
              Follow our journey across social platforms for daily inspiration, travel tips, and exclusive community offers. We're more than a company; we're a movement.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '16px' }}>
                <CheckCircle size={24} color="var(--primary)" />
                <span style={{ color: 'white', fontWeight: '500' }}>Local Experts</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '16px' }}>
                <CheckCircle size={24} color="var(--primary)" />
                <span style={{ color: 'white', fontWeight: '500' }}>24/7 Support</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '16px' }}>
                <CheckCircle size={24} color="var(--primary)" />
                <span style={{ color: 'white', fontWeight: '500' }}>Live Updates</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '16px' }}>
                <CheckCircle size={24} color="var(--primary)" />
                <span style={{ color: 'white', fontWeight: '500' }}>Direct Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
