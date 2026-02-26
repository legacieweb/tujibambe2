import React, { createContext, useState, useEffect, useContext } from 'react';

const CurrencyContext = createContext();

const USD_TO_KES = 129;

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [showCurrencyPopup, setShowCurrencyPopup] = useState(false);

  useEffect(() => {
    // Check if user has already selected currency
    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency) {
      setCurrency(savedCurrency);
    } else {
      // Skip popup for testing purposes
      setShowCurrencyPopup(false);
      // Set default currency
      localStorage.setItem('currency', 'USD');
    }
  }, []);

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem('currency', newCurrency);
    setShowCurrencyPopup(false);
  };

  const convertPrice = (price) => {
    if (currency === 'KES') {
      return Math.round(price * USD_TO_KES);
    }
    return price;
  };

  const formatPrice = (price) => {
    const convertedPrice = convertPrice(price);
    if (currency === 'KES') {
      return `KSh ${convertedPrice.toLocaleString()}`;
    }
    return `$${convertedPrice.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{
      currency,
      changeCurrency,
      convertPrice,
      formatPrice,
      showCurrencyPopup,
      setShowCurrencyPopup
    }}>
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
