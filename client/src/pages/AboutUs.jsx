import React from 'react';
import SEO from '../components/SEO';
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
    <div className="about-page home" style={{ paddingTop: '100px', background: '#050505' }}>
      <SEO 
        title="Our Story - Tujibambe Adventures"
        description="Discover the heart and soul of Tujibambe Adventures. Learn about our mission to redefine African travel through authenticity, passion, and excellence."
        keywords="Tujibambe story, about us, Kenya travel experts, safari mission, sustainable tourism Africa"
        canonical="https://tujibambe.iyonicorp.com/about"
      />

      {/* Modern Hero Section */}
      <section className="about-hero" style={{ 
        padding: '120px 0 80px', 
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(39, 174, 96, 0.03) 0%, transparent 70%)',
          zIndex: 0
        }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="elite-subtitle" style={{ letterSpacing: '6px' }}>OUR LEGACY</span>
          <h1 className="elite-title" style={{ fontSize: '5rem', lineHeight: '1', marginBottom: '30px' }}>
            Redefining the <br /><span className="text-gradient">African Spirit</span>
          </h1>
          <p className="elite-description" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem', color: '#888' }}>
            We don't just organize trips; we craft life-altering experiences that connect you with the raw beauty and vibrant culture of Kenya.
          </p>
        </div>
      </section>

      {/* Interactive Story Section */}
      <section className="story-section" style={{ padding: '100px 0' }}>
        <div className="elite-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'center' }}>
          <div className="story-visual" style={{ position: 'relative' }}>
            <div style={{ 
              width: '100%', 
              height: '600px', 
              borderRadius: '40px', 
              overflow: 'hidden',
              boxShadow: '0 50px 100px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="African Landscape" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{
              position: 'absolute',
              bottom: '-40px',
              right: '-40px',
              background: 'var(--primary)',
              padding: '40px',
              borderRadius: '30px',
              color: 'white',
              maxWidth: '280px',
              boxShadow: '0 30px 60px rgba(39, 174, 96, 0.3)'
            }}>
              <h3 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '5px' }}>15+</h3>
              <p style={{ fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Years of Unforgettable Memories</p>
            </div>
          </div>
          
          <div className="story-content">
            <span className="elite-subtitle">THE GENESIS</span>
            <h2 className="elite-title" style={{ fontSize: '3.5rem', marginBottom: '30px' }}>Where Passion <br />Meets <span className="text-gradient">Purpose</span></h2>
            <p className="elite-description" style={{ marginBottom: '25px', color: '#aaa' }}>
              Tujibambe Adventures was born out of a deep-seated love for the Kenyan wilderness. What started as a small group of passionate guides has evolved into a premier adventure hub, dedicated to showcasing the authentic side of Africa.
            </p>
            <p className="elite-description" style={{ marginBottom: '40px', color: '#aaa' }}>
              Our name "Tujibambe" is more than a brand; it's a call to action. It invites you to immerse yourself, to find joy in the journey, and to create stories that last a lifetime.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ color: 'var(--primary)' }}><Target size={32} /></div>
                <div>
                  <h4 style={{ color: 'white', marginBottom: '8px' }}>Our Mission</h4>
                  <p style={{ color: '#777', fontSize: '0.9rem' }}>Sustainable travel that empowers local communities.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ color: 'var(--primary)' }}><Sparkles size={32} /></div>
                <div>
                  <h4 style={{ color: 'white', marginBottom: '8px' }}>Our Vision</h4>
                  <p style={{ color: '#777', fontSize: '0.9rem' }}>Setting the global standard for ethical African safaris.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Elegant Cards */}
      <section style={{ padding: '120px 0', background: '#000' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span className="elite-subtitle">OUR FOUNDATION</span>
            <h2 className="elite-title">Values That <span className="text-gradient">Drive Us</span></h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            {[
              { 
                title: "Excellence", 
                desc: "We obsess over every detail, from the comfort of our vehicles to the expertise of our guides.", 
                icon: <Award size={40} />,
                color: "#e67e22"
              },
              { 
                title: "Authenticity", 
                desc: "No filters, no scripts. Just raw, real experiences that reflect the true heart of Kenya.", 
                icon: <Compass size={40} />,
                color: "#27ae60"
              },
              { 
                title: "Impact", 
                desc: "A portion of every booking goes directly to wildlife conservation and local education.", 
                icon: <Heart size={40} />,
                color: "#e74c3c"
              }
            ].map((value, i) => (
              <div key={i} style={{ 
                background: 'rgba(255,255,255,0.02)', 
                padding: '60px 40px', 
                borderRadius: '40px', 
                border: '1px solid rgba(255,255,255,0.05)',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }} className="value-card">
                <div style={{ 
                  width: '100px', 
                  height: '100px', 
                  background: `${value.color}10`, 
                  color: value.color,
                  borderRadius: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 30px'
                }}>
                  {value.icon}
                </div>
                <h3 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '20px' }}>{value.title}</h3>
                <p style={{ color: '#888', lineHeight: '1.7', fontSize: '1rem' }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section - Artistic Layout */}
      <section style={{ padding: '120px 0' }}>
        <div className="elite-container">
          <div style={{ marginBottom: '80px' }}>
            <span className="elite-subtitle">THE ARCHITECTS</span>
            <h2 className="elite-title">The People Behind <br />The <span className="text-gradient">Magic</span></h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            {[
              { 
                name: "David Maina", 
                role: "Founder & Visionary", 
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                bio: "20 years of trekking the most remote parts of Africa."
              },
              { 
                name: "Sarah Kemunto", 
                role: "Chief Experience Officer", 
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                bio: "Master of logistics and designer of bespoke journeys."
              },
              { 
                name: "John Otieno", 
                role: "Lead Safari Specialist", 
                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                bio: "Award-winning guide with an instinct for wildlife."
              }
            ].map((leader, i) => (
              <div key={i} style={{ position: 'relative', borderRadius: '40px', overflow: 'hidden', height: '550px' }} className="leader-card">
                <img src={leader.img} alt={leader.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ 
                  position: 'absolute', 
                  bottom: '0', 
                  left: '0', 
                  width: '100%', 
                  padding: '40px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)'
                }}>
                  <h3 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '5px' }}>{leader.name}</h3>
                  <p style={{ color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', marginBottom: '15px' }}>{leader.role}</p>
                  <p style={{ color: '#ccc', fontSize: '0.95rem' }}>{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Sophisticated */}
      <section style={{ padding: '150px 0', background: 'radial-gradient(circle at center, #111 0%, #000 100%)', textAlign: 'center' }}>
        <div className="container">
          <h2 className="elite-title" style={{ fontSize: '4rem', marginBottom: '30px' }}>Your Adventure <br /><span className="text-gradient">Awaits</span></h2>
          <p className="elite-description" style={{ marginBottom: '50px' }}>Ready to write your own African story with Tujibambe?</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <Link to="/tours" className="btn-modern-primary">
              <span className="btn-text">Explore Safaris</span>
              <span className="btn-icon"><ArrowRight size={20} /></span>
            </Link>
            <Link to="/contact" className="btn-modern-secondary">
              <span className="btn-text">Let's Talk</span>
              <span className="btn-icon"><ChevronRight size={20} /></span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
