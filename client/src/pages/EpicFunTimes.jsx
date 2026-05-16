import React, { useState } from 'react';
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
  Phone,
  Ticket
} from 'lucide-react';
import SEO from '../components/SEO';
import { useCurrency } from '../context/CurrencyContext';
import InquiryModal from '../components/InquiryModal';
import '../styles/EpicFunTimes_New.css';

// High quality Unsplash images for the redesign
const peponi1 = 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80';
const peponi2 = 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80';
const peponi3 = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80';
const peponi4 = 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80';
const peponi5 = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80';
const peponi6 = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80';
const peponi7 = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80';
const peponi8 = 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80';

const EpicFunTimes = () => {
  const { formatPrice } = useCurrency();
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquirySubject, setInquirySubject] = useState('');

  const openInquiry = (subject) => {
    setInquirySubject(subject);
    setIsInquiryOpen(true);
  };

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
      <section className="fun-hero-v4">
        <div className="fun-hero-visual">
          <img src="https://nax.today/storage/uploads/2025/07/nightlife-1752224415.jpg" alt="Epic Parties" className="fun-hero-img" />
          <div className="fun-hero-overlay-v4"></div>
        </div>
        <div className="container">
          <div className="fun-hero-content-v4 fade-in">
            <div className="glass-badge">
              <Sparkles size={16} />
              <span>THE ULTIMATE PARTY DESTINATION</span>
            </div>
            <h1 className="hero-title-v4">Epic <span className="highlight-text">Fun Times</span></h1>
            <p className="hero-lead-v4">
              Step into a world of vibrant energy, world-class music, and unforgettable connections. 
              We curate Kenya's most exclusive social experiences just for you.
            </p>
            <div className="hero-actions-v4">
              <Link to="/book-ticket/pool-party" className="btn-v4-primary">
                Get Your Tickets <Zap size={20} />
              </Link>
              <a href="#featured" className="btn-v4-outline">
                Explore Events <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Features bar */}
      <div className="fun-stats-bar">
        <div className="container">
          <div className="stats-grid-v4">
            <div className="stat-item-v4">
              <Users size={24} />
              <div>
                <strong>5k+</strong>
                <span>Happy Party Goers</span>
              </div>
            </div>
            <div className="stat-item-v4">
              <Star size={24} />
              <div>
                <strong>4.9/5</strong>
                <span>Event Rating</span>
              </div>
            </div>
            <div className="stat-item-v4">
              <Shield size={24} />
              <div>
                <strong>100%</strong>
                <span>Secure Venues</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Pool Party */}
      <section id="featured" className="featured-section-v4">
        <div className="container">
          <div className="section-header-v4">
            <div className="header-label">Don't Miss Out</div>
            <h2>Upcoming <span className="text-primary">Masterpiece</span></h2>
          </div>

          <div className="party-card-v4">
            <div className="card-visual-v4">
              <img src={peponi1} alt="Pool Party" />
              <div className="floating-date-v4">
                <span className="month">APR</span>
                <span className="day">10</span>
              </div>
              <div className="visual-badge">SELLING FAST</div>
            </div>
            
            <div className="card-content-v4">
              <div className="content-top-v4">
                <span className="category-tag">PREMIUM POOL PARTY</span>
                <h3>Tropical Pool Party @ Peponi</h3>
                <p>
                  Escape to paradise at the Peponi View Villa. A curated 24-hour experience 
                  featuring Kenya's top DJs, premium mixology, and an elite crowd.
                </p>
              </div>

              <div className="quick-info-v4">
                <div className="info-pill-v4">
                  <MapPin size={16} />
                  <span>Kikuyu, Kenya</span>
                </div>
                <div className="info-pill-v4">
                  <Clock size={16} />
                  <span>24 Hours Experience</span>
                </div>
                <div className="info-pill-v4">
                  <Users size={16} />
                  <span>Limited Entry</span>
                </div>
              </div>

              <div className="pricing-v4">
                <div className="price-box">
                  <span className="label">Entry Fee</span>
                  <span className="value">{formatPrice(4)}</span>
                </div>
                <Link to="/book-ticket/pool-party" className="btn-v4-action">
                  Reserve My Spot <Ticket size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Venue Experience */}
      <section className="venue-experience-v4">
        <div className="container">
          <div className="experience-layout-v4">
            <div className="experience-text-v4">
              <div className="header-label">The Destination</div>
              <h2>Peponi View Villa <span className="text-primary">Experience</span></h2>
              <p>
                Perched on the scenic hills of Kikuyu, Peponi View Villa offers a 
                sophisticated blend of modern architecture and natural beauty. 
                Our infinity pool serves as the centerpiece for the most epic 
                sunsets and sunrise parties in the region.
              </p>
              <ul className="feature-list-v4">
                <li><Sparkles size={18} /> Infinity Pool with Scenic Views</li>
                <li><Music size={18} /> Professional Sound & Lighting</li>
                <li><Utensils size={18} /> Gourmet Catering & Mixology</li>
                <li><Shield size={18} /> High-Level Security & Valet</li>
              </ul>
              <button onClick={() => openInquiry('Venue Hire Inquiry')} className="btn-v4-outline">
                Inquire for Private Events
              </button>
            </div>
            
            <div className="experience-gallery-v4">
              <div className="gallery-main-v4">
                <img src={peponi2} alt="Villa Pool" />
              </div>
              <div className="gallery-thumbs-v4">
                <img src={peponi3} alt="Villa" />
                <img src={peponi4} alt="Villa Lounge" />
                <img src={peponi5} alt="Villa Aerial" />
                <img src={peponi8} alt="Pool Side" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parties Grid */}
      <section className="more-vibes-v4">
        <div className="container">
          <div className="section-header-centered-v4">
            <div className="header-label">More Adventures</div>
            <h2>Upcoming <span className="text-primary">Gatherings</span></h2>
          </div>

          <div className="parties-grid-v4">
            {otherParties.map((party, index) => (
              <div key={index} className="vibe-card-v4">
                <div className="vibe-img-wrapper">
                  <img src={party.image} alt={party.title} />
                  <div className="vibe-price">{formatPrice(party.price)}</div>
                </div>
                <div className="vibe-body">
                  <div className="vibe-icon-box" style={{background: party.color}}>
                    {party.icon}
                  </div>
                  <h3>{party.title}</h3>
                  <div className="vibe-meta">
                    <span><Calendar size={14} /> {party.date}</span>
                    <span><MapPin size={14} /> {party.location}</span>
                  </div>
                  <button 
                    onClick={() => openInquiry(`Event Inquiry: ${party.title}`)}
                    className="vibe-btn"
                  >
                    Join the Vibe <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Section */}
      <section className="fun-vip-v4">
        <div className="container">
          <div className="vip-card-v4">
            <div className="vip-inner">
              <div className="vip-text">
                <div className="vip-badge">VIP EXPERIENCE</div>
                <h2>Luxury <span className="gold-text">Table Service</span></h2>
                <p>
                  Elevate your night with our premium VIP packages. Enjoy priority 
                  entry, dedicated service, and the best vantage point of the party.
                </p>
                <div className="vip-perks-v4">
                  <div className="perk-v4"><Shield size={16} /> <span>Private Security</span></div>
                  <div className="perk-v4"><Star size={16} /> <span>Premium Bottles</span></div>
                  <div className="perk-v4"><Users size={16} /> <span>Dedicated Host</span></div>
                </div>
                <button onClick={() => openInquiry('VIP Table Booking')} className="vip-btn-v4">
                  Book Your Table <Phone size={20} />
                </button>
              </div>
              <div className="vip-visual-v4">
                <img src="https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="VIP" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <InquiryModal 
        isOpen={isInquiryOpen} 
        onClose={() => setIsInquiryOpen(false)} 
        defaultSubject={inquirySubject}
      />
    </div>
  );
};

export default EpicFunTimes;
