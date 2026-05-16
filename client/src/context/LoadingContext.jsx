import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        setRequestCount((prev) => prev + 1);
        setIsLoading(true);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        setRequestCount((prev) => {
          const newCount = prev - 1;
          if (newCount <= 0) {
            // Small timeout to prevent flickering on very fast requests
            setTimeout(() => setIsLoading(false), 800);
            return 0;
          }
          return newCount;
        });
        return response;
      },
      (error) => {
        setRequestCount((prev) => {
          const newCount = prev - 1;
          if (newCount <= 0) {
            setTimeout(() => setIsLoading(false), 800);
            return 0;
          }
          return newCount;
        });
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
