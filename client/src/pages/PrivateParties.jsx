import React, { useState, useEffect } from 'react';
import { 
  PartyPopper, MapPin, CheckCircle, Utensils, 
  Music, GlassWater, Users, ArrowLeft, Zap, Star,
  ShieldCheck, Sparkles, Coffee, Mic
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import SEO from '../components/SEO';
import Toast from '../components/Toast';
import '../styles/EventTheme.css';

const PrivateParties = () => {
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [budgetItems, setBudgetItems] = useState({
    venue: { selected: false, name: 'Private Villa / Penthouse', price: 400 },
    catering: { selected: false, name: 'Exclusive Catering & Bites', price: 250 },
    mixology: { selected: false, name: 'Professional Mixologists', price: 200 },
    entertainment: { selected: false, name: 'Top DJ / Live Artist', price: 300 },
    security: { selected: false, name: 'Private Bouncer Service', price: 150 },
    tech: { selected: false, name: 'Lighting & Sound Rig', price: 200 }
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
    
    if (pkg === 'party') {
      newItems.venue.selected = true;
      newItems.entertainment.selected = true;
      newItems.mixology.selected = true;
    } else if (pkg === 'vip') {
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
      theme: 'Private Party',
      services: selectedServices,
      estimatedBudget: totalBudget,
      date: new Date().toISOString()
    }));
    
    navigate('/dashboard?tab=event-planning');
  };

  return (
    <div className="theme-detail-page">
      <SEO title="Private Parties - Tujibambe Events" />
      
      <div className="theme-hero party">
        <div className="container">
          <button className="back-link" onClick={() => navigate('/event-planner')}>
            <ArrowLeft size={20} /> Back to Event Planner
          </button>
          <h1>Elite <span className="text-accent">Celebrations</span></h1>
          <p>From exclusive birthday bashes to high-end social gatherings. We bring the party to you.</p>
        </div>
      </div>

      <section className="theme-info-grid">
        <div className="container">
          <div className="info-row">
            <div className="info-text">
              <span className="text-accent">Unmatched Vibe</span>
              <h2>The Ultimate Party <span className="text-accent">Experience</span></h2>
              <p>Whether it's a milestone birthday, an engagement party, or just a reason to celebrate, we create environments that are as vibrant as your vision. Our team handles everything from curation to teardown.</p>
              <ul className="feature-list-modern party">
                <li><Mic size={20} /> <strong>Elite Entertainment</strong>: Access to top DJs, live bands, and performers in Kenya.</li>
                <li><GlassWater size={20} /> <strong>Signature Mixology</strong>: Custom cocktail menus designed by award-winning bartenders.</li>
                <li><ShieldCheck size={20} /> <strong>Total Privacy</strong>: Secure, exclusive venues with professional guest management.</li>
              </ul>
            </div>
            <div className="info-visual">
              <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80" alt="Private Party Vibe" />
            </div>
          </div>
        </div>
      </section>

      <section className="video-experience">
        <div className="video-container">
          <div className="video-overlay">
            <div className="container">
              <h2>Celebrate with <span className="text-accent">Style</span></h2>
              <p>See how we turn ordinary nights into extraordinary memories.</p>
            </div>
          </div>
          <video autoPlay muted loop playsInline className="background-video">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-party-people-dancing-under-the-lights-of-a-club-4638-large.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section className="destinations-showcase">
        <div className="container">
          <div className="section-header-centered">
            <span>Exclusive Venues</span>
            <h2>Signature Party Spaces</h2>
          </div>
          <div className="destinations-grid">
            <div className="destination-card">
              <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80" alt="Luxury Villa" />
              <div className="dest-info party">
                <h3>Luxury Villas</h3>
                <p>Private estates in Karen or Muthaiga for a sophisticated bash.</p>
              </div>
            </div>
            <div className="destination-card">
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80" alt="Rooftop" />
              <div className="dest-info party">
                <h3>Skyline Rooftops</h3>
                <p>Breathtaking city views with high-end sound and light rigs.</p>
              </div>
            </div>
            <div className="destination-card">
              <img src="https://images.unsplash.com/photo-1548430103-f245b3d244f0?auto=format&fit=crop&q=80" alt="Bush Camp" />
              <div className="dest-info party">
                <h3>Chic Bush Camps</h3>
                <p>Rustic elegance for a themed wilderness party like no other.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="packages" className="theme-packages">
        <div className="container">
          <div className="section-header-centered">
            <span>Choose Your Vibe</span>
            <h2>Party Collections</h2>
          </div>
          
          <div className="theme-packages-grid">
            <div className="theme-pkg-card elite-glass">
              <div className="pkg-icon"><PartyPopper size={32} /></div>
              <h3>Night Owls Special</h3>
              <p>Everything you need for a high-energy house or villa party.</p>
              <div className="pkg-price">{formatPrice(1200)} <small>base price</small></div>
              <ul className="pkg-features">
                <li><CheckCircle size={16} /> Venue Management</li>
                <li><CheckCircle size={16} /> Top-Tier DJ & Sound</li>
                <li><CheckCircle size={16} /> Open Bar (4 Hours)</li>
              </ul>
              <button className="btn-theme-outline" onClick={() => applyPackage('party')}>Customize This</button>
            </div>

            <div className="theme-pkg-card elite-glass featured">
              <div className="featured-tag">VIP EXPERIENCE</div>
              <div className="pkg-icon"><Star size={32} /></div>
              <h3>Luxury Penthouse Gala</h3>
              <p>The ultimate private event with full white-glove service and guest management.</p>
              <div className="pkg-price">{formatPrice(3200)} <small>base price</small></div>
              <ul className="pkg-features">
                <li><CheckCircle size={16} /> Elite Penthouse Access</li>
                <li><CheckCircle size={16} /> Full Multi-Course Catering</li>
                <li><CheckCircle size={16} /> Premium Mixology Team</li>
                <li><CheckCircle size={16} /> VIP Chauffeur Service</li>
              </ul>
              <button className="btn-theme-primary" onClick={() => applyPackage('vip')}>Customize This</button>
            </div>
          </div>
        </div>
      </section>

      <section id="calculator" className="theme-calculator">
        <div className="container">
          <div className="calculator-wrapper elite-glass">
            <div className="calc-header">
              <h2>Party <span className="text-accent">Estimator</span></h2>
              <p>Build your perfect celebration by selecting the right services.</p>
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
                    {key === 'mixology' && <GlassWater size={24} />}
                    {key === 'entertainment' && <Music size={24} />}
                    {key === 'security' && <Users size={24} />}
                    {key === 'tech' && <Zap size={24} />}
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
                <label>Estimated Cost</label>
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

export default PrivateParties;
