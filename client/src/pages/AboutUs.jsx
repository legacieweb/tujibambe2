import React from 'react';
import { 
  Award, 
  Users, 
  Globe, 
  Shield, 
  Heart, 
  MapPin, 
  ChevronRight, 
  Sparkles, 
  Zap, 
  Compass, 
  Star, 
  ArrowRight,
  Target,
  Trophy
} from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import heroVideo from '../assets/184737-873923039_small.mp4';

const AboutUs = () => {
  return (
    <div className="home" style={{ paddingTop: '160px' }}>
      {/* Elite Experience Section - Who We Are */}
      <section id="story" className="elite-experience-section">
        <div className="elite-container">
          <div className="elite-info">
            <span className="elite-subtitle">The Tujibambe Spirit</span>
            <h2 className="elite-title">Who We <span className="text-gradient">Are</span></h2>
            <p className="elite-description">
              Tujibambe Adventures began with a simple passion: to share the raw, unfiltered beauty of Kenya with the world. Founded by a team of native explorers, we've grown from a small local guide service into one of East Africa's premier adventure travel companies.
            </p>
            <p className="elite-description">
              "Tujibambe" is a Swahili term that translates to "let's enjoy ourselves." This spirit of joy and discovery is at the heart of every expedition we lead. We believe that travel should be a transformative journey.
            </p>
            <div className="elite-features">
              <div className="elite-feature-item">
                <div className="elite-icon-box"><Target /></div>
                <div>
                  <h4>Our Mission</h4>
                  <p>To provide sustainable, life-changing adventures that connect people with nature and culture.</p>
                </div>
              </div>
              <div className="elite-feature-item">
                <div className="elite-icon-box"><Trophy /></div>
                <div>
                  <h4>Our Vision</h4>
                  <p>To be the world's most trusted gateway to the untamed beauty of the African continent.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="elite-visual">
            <div className="elite-image-grid">
              <div className="elite-img-card large">
                <img src="https://images.unsplash.com/photo-1523805081326-ed9622dfb974?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Team in the wild" />
                <div className="elite-img-overlay"></div>
              </div>
              <div className="elite-img-card small">
                <img src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Landscape" />
                <div className="elite-img-overlay"></div>
              </div>
            </div>
            <div className="elite-floating-stats">
              <div className="elite-stat">
                <Users size={20} />
                <span>10k+ Happy Travelers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values - Modern Grid */}
      <section className="activities-section" style={{ background: '#0a0a0a' }}>
        <div className="section-header">
          <span>Integrity & Passion</span>
          <h2>Our Core <span className="text-gradient">Values</span></h2>
        </div>
        <div className="activities-grid">
          {[
            { 
              title: "Safety First", 
              desc: "Your well-being is our top priority. Our guides are internationally certified experts.", 
              icon: <Shield size={40} />,
              img: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            },
            { 
              title: "Sustainability", 
              desc: "We practice 'Leave No Trace' principles and support local wildlife conservation.", 
              icon: <Globe size={40} />,
              img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            },
            { 
              title: "Community", 
              desc: "We partner with local communities to ensure the benefits of tourism are shared.", 
              icon: <Users size={40} />,
              img: "https://images.unsplash.com/photo-1489922221235-802316e6378e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            }
          ].map((val, i) => (
            <div key={i} className="activity-card">
              <div className="activity-img" style={{ backgroundImage: `url(${val.img})` }}></div>
              <div className="activity-overlay">
                <div style={{ color: 'var(--primary)', marginBottom: '15px' }}>{val.icon}</div>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section - High Impact */}
      <section className="features-section" style={{ background: '#000', padding: '100px 5%' }}>
        <div className="stats-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
          {[
            { label: "Years Experience", value: "15+", icon: <Award /> },
            { label: "Tours Completed", value: "500+", icon: <Zap /> },
            { label: "Local Guides", value: "50+", icon: <MapPin /> },
            { label: "Satisfaction", value: "100%", icon: <Star /> }
          ].map((stat, i) => (
            <div key={i} className="feature-item" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="icon-box" style={{ background: 'rgba(230, 126, 34, 0.1)' }}>{stat.icon}</div>
              <h3 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '10px' }}>{stat.value}</h3>
              <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: '700' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership - Modern Cards */}
      <section className="gallery-section" style={{ background: '#0a0a0a' }}>
        <div className="section-header">
          <span>The Visionaries</span>
          <h2>Meet Our <span className="text-gradient">Leadership</span></h2>
        </div>
        <div className="gallery-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {[
            { 
              name: "David Maina", 
              role: "Founder & CEO", 
              img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              desc: "A veteran climber with over 100 successful ascents of Mt. Kenya."
            },
            { 
              name: "Sarah Kemunto", 
              role: "Head of Operations", 
              img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              desc: "Ensuring every logistical detail is perfect for your adventure."
            },
            { 
              name: "John Otieno", 
              role: "Lead Safari Guide", 
              img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              desc: "Certified wildlife expert with a keen eye for spotting the Big Five."
            }
          ].map((leader, i) => (
            <div key={i} className="gallery-item" style={{ height: '500px' }}>
              <div className="image-frame" style={{ borderRadius: '30px' }}>
                <img src={leader.img} alt={leader.name} />
              </div>
              <div className="gallery-caption" style={{ padding: '30px', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '5px' }}>{leader.name}</h3>
                <p style={{ color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '10px' }}>{leader.role}</p>
                <p style={{ color: '#aaa', fontSize: '0.9rem' }}>{leader.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="elite-experience-section" style={{ background: '#000', textAlign: 'center' }}>
        <div className="carousel-content-wrapper" style={{ margin: '0 auto' }}>
          <h2 className="elite-title">Ready for Your <span className="text-gradient">Own</span> Story?</h2>
          <p className="elite-description" style={{ margin: '0 auto 40px' }}>Join us for an unforgettable journey into the wild heart of Africa.</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/tours" className="btn-modern-primary">
              <span className="btn-text">Browse Adventures</span>
              <span className="btn-icon"><ArrowRight size={20} /></span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
