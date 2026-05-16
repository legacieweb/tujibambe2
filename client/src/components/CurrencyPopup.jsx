import React, { useState, useEffect } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { Globe, ArrowRight, Coins } from 'lucide-react';

const CurrencyPopup = () => {
  const { setCurrency, currency: currentCurrency } = useCurrency();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasChosen = localStorage.getItem('currencyChosen');
    if (!hasChosen) {
      // Delay to show after preloader
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (code) => {
    setCurrency(code);
    localStorage.setItem('currencyChosen', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="currency-popup-overlay" style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      backdropFilter: 'blur(20px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="currency-popup-card" style={{
        background: '#111',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '32px',
        padding: '50px',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        animation: 'scaleUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'rgba(255, 77, 0, 0.1)',
          color: '#ff4d00',
          borderRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 30px'
        }}>
          <Globe size={40} />
        </div>

        <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'white', marginBottom: '15px' }}>
          Choose Your <span style={{ color: '#ff4d00' }}>Currency</span>
        </h2>
        
        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6', marginBottom: '40px', fontSize: '1.1rem' }}>
          Select your preferred currency to see prices in your local value. You can change this anytime in the navigation bar.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          <button 
            onClick={() => handleChoice('USD')}
            style={{
              background: currentCurrency === 'USD' ? '#ff4d00' : 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
              padding: '20px',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>USD</span>
            <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>US Dollar</span>
          </button>

          <button 
            onClick={() => handleChoice('KES')}
            style={{
              background: currentCurrency === 'KES' ? '#ff4d00' : 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
              padding: '20px',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>KES</span>
            <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Kenyan Shilling</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
          <Coins size={16} />
          <span>Transparent pricing, no hidden fees</span>
        </div>
      </div>

      <style>{`
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default CurrencyPopup;
