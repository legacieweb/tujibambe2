import React, { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { X, CheckCircle2 } from 'lucide-react';

const CurrencyPopup = () => {
  const { currency, changeCurrency, showCurrencyPopup, setShowCurrencyPopup } = useCurrency();
  const [tempCurrency, setTempCurrency] = useState(currency);

  if (!showCurrencyPopup) return null;

  const handleConfirm = () => {
    changeCurrency(tempCurrency);
    setShowCurrencyPopup(false);
  };

  return (
    <div className="currency-minimal-overlay">
      <div className="currency-minimal-card">
        <button className="minimal-close" onClick={() => setShowCurrencyPopup(false)}>
          <X size={20} />
        </button>

        <div className="minimal-header">
          <h3>Currency</h3>
          <p>Select your preferred currency for browsing.</p>
        </div>

        <div className="minimal-options">
          <div 
            className={`minimal-option ${tempCurrency === 'USD' ? 'active' : ''}`}
            onClick={() => setTempCurrency('USD')}
          >
            <span className="minimal-flag">🇺🇸</span>
            <div className="minimal-text">
              <span className="minimal-code">USD</span>
              <span className="minimal-name">US Dollar</span>
            </div>
            {tempCurrency === 'USD' && <CheckCircle2 size={18} className="minimal-check" />}
          </div>

          <div 
            className={`minimal-option ${tempCurrency === 'KES' ? 'active' : ''}`}
            onClick={() => setTempCurrency('KES')}
          >
            <span className="minimal-flag">🇰🇪</span>
            <div className="minimal-text">
              <span className="minimal-code">KES</span>
              <span className="minimal-name">Kenyan Shilling</span>
            </div>
            {tempCurrency === 'KES' && <CheckCircle2 size={18} className="minimal-check" />}
          </div>
        </div>

        <button className="minimal-confirm-btn" onClick={handleConfirm}>
          Confirm Selection
        </button>
      </div>
    </div>
  );
};

export default CurrencyPopup;
