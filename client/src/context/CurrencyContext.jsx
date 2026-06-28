import React, { createContext, useState, useContext, useEffect } from 'react';

const CurrencyContext = createContext();

const KES_TO_USD_RATE = 0.0077;

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('currency');
    return saved || 'USD';
  });

  const [exchangeRate, setExchangeRate] = useState(KES_TO_USD_RATE);

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const convertPrice = (price, fromCurrency = 'USD') => {
    if (fromCurrency === 'KES') {
      return price;
    }
    return price;
  };

  const formatPrice = (price, targetCurrency = null) => {
    const target = targetCurrency || currency;
    const converted = target === 'KES' ? price * (1 / KES_TO_USD_RATE) : price;
    
    if (target === 'KES') {
      return `KSh ${Math.round(converted).toLocaleString()}`;
    }
    return `$${Math.round(converted).toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, exchangeRate, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export default CurrencyContext;