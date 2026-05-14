import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Users, MapPin, CheckCircle, Utensils, 
  Presentation, Wifi, Coffee, Zap, ArrowLeft,
  Monitor, ShieldCheck, Globe, Star, Shield, Trophy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import SEO from '../components/SEO';
import Toast from '../components/Toast';
import '../styles/EventTheme.css';

const CorporateRetreats = () => {
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [budgetItems, setBudgetItems] = useState({
    venue: { selected: false, name: 'Premium Conference Hall', price: 600 },
    catering: { selected: false, name: 'Full Board Catering', price: 400 },
    teambuilding: { selected: false, name: 'Professional Facilitators', price: 300 },
    transport: { selected: false, name: 'Executive Shuttle', price: 200 },
    tech: { selected: false, name: 'AV & Hybrid Meeting Setup', price: 250 },
    branding: { selected: false, name: 'Event Branding & Kits', price: 150 }
  });

  const [totalBudget, setTotalBudget] = useState(0);

  useEffect(() => {
    const total = Object.values(budgetItems).reduce((acc, item) => {
      return item.selected ? acc + item.price : acc;
    }, 0);
    setTotalBudget(total);
  }, [budgetItems]);

  const toggleItem = (key) => {
    setBudgetItems(prev => ({
      ...prev,
      [key]: { ...prev[key], selected: !prev[key].selected }
    }));
  };

  const applyPackage = (pkg) => {
    const newItems = { ...budgetItems };
    Object.keys(newItems).forEach(k => newItems[k].selected = false);
    
    if (pkg === 'standard') {
      newItems.venue.selected = true;
      newItems.catering.selected = true;
      newItems.tech.selected = true;
    } else if (pkg === 'executive') {
      Object.keys(newItems).forEach(k => newItems[k].selected = true);
    }
    setBudgetItems(newItems);
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartPlanning = () => {
    const selectedServices = Object.entries(budgetItems)
      .filter(([_, item]) => item.selected)
      .map(([_, item]) => item.name);
    
    if (selectedServices.length === 0) {
      setToastMessage("Please select at least one package or service to start planning.");
      setShowToast(true);
      document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    
    localStorage.setItem('pendingEventPlan', JSON.stringify({
      theme: 'Corporate Retreat',
      services: selectedServices,
      estimatedBudget: totalBudget,
      date: new Date().toISOString()
    }));
    
    navigate('/dashboard?tab=event-planning');
  };

  return (
    <div className="theme-detail-page">
      <SEO title="Corporate Retreats - Tujibambe Events" />
      
      <div className="theme-hero corporate">
        <div className="container">
          <button className="back-link" onClick={() => navigate('/event-planner')}>
            <ArrowLeft size={20} /> Back to Event Planner
          </button>
          <h1>Corporate <span className="text-primary">Excellence</span></h1>
          <p>Elevate your team's synergy with our high-impact wilderness retreats and professional conference management.</p>
        </div>
      </div>

      <section className="theme-info-grid">
        <div className="container">
          <div className="info-row">
            <div className="info-text">
              <span>Professional Synergy</span>
              <h2>Why Choose Our <span className="text-primary">Corporate Retreats?</span></h2>
              <p>We believe that the best ideas are born outside the boardroom. Our retreats are designed to break barriers, foster innovation, and build lasting professional relationships in environments that inspire.</p>
              <ul className="feature-list-modern">
                <li><Shield size={20} /> <strong>End-to-End Management</strong>: We handle all logistics, from transport to technical setups.</li>
                <li><Trophy size={20} /> <strong>Performance Focused</strong>: Curated activities designed to meet your specific business objectives.</li>
                <li><Globe size={20} /> <strong>Exclusive Locations</strong>: Access to Kenya's most prestigious and remote safari lodges.</li>
              </ul>
            </div>
            <div className="info-visual">
              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80" alt="Corporate Meeting" />
            </div>
          </div>
        </div>
      </section>

      <section className="video-experience">
        <div className="video-container">
          <div className="video-overlay">
            <div className="container">
              <h2>Experience the <span className="text-primary">Transformation</span></h2>
              <p>Take a glimpse into our previous high-impact executive retreats.</p>
            </div>
          </div>
          <video autoPlay muted loop playsInline className="background-video">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-business-people-shaking-hands-in-a-meeting-room-31835-large.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section className="destinations-showcase">
        <div className="container">
          <div className="section-header-centered">
            <span>Premium Venues</span>
            <h2>Our Top Destinations</h2>
          </div>
          <div className="destinations-grid">
            <div className="destination-card">
              <img src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80" alt="Maasai Mara" />
              <div className="dest-info">
                <h3>Maasai Mara</h3>
                <p>Unrivaled wilderness for executive bonding and wildlife immersion.</p>
              </div>
            </div>
            <div className="destination-card">
              <img src="https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&q=80" alt="Mount Kenya" />
              <div className="dest-info">
                <h3>Mount Kenya</h3>
                <p>Cool montane environments perfect for strategic deep-dives.</p>
              </div>
            </div>
            <div className="destination-card">
              <img src="https://images.unsplash.com/photo-1537726235470-8504e3beef77?auto=format&fit=crop&q=80" alt="Naivasha" />
              <div className="dest-info">
                <h3>Lake Naivasha</h3>
                <p>Serene lakeside settings for team building and creative sessions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="packages" className="theme-packages">
        <div className="container">
          <div className="section-header-centered">
            <span>Ready-to-Go Solutions</span>
            <h2>Corporate Packages</h2>
          </div>
          
          <div className="theme-packages-grid">
            <div className="theme-pkg-card elite-glass">
              <div className="pkg-icon"><Presentation size={32} /></div>
              <h3>Strategic Session</h3>
              <p>Perfect for one-day strategy meetings and board sessions.</p>
              <div className="pkg-price">{formatPrice(1200)} <small>base price</small></div>
              <ul className="pkg-features">
                <li><CheckCircle size={16} /> Premium Venue</li>
                <li><CheckCircle size={16} /> AV Equipment</li>
                <li><CheckCircle size={16} /> Gourmet Lunch</li>
              </ul>
              <button className="btn-theme-outline" onClick={() => applyPackage('standard')}>Customize This</button>
            </div>

            <div className="theme-pkg-card elite-glass featured">
              <div className="featured-tag">ALL-INCLUSIVE</div>
              <div className="pkg-icon"><Zap size={32} /></div>
              <h3>Executive Retreat</h3>
              <p>Our flagship 3-day immersive experience in the Kenyan wild.</p>
              <div className="pkg-price">{formatPrice(3500)} <small>base price</small></div>
              <ul className="pkg-features">
                <li><CheckCircle size={16} /> Luxury Bush Lodging</li>
                <li><CheckCircle size={16} /> Team Building Facilitators</li>
                <li><CheckCircle size={16} /> VIP Safari Transport</li>
                <li><CheckCircle size={16} /> Gala Dinner Event</li>
              </ul>
              <button className="btn-theme-primary" onClick={() => applyPackage('executive')}>Customize This</button>
            </div>
          </div>
        </div>
      </section>

      <section id="calculator" className="theme-calculator">
        <div className="container">
          <div className="calculator-wrapper elite-glass">
            <div className="calc-header">
              <h2>Budget <span className="text-primary">Estimator</span></h2>
              <p>Select the elements you need for your custom corporate retreat.</p>
            </div>

            <div className="calc-items-grid">
              {Object.entries(budgetItems).map(([key, item]) => (
                <div 
                  key={key} 
                  className={`calc-tile ${item.selected ? 'active' : ''}`}
                  onClick={() => toggleItem(key)}
                >
                  <div className="tile-icon">
                    {key === 'venue' && <MapPin size={24} />}
                    {key === 'catering' && <Utensils size={24} />}
                    {key === 'teambuilding' && <Users size={24} />}
                    {key === 'transport' && <Briefcase size={24} />}
                    {key === 'tech' && <Monitor size={24} />}
                    {key === 'branding' && <ShieldCheck size={24} />}
                  </div>
                  <div className="tile-info">
                    <h4>{item.name}</h4>
                    <span>{formatPrice(item.price)}</span>
                  </div>
                  <div className="checkbox-indicator">
                    {item.selected && <CheckCircle size={20} />}
                  </div>
                </div>
              ))}
            </div>

            <div className="calc-summary">
              <div className="total-box">
                <label>Estimated Investment</label>
                <div className="total-val">{formatPrice(totalBudget)}</div>
              </div>
              <button className="btn-start-planning" onClick={handleStartPlanning}>
                Start Planning <ArrowLeft size={20} style={{ transform: 'rotate(180deg)' }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {showToast && (
        <Toast 
          message={toastMessage} 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
};

export default CorporateRetreats;
