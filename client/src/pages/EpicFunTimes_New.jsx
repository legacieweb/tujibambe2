import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Music, 
  Utensils, 
  Palmtree, 
  Users, 
  Calendar, 
  Clock, 
  MapPin, 
  Sparkles,
  Play,
  ArrowRight,
  Zap,
  Star,
  Award,
  Shield,
  Phone
} from 'lucide-react';
import SEO from '../components/SEO';
import { useCurrency } from '../context/CurrencyContext';
import '../styles/EpicFunTimes_New.css';

// Import Peponi images
import peponi1 from '../assets/peponi 1.PNG';
import peponi2 from '../assets/peponi 2.PNG';
import peponi3 from '../assets/peponi 3.PNG';
import peponi4 from '../assets/peponi 4.PNG';
import peponi5 from '../assets/peponi 5.PNG';
import peponi6 from '../assets/peponi 6.PNG';
import peponi7 from '../assets/peponi 7.PNG';
import peponi8 from '../assets/peponi 8.PNG';

const EpicFunTimes = () => {
  const { formatPrice } = useCurrency();

  const otherParties = [
    {
      title: "Beach Bonfire Night",
      date: "Every Friday",
      location: "Diani Beach",
      price: 1500,
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: <Palmtree size={24} />,
      color: "#3498db"
    },
    {
      title: "Rooftop Sundowner",
      date: "Daily from 5 PM",
      location: "Nairobi CBD",
      price: 2000,
      image: "https://images.unsplash.com/photo-1514525253361-bee243870d2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: <Music size={24} />,
      color: "#9b59b6"
    },
    {
      title: "Bush Dinner Experience",
      date: "Upon Request",
      location: "Maasai Mara",
      price: 4500,
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: <Utensils size={24} />,
      color: "#e67e22"
    }
  ];

  return (
    <div className="fun-times-page">
      <SEO 
        title="Epic Fun Times - Tujibambe"
        description="Experience the most vibrant parties and social events in Kenya. Join our featured pool party!"
      />

      {/* Hero Section */}
      <section className="fun-hero">
        <div className="fun-hero-bg">
          <div className="fun-hero-overlay"></div>
          <img src="https://nax.today/storage/uploads/2025/07/nightlife-1752224415.jpg" alt="Epic Parties" className="fun-hero-img" />
        </div>
        <div className="fun-hero-content">
          <div className="fun-badge">
            <Sparkles size={16} />
            <span>UNFORGETTABLE VIBES</span>
          </div>
          <h1 className="fun-title">Epic <span className="text-gradient">Fun Times</span></h1>
          <p className="fun-description">
            Where music, culture, and community collide. Discover the most 
            talked-about events and parties across Kenya.
          </p>
          <div className="fun-scroll">
            <div className="mouse"></div>
            <span>Scroll to Discover</span>
          </div>
        </div>
      </section>

      {/* Featured Pool Party */}
      <section className="featured-party">
        <div className="container">
          <div className="party-ultra-card">
            <div className="party-visual">
              <img src={peponi1} alt="Pool Party" />
              <div className="party-timer">
                <div className="timer-item">
                  <span className="timer-val">APR</span>
                  <span className="timer-unit">MONTH</span>
                </div>
                <div className="timer-item">
                  <span className="timer-val">10</span>
                  <span className="timer-unit">DAY</span>
                </div>
              </div>
            </div>
            <div className="party-info">
              <div className="party-header">
                <span className="party-status">FEATURED EVENT</span>
                <h2>Tropical Pool Party</h2>
                <p>The ultimate summer splash is here! Join us for 24 hours of non-stop music, drinks, and good vibes.</p>
              </div>

              <div className="party-details">
                <div className="detail-row">
                  <Calendar className="text-primary" />
                  <div>
                    <h4>Date & Time</h4>
                    <p>10th - 11th April 2026 | Starts 10:00 AM Ends 10:00 Am</p>
                  </div>
                </div>
                <div className="detail-row">
                  <MapPin className="text-primary" />
                  <div>
                    <h4>Location</h4>
                    <p>Peponi View Villa, Kikuyu</p>
                  </div>
                </div>
                <div className="detail-row">
                  <Award className="text-primary" />
                  <div>
                    <h4>Charges</h4>
                    <p className="price-tag">{formatPrice(4)} <span className="per-person">/ person</span></p>
                  </div>
                </div>
              </div>

              <div className="party-btns">
                <Link to="/book-ticket/pool-party" className="btn-modern-primary">
                  Purchase Tickets <Zap size={20} />
                </Link>
                <a href="#villa-gallery" className="btn-modern-secondary-prominent">
                  View Full Gallery <Play size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Villa Showcase Gallery */}
      <section id="villa-gallery" className="villa-showcase">
        <div className="container">
          <div className="section-header-centered">
            <span>Exclusive Venue</span>
            <h2>Peponi View Villa</h2>
            <p className="section-subtitle">A stunning modern oasis in the heart of Kikuyu, designed for the ultimate pool party experience.</p>
          </div>
          
          <div className="villa-gallery-grid">
            <div className="gallery-item large">
              <img src={peponi2} alt="Villa Pool" />
              <div className="gallery-overlay">
                <h4>Main Infinity Pool</h4>
              </div>
            </div>
            <div className="gallery-item">
              <img src={peponi3} alt="Villa Exterior" />
              <div className="gallery-overlay">
                <h4>Modern Architecture</h4>
              </div>
            </div>
            <div className="gallery-item">
              <img src={peponi4} alt="Villa Lounge" />
              <div className="gallery-overlay">
                <h4>Luxury Lounges</h4>
              </div>
            </div>
            <div className="gallery-item wide">
              <img src={peponi5} alt="Villa Aerial" />
              <div className="gallery-overlay">
                <h4>Spacious Environment</h4>
              </div>
            </div>
            <div className="gallery-item">
              <img src={peponi6} alt="Villa View" />
              <div className="gallery-overlay">
                <h4>Garden Views</h4>
              </div>
            </div>
            <div className="gallery-item">
              <img src={peponi7} alt="Villa Interior" />
              <div className="gallery-overlay">
                <h4>Premium Suites</h4>
              </div>
            </div>
            <div className="gallery-item large">
              <img src={peponi8} alt="Pool Side" />
              <div className="gallery-overlay">
                <h4>Poolside Deck</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Parties */}
      <section className="other-parties">
        <div className="container">
          <div className="section-header-centered">
            <span>Keep the energy high</span>
            <h2>More Epic Parties</h2>
          </div>

          <div className="parties-grid">
            {otherParties.map((party, index) => (
              <div key={index} className="party-mini-card">
                <div className="mini-card-img" style={{backgroundImage: `url(${party.image})`}}>
                  <div className="price-badge">{formatPrice(party.price)}</div>
                </div>
                <div className="mini-card-content">
                  <div className="mini-card-icon" style={{backgroundColor: party.color}}>{party.icon}</div>
                  <h3>{party.title}</h3>
                  <div className="mini-card-meta">
                    <span><Calendar size={14} /> {party.date}</span>
                    <span><MapPin size={14} /> {party.location}</span>
                  </div>
                  <Link to="/contact" className="btn-text-link">
                    Join Event <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Section */}
      <section className="fun-vip">
        <div className="container">
          <div className="vip-banner">
            <div className="vip-content">
              <h2>VIP Table Bookings</h2>
              <p>Elevate your experience with exclusive service, premium drinks, and the best views of the house.</p>
              <ul className="vip-perks">
                <li><Shield size={18} /> Private Security</li>
                <li><Star size={18} /> Premium Bottle Service</li>
                <li><Users size={18} /> Dedicated Host</li>
              </ul>
              <Link to="/contact" className="btn-modern-primary">
                Inquire for VIP <Phone size={20} />
              </Link>
            </div>
            <div className="vip-visual">
              <img src="https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="VIP Experience" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EpicFunTimes;
