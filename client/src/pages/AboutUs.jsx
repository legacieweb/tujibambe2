import React from 'react';
import SEO from '../components/SEO';
import { 
  Award, 
  Users, 
  Heart, 
  ChevronRight, 
  Sparkles, 
  Compass, 
  ArrowRight,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-page">
      <SEO 
        title="Our Story - Tujibambe Adventures"
        description="Discover the heart and soul of Tujibambe Adventures. Learn about our mission to redefine African travel through authenticity, passion, and excellence."
        keywords="Tujibambe story, about us, Kenya travel experts, safari mission, sustainable tourism Africa"
        canonical="https://tujibambe.iyonicorp.com/about"
      />

      {/* Modern Hero Section */}
      <section className="about-hero">
        <div className="about-hero-glow"></div>
        <div className="container">
          <span className="elite-subtitle">OUR LEGACY</span>
          <h1 className="elite-title">
            Redefining the <br /><span className="text-primary">African Spirit</span>
          </h1>
          <p className="elite-description">
            We don't just organize trips; we craft life-altering experiences that connect you with the raw beauty and vibrant culture of Kenya.
          </p>
        </div>
      </section>

      {/* Interactive Story Section */}
      <section className="story-section">
        <div className="elite-container-grid">
          <div className="story-visual">
            <div className="story-img-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="African Landscape" 
              />
            </div>
            <div className="experience-badge">
              <h3>15+</h3>
              <p>Years of Unforgettable Memories</p>
            </div>
          </div>
          
          <div className="story-content">
            <span className="elite-subtitle">THE GENESIS</span>
            <h2 className="elite-title">Where Passion <br />Meets <span className="text-primary">Purpose</span></h2>
            <p className="elite-description">
              Tujibambe Adventures was born out of a deep-seated love for the Kenyan wilderness. What started as a small group of passionate guides has evolved into a premier adventure hub, dedicated to showcasing the authentic side of Africa.
            </p>
            
            <div className="mission-vision">
              <div className="mv-item">
                <Target size={32} className="mv-icon" />
                <h4>Our Mission</h4>
                <p>Sustainable travel that empowers local communities.</p>
              </div>
              <div className="mv-item">
                <Sparkles size={32} className="mv-icon" />
                <h4>Our Vision</h4>
                <p>Setting the global standard for ethical African safaris.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Elegant Cards */}
      <section className="values-section">
        <div className="container">
          <div className="section-header-modern">
            <span className="elite-subtitle">OUR FOUNDATION</span>
            <h2 className="elite-title">Values That <span className="text-primary">Drive Us</span></h2>
          </div>
          
          <div className="values-grid">
            {[
              { 
                title: "Excellence", 
                desc: "We obsess over every detail, from the comfort of our vehicles to the expertise of our guides.", 
                icon: <Award size={40} />
              },
              { 
                title: "Authenticity", 
                desc: "No filters, no scripts. Just raw, real experiences that reflect the true heart of Kenya.", 
                icon: <Compass size={40} />
              },
              { 
                title: "Impact", 
                desc: "A portion of every booking goes directly to wildlife conservation and local education.", 
                icon: <Heart size={40} />
              }
            ].map((value, i) => (
              <div key={i} className="value-card">
                <div className="value-icon-box">
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section - Artistic Layout */}
      <section className="team-section">
        <div className="container">
          <div className="section-header-modern">
            <span className="elite-subtitle">THE ARCHITECTS</span>
            <h2 className="elite-title">The People Behind <br />The <span className="text-primary">Magic</span></h2>
          </div>
          
          <div className="team-grid">
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
              <div key={i} className="team-card">
                <img src={leader.img} alt={leader.name} />
                <div className="team-info">
                  <span className="team-role">{leader.role}</span>
                  <h3>{leader.name}</h3>
                  <p>{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Sophisticated */}
      <section className="about-cta">
        <div className="container">
          <h2 className="elite-title">Your Adventure <br /><span className="text-primary">Awaits</span></h2>
          <p className="elite-description">Ready to write your own African story with Tujibambe?</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
            <Link to="/tours" className="btn-modern-primary">
              <span className="btn-text">Explore Safaris</span>
              <ArrowRight size={20} />
            </Link>
            <Link to="/contact" className="btn-modern-secondary-prominent" style={{ padding: '18px 40px', fontSize: '1rem' }}>
              <span>Let's Talk</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
