import React from 'react';
import { useCurrency } from '../context/CurrencyContext';

const CurrencySelector = () => {
  const { currency, changeCurrency } = useCurrency();

  return (
    <div className="currency-selector">
      <button 
        className={`currency-btn ${currency === 'USD' ? 'active' : ''}`}
        onClick={() => changeCurrency('USD')}
      >
        USD
      </button>
      <button 
        className={`currency-btn ${currency === 'KES' ? 'active' : ''}`}
        onClick={() => changeCurrency('KES')}
      >
        KES
      </button>
    </div>
  );
};

export default CurrencySelector;
