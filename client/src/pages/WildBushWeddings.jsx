import React, { useState, useEffect } from 'react';
import { 
  Heart, MapPin, CheckCircle, Utensils, 
  Camera, Music, Users, ArrowLeft, Star, GlassWater,
  Sparkles, ShieldCheck, Sun, Moon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import SEO from '../components/SEO';
import Toast from '../components/Toast';
import '../styles/EventTheme.css';

const WildBushWeddings = () => {
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [budgetItems, setBudgetItems] = useState({
    venue: { selected: false, name: 'Exclusive Bush Venue', price: 1200 },
    catering: { selected: false, name: 'Traditional & Exotic Buffet', price: 800 },
    decor: { selected: false, name: 'Bespoke Wild Decor', price: 500 },
    media: { selected: false, name: 'Cinematic Photo & Video', price: 400 },
    entertainment: { selected: false, name: 'Live Band & DJ', price: 300 },
    transport: { selected: false, name: 'Luxury Guest Shuttle', price: 200 }
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
    
    if (pkg === 'classic') {
      newItems.venue.selected = true;
      newItems.catering.selected = true;
      newItems.decor.selected = true;
    } else if (pkg === 'ultimate') {
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
      theme: 'Wild Bush Wedding',
      services: selectedServices,
      estimatedBudget: totalBudget,
      date: new Date().toISOString()
    }));
    
    navigate('/dashboard?tab=event-planning');
  };

  return (
    <div className="theme-detail-page">
      <SEO title="Wild Bush Weddings - Tujibambe Events" />
      
      <div className="theme-hero wedding">
        <div className="container">
          <button className="back-link" onClick={() => navigate('/event-planner')}>
            <ArrowLeft size={20} /> Back to Event Planner
          </button>
          <h1>Wild <span className="text-secondary">Weddings</span></h1>
          <p>Tie the knot under the vast African sky. We create unforgettable, bespoke bush wedding experiences.</p>
        </div>
      </div>

      <section className="theme-info-grid">
        <div className="container">
          <div className="info-row reverse">
            <div className="info-visual">
              <img src="https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80" alt="Bush Wedding Ceremony" />
            </div>
            <div className="info-text">
              <span className="text-secondary">Eternal Wilderness</span>
              <h2>Your Dream Wedding in the <span className="text-secondary">Savannah</span></h2>
              <p>Imagine walking down an aisle of golden grass, with the sunset as your backdrop and the sounds of the wild as your choir. We specialize in bringing luxury to the most remote locations.</p>
              <ul className="feature-list-modern wedding">
                <li><Heart size={20} /> <strong>Bespoke Ceremony</strong>: Tailored to your cultural traditions and personal vision.</li>
                <li><Sun size={20} /> <strong>Sunset Receptions</strong>: Hand-crafted cocktails and dinners under the stars.</li>
                <li><Sparkles size={20} /> <strong>Elite Styling</strong>: Combining natural beauty with high-end decor and lighting.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="video-experience">
        <div className="video-container">
          <div className="video-overlay">
            <div className="container">
              <h2>A Love Story in the <span className="text-secondary">Wild</span></h2>
              <p>Witness the magic of a Tujibambe Wilderness Wedding.</p>
            </div>
          </div>
          <video autoPlay muted loop playsInline className="background-video">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-walking-in-a-field-at-sunset-4202-large.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section className="destinations-showcase">
        <div className="container">
          <div className="section-header-centered">
            <span>Romantic Escapes</span>
            <h2>Iconic Wedding Backdrops</h2>
          </div>
          <div className="destinations-grid">
            <div className="destination-card">
              <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80" alt="Amboseli" />
              <div className="dest-info wedding">
                <h3>Amboseli</h3>
                <p>Exchange vows with the majestic Mount Kilimanjaro in view.</p>
              </div>
            </div>
            <div className="destination-card">
              <img src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80" alt="Diani Beach" />
              <div className="dest-info wedding">
                <h3>Diani Beach</h3>
                <p>Pristine white sands and turquoise waters for a coastal dream.</p>
              </div>
            </div>
            <div className="destination-card">
              <img src="https://images.unsplash.com/photo-1544621425-219178e85938?auto=format&fit=crop&q=80" alt="Laikipia" />
              <div className="dest-info wedding">
                <h3>Laikipia Plateau</h3>
                <p>Private conservancies offering ultimate intimacy and rugged beauty.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="packages" className="theme-packages">
        <div className="container">
          <div className="section-header-centered">
            <span>Our Curated Packages</span>
            <h2>Wedding Collections</h2>
          </div>
          
          <div className="theme-packages-grid">
            <div className="theme-pkg-card elite-glass">
              <div className="pkg-icon"><Heart size={32} /></div>
              <h3>Classic Bush Elegance</h3>
              <p>An intimate ceremony for your closest circle in the heart of nature.</p>
              <div className="pkg-price">{formatPrice(2500)} <small>base price</small></div>
              <ul className="pkg-features">
                <li><CheckCircle size={16} /> Venue Hire (Bush or Garden)</li>
                <li><CheckCircle size={16} /> Basic Wildflower Decor</li>
                <li><CheckCircle size={16} /> Sparkling Wine Toast</li>
              </ul>
              <button className="btn-theme-outline" onClick={() => applyPackage('classic')}>Customize This</button>
            </div>

            <div className="theme-pkg-card elite-glass featured">
              <div className="featured-tag">MOST POPULAR</div>
              <div className="pkg-icon"><Star size={32} /></div>
              <h3>Ultimate Savannah Soirée</h3>
              <p>A full-scale, luxury bush wedding including guest transport and entertainment.</p>
              <div className="pkg-price">{formatPrice(5800)} <small>base price</small></div>
              <ul className="pkg-features">
                <li><CheckCircle size={16} /> Luxury Safari Tent Hire</li>
                <li><CheckCircle size={16} /> 5-Course Bush Buffet</li>
                <li><CheckCircle size={16} /> Full Media Coverage</li>
                <li><CheckCircle size={16} /> Guest VIP Shuttles</li>
              </ul>
              <button className="btn-theme-primary" onClick={() => applyPackage('ultimate')}>Customize This</button>
            </div>
          </div>
        </div>
      </section>

      <section id="calculator" className="theme-calculator">
        <div className="container">
          <div className="calculator-wrapper elite-glass">
            <div className="calc-header">
              <h2>Wedding <span className="text-secondary">Estimator</span></h2>
              <p>Select the services you need for your dream wedding.</p>
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
                    {key === 'decor' && <GlassWater size={24} />}
                    {key === 'media' && <Camera size={24} />}
                    {key === 'entertainment' && <Music size={24} />}
                    {key === 'transport' && <Users size={24} />}
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
                <label>Estimated Total</label>
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

export default WildBushWeddings;
