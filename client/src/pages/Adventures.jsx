import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mountain, 
  Wind, 
  Compass, 
  Map, 
  Zap, 
  ArrowRight, 
  ChevronRight,
  Globe,
  Camera,
  Play
} from 'lucide-react';
import SEO from '../components/SEO';
import InquiryModal from '../components/InquiryModal';
import '../styles/Adventures.css';

const Adventures = () => {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const adventureCategories = [
    {
      title: "Mountain Expeditions",
      description: "Conquer the highest peaks and witness breathtaking alpine views.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      link: "/tours",
      color: "var(--primary)"
    },
    {
      title: "Wildlife Safaris",
      description: "Get up close with Africa's Big Five in their natural habitat.",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      link: "/tours",
      color: "var(--primary)"
    },
    {
      title: "Coastal Getaways",
      description: "Relax on pristine white sands and dive into turquoise waters.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      link: "/tours",
      color: "var(--primary)"
    },
    {
      title: "Cultural Immersions",
      description: "Experience the rich traditions and vibrant heritage of Kenya.",
      image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      link: "/tours",
      color: "var(--primary)"
    },
    {
      title: "Adrenaline Sports",
      description: "From bungee jumping to white-water rafting, feel the thrill.",
      image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      link: "/tours",
      color: "var(--primary)"
    },
    {
      title: "Photography Tours",
      description: "Capture the perfect shot with expert guides and stunning backdrops.",
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      link: "/tours",
      color: "var(--primary)"
    }
  ];

  return (
    <div className="adventures-page">
      <SEO 
        title="Epic Adventures - Tujibambe"
        description="Discover thrilling adventures across Kenya. From mountain climbing to coastal escapes."
      />

      {/* Hero Section */}
      <section className="adv-hero">
        <div className="adv-hero-bg">
          <div className="adv-hero-overlay"></div>
          <video autoPlay muted loop playsInline className="adv-hero-video">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-mountain-landscape-at-sunset-41716-large.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="adv-hero-content">
          <span className="adv-tag">PUSH YOUR LIMITS</span>
          <h1 className="adv-title">Epic <span className="text-primary">Adventures</span></h1>
          <p className="adv-description">
            Life is either a daring adventure or nothing at all. 
            Choose your next thrill and create memories that last a lifetime.
          </p>
          <div className="adv-hero-btns">
            <a href="#explore" className="btn-modern-primary">
              Explore Now <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section id="explore" className="adv-categories">
        <div className="container">
          <div className="section-header-modern">
            <span>Choose Your Vibe</span>
            <h2>Adventure Categories</h2>
            <p>Tailored experiences for every type of explorer.</p>
          </div>

          <div className="adv-grid">
            {adventureCategories.map((cat, index) => (
              <div key={index} className="adv-card" style={{"--accent": cat.color}}>
                <div className="adv-card-img" style={{backgroundImage: `url(${cat.image})`}}>
                  <div className="adv-card-overlay"></div>
                </div>
                <div className="adv-card-content">
                  <h3>{cat.title}</h3>
                  <p>{cat.description}</p>
                  <Link to={cat.link} className="adv-card-link">
                    Explore <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Experience */}
      <section className="adv-featured">
        <div className="container">
          <div className="featured-banner">
            <div className="featured-content">
              <span className="featured-tag">FEATURED EXPERIENCE</span>
              <h2>Lake Victoria Expedition</h2>
              <p>Ultimate adventure from Nairobi to Kisumu. Enjoy free chicken, fish, and goat meat with unlimited drinks. 3 days of pure bliss!</p>
              <Link to="/tours/lake-victoria-expedition" className="btn-glass">
                Learn More <Play size={18} fill="currentColor" />
              </Link>
            </div>
            <div className="featured-visual">
              <img src="https://journeysbydesign.com/wp-content/uploads/2016/12/Lake-Victoria-Dhow.jpg" alt="Lake Victoria" />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="adv-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Ready for your next journey?</h2>
            <p>Contact our experts to plan your customized adventure today.</p>
            <button 
              onClick={() => setIsInquiryOpen(true)} 
              className="btn-modern-primary"
            >
              Start Planning <Compass size={20} />
            </button>
          </div>
        </div>
      </section>

      <InquiryModal 
        isOpen={isInquiryOpen} 
        onClose={() => setIsInquiryOpen(false)} 
        defaultSubject="Adventure Planning Inquiry"
      />
    </div>
  );
};

export default Adventures;
