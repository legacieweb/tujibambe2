import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import { 
  Calendar, 
  Users, 
  Music, 
  Utensils, 
  Camera, 
  MapPin, 
  Star, 
  Award, 
  Briefcase, 
  Heart, 
  Coffee,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Zap,
  Globe,
  Compass,
  Layout,
  Layers,
  PhoneCall,
  DollarSign,
  Palette
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import '../styles/Home.css';
import '../styles/EventPlanner.css';
import heroVideo from '../assets/184737-873923039_small.mp4';

const EventPlanner = () => {
  const navigate = useNavigate();
  const packagesRef = useRef(null);

  const eventTypes = [
    {
      title: "Corporate Retreats",
      icon: <Briefcase size={32} />,
      description: "Boost team morale with luxury bush retreats, team-building exercises in the wild, and seamless conferencing facilities.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      theme: "#2980b9"
    },
    {
      title: "Wilderness Weddings",
      icon: <Heart size={32} />,
      description: "Say 'I Do' under the African sky. We handle everything from venue scouting to catering and decor in breathtaking locations.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      theme: "#e74c3c"
    },
    {
      title: "Private Celebrations",
      icon: <Star size={32} />,
      description: "Birthdays, anniversaries, or family reunions. We create intimate and grand celebrations tailored to your vision.",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      theme: "#f1c40f"
    }
  ];

  return (
    <div className="event-planner-page" style={{ backgroundColor: '#050505', color: 'white' }}>
      <SEO 
        title="Event Planning in Kenya - Tujibambe Adventures"
        description="Plan your dream event in Kenya with Tujibambe Adventures. From luxury weddings to corporate retreats and private celebrations in breathtaking safari locations."
        keywords="Kenya event planner, safari weddings, corporate retreats Kenya, event planning, luxury events Africa, wilderness celebrations"
        canonical="https://tujibambe.iyonicorp.com/event-planner"
      />
      {/* Premium Redesigned Hero Section */}
      <section className="hero-carousel redesigned-hero-premium" style={{ height: '100vh', position: 'relative', background: '#000', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="carousel-container" style={{ height: '100%', width: '100%' }}>
          <div className="carousel-bg">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="slide-video-bg"
              style={{ filter: 'brightness(0.3) contrast(1.2)' }}
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
            {/* Dynamic Overlay Layers */}
            <div className="carousel-overlay" style={{ background: 'radial-gradient(circle at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%), linear-gradient(to top, #050505 0%, transparent 40%)' }}></div>
            
            {/* Ambient Light Effect */}
            <div style={{ position: 'absolute', top: '20%', left: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(241, 196, 15, 0.05) 0%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none' }}></div>
          </div>
          
          <div className="carousel-content" style={{ padding: '0 5%' }}>
            <div className="header-content-premium" style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center', zIndex: 10, position: 'relative' }}>
              
              <div className="hero-eyebrow" style={{ 
                opacity: 0,
                animation: 'fadeInUp 1s ease-out forwards',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '15px',
                marginBottom: '25px'
              }}>
                <div style={{ height: '1px', width: '30px', background: '#f1c40f' }}></div>
                <span style={{ color: '#f1c40f', fontWeight: '700', letterSpacing: '8px', fontSize: '0.75rem', textTransform: 'uppercase' }}>Established Excellence</span>
                <div style={{ height: '1px', width: '30px', background: '#f1c40f' }}></div>
              </div>
              
              <h1 className="hero-title-premium" style={{ 
                fontWeight: '900', 
                lineHeight: '0.95', 
                marginBottom: '40px',
                letterSpacing: '-3px',
                animation: 'revealTextLarge 1.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}>
                Crafting <span className="text-outline" style={{ 
                  color: 'transparent', 
                  WebkitTextStroke: '1px rgba(255,255,255,0.4)',
                  position: 'relative'
                }}>Legacies</span> <br />
                <span style={{ color: '#f1c40f' }}>One Event</span> at a Time
              </h1>
              
              <p className="hero-subtitle-premium" style={{ 
                color: 'rgba(255,255,255,0.7)', 
                fontSize: '1.2rem', 
                maxWidth: '700px', 
                margin: '0 auto 50px',
                lineHeight: '1.6',
                animation: 'fadeInUp 1s ease-out 0.4s both',
                fontWeight: '300',
                letterSpacing: '0.5px'
              }}>
                From intimate wilderness weddings to high-stakes corporate retreats, we transform your vision into an immersive, world-class experience.
              </p>
              
              <div className="hero-action-row" style={{ 
                display: 'flex', 
                gap: '20px', 
                justifyContent: 'center',
                alignItems: 'center',
                animation: 'fadeInUp 1s ease-out 0.6s both'
              }}>
                <a 
                  href="#services" 
                  className="btn-luxury-primary" 
                  style={{ 
                    background: '#f1c40f', 
                    color: '#000', 
                    borderRadius: '100px', 
                    padding: '1.2rem 3rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                >
                  Start Planning <ArrowRight size={20} />
                </a>
                <a href="#services" className="btn-luxury-outline" style={{ 
                  borderRadius: '100px', 
                  padding: '1.2rem 3rem', 
                  border: '1px solid rgba(255,255,255,0.2)', 
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  transition: 'all 0.3s ease'
                }}>
                  View Portfolio
                </a>
              </div>
            </div>
          </div>
          
          {/* Refined Scroll Indicator */}
          <div className="scroll-indicator-minimal" style={{ 
            position: 'absolute', 
            bottom: '20px', 
            left: '50%', 
            transform: 'translateX(-50%)',
            opacity: 0.5,
            animation: 'bounce 2s infinite'
          }}>
            <div style={{ width: '1px', height: '30px', background: 'linear-gradient(to bottom, #f1c40f, transparent)' }}></div>
          </div>
        </div>
      </section>

      {/* Signature Event Styles Section */}
      <section id="services" ref={packagesRef} className="signature-services" style={{ padding: '150px 10%', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <div className="bg-compass" style={{ position: 'absolute', top: '0', right: '0', opacity: '0.05' }}>
          <Compass size={500} strokeWidth={0.5} color="#f1c40f" />
        </div>
        
        <div className="section-header" style={{ marginBottom: '100px', textAlign: 'left' }}>
          <span style={{ color: '#f1c40f', fontSize: '1.1rem', letterSpacing: '5px' }}>Our Curated Themes</span>
          <h2 className="section-title-modern" style={{ fontSize: '3.5rem', color: 'white', marginTop: '15px' }}>Tailored <span style={{ color: '#f1c40f' }}>Excellence</span></h2>
        </div>
        
        <div className="event-types-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
          {eventTypes.map((event, index) => (
            <div 
              key={index} 
              className="event-card"
              style={{ 
                background: 'rgba(255,255,255,0.02)', 
                borderRadius: '30px', 
                overflow: 'hidden', 
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <div className="card-image-wrapper" style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
                <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                <div className="card-icon-badge" style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)', padding: '10px', borderRadius: '15px', color: '#fff' }}>
                  {event.icon}
                </div>
              </div>
              <div className="card-content" style={{ padding: '40px' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#f1c40f' }}>{event.title}</h3>
                <p style={{ color: '#aaa', lineHeight: '1.8', marginBottom: '30px', fontSize: '1.1rem' }}>{event.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Link 
                    to={event.title.includes('Corporate') ? '/event-planner/corporate' : event.title.includes('Wedding') ? '/event-planner/weddings' : '/event-planner/parties'}
                    style={{ 
                      color: 'white', 
                      fontSize: '0.9rem', 
                      fontWeight: '700', 
                      textTransform: 'uppercase', 
                      letterSpacing: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    Explore Theme <ChevronRight size={18} color="#f1c40f" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Your Venue, Our Design Section */}
      <section className="venue-design-section" style={{ padding: '150px 10%', background: '#050505', position: 'relative' }}>
        <div className="elite-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '100px', alignItems: 'center' }}>
          <div className="elite-visual">
            <div style={{ position: 'relative' }}>
              <div className="visual-image-container" style={{ 
                width: '100%', 
                height: '600px', 
                borderRadius: '40px', 
                overflow: 'hidden', 
                boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <img src="https://images.unsplash.com/photo-1505232458627-d620546971f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Venue Decoration" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="visual-badge" style={{ 
                position: 'absolute', 
                top: '-30px', 
                right: '-30px', 
                background: '#f1c40f', 
                color: '#000', 
                padding: '30px', 
                borderRadius: '30px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                maxWidth: '280px'
              }}>
                <Sparkles size={32} style={{ marginBottom: '15px' }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '10px' }}>Venue Transformation</h4>
                <p style={{ fontSize: '0.9rem', fontWeight: '500', opacity: '0.8' }}>We take your existing space and turn it into a high-end luxury environment.</p>
              </div>
            </div>
          </div>
          
          <div className="elite-info">
            <span style={{ color: '#f1c40f', fontWeight: '800', letterSpacing: '5px', textTransform: 'uppercase', fontSize: '1rem' }}>Your Canvas, Our Paint</span>
            <h2 className="section-title-modern" style={{ fontSize: '3.5rem', marginTop: '20px', lineHeight: '1.1', color: 'white' }}>Atmosphere & <span style={{ color: '#f1c40f' }}>Artistry</span></h2>
            <p style={{ fontSize: '1.2rem', color: '#888', lineHeight: '1.8', marginTop: '30px' }}>
              Already have the perfect location? Whether it's a private estate, a corporate headquarters, or a remote bush site, our decor and management team will breathe life into it.
            </p>
            
            <div className="features-stack" style={{ display: 'grid', gap: '25px', marginTop: '40px' }}>
              <div className="feature-item-modern" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(241,196,15,0.1)', color: '#f1c40f', padding: '15px', borderRadius: '15px' }}><Layout size={24} /></div>
                <div>
                  <h4 style={{ fontSize: '1.3rem', color: 'white', marginBottom: '5px' }}>Custom Scenic Design</h4>
                  <p style={{ color: '#777' }}>Bespoke stage designs, lighting plots, and floral architectures tailored to your space.</p>
                </div>
              </div>
              <div className="feature-item-modern" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(241,196,15,0.1)', color: '#f1c40f', padding: '15px', borderRadius: '15px' }}><Layers size={24} /></div>
                <div>
                  <h4 style={{ fontSize: '1.3rem', color: 'white', marginBottom: '5px' }}>Full-Spectrum Management</h4>
                  <p style={{ color: '#777' }}>We handle vendor logistics, guest flow, and technical production so you can be a guest at your own event.</p>
                </div>
              </div>
            </div>
            
            <a href="#contact-form" className="btn-modern-primary" style={{ marginTop: '50px', border: '1px solid #f1c40f', background: 'transparent', color: '#f1c40f' }}>
              <span className="btn-text">Discuss Your Venue</span>
              <span className="btn-icon" style={{ background: '#f1c40f', color: '#000' }}><ArrowRight size={20} /></span>
            </a>
          </div>
        </div>
      </section>

      {/* Modern Contact / Booking Section */}
      <section id="contact-form" className="contact-section-modern" style={{ padding: '150px 10%', background: '#0a0a0a' }}>
        <div className="contact-container-modern" style={{ 
          background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', 
          borderRadius: '40px', 
          border: '1px solid rgba(255,255,255,0.05)',
          padding: '80px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center'
        }}>
          <div className="contact-info-modern">
            <span style={{ color: '#f1c40f', fontWeight: '800', letterSpacing: '5px', textTransform: 'uppercase' }}>Ready to Begin?</span>
            <h2 className="section-title-modern" style={{ fontSize: '3.5rem', color: 'white', marginTop: '20px' }}>Start Your <span style={{ color: '#f1c40f' }}>Inquiry</span></h2>
            <p style={{ fontSize: '1.2rem', color: '#888', marginTop: '30px', lineHeight: '1.8' }}>
              Our senior planners are ready to help you draft the blueprint for your next extraordinary event. Tell us a bit about your vision, and we'll handle the rest.
            </p>
            <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#aaa' }}>
                <CheckCircle size={20} color="#f1c40f" /> <span>24-hour response guarantee</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#aaa' }}>
                <CheckCircle size={20} color="#f1c40f" /> <span>Complimentary initial blueprint session</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#aaa' }}>
                <CheckCircle size={20} color="#f1c40f" /> <span>Full vendor network access</span>
              </div>
            </div>
          </div>
          
          <form style={{ display: 'grid', gap: '25px' }} className="contact-form-modern">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-row-modern">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: '#777' }}>Full Name</label>
                <input type="text" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '18px', borderRadius: '15px', color: 'white', fontSize: '1rem' }} placeholder="John Doe" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: '#777' }}>Email Address</label>
                <input type="email" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '18px', borderRadius: '15px', color: 'white', fontSize: '1rem' }} placeholder="john@example.com" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: '#777' }}>Event Category</label>
              <select 
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '18px', borderRadius: '15px', color: 'white', fontSize: '1rem', appearance: 'none' }}
              >
                <option value="" disabled selected>Select a Category</option>
                <option value="corporate">Corporate Strategic Retreat</option>
                <option value="wedding">Wilderness Destination Wedding</option>
                <option value="private">Private Elite Celebration</option>
                <option value="decor">Venue Decor & Management Only</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: '#777' }}>Brief vision description</label>
              <textarea style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '18px', borderRadius: '15px', color: 'white', fontSize: '1rem', resize: 'none' }} rows="4" placeholder="Share your initial thoughts..."></textarea>
            </div>
            <button 
              type="submit" 
              className="btn-modern-primary" 
              style={{ 
                background: '#f1c40f', 
                color: '#000', 
                width: '100%', 
                border: 'none', 
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <span className="btn-text" style={{ fontWeight: '900' }}>
                Submit Inquiry
              </span>
              <span className="btn-icon" style={{ background: 'rgba(0,0,0,0.1)' }}><ArrowRight size={20} /></span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EventPlanner;
