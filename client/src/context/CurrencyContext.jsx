import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('userCurrency') || 'USD';
  });
  const [exchangeRate] = useState(124);

  useEffect(() => {
    localStorage.setItem('userCurrency', currency);
  }, [currency]);

  const formatPrice = (price) => {
    if (currency === 'KES') {
      const converted = price * exchangeRate;
      return `KES ${new Intl.NumberFormat('en-KE').format(converted)}`;
    }
    return `$${new Intl.NumberFormat('en-US').format(price)}`;
  };

  const value = {
    currency,
    setCurrency,
    formatPrice,
    exchangeRate
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
