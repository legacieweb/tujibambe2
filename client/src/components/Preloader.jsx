import React, { useEffect, useState } from 'react';
import '../styles/Preloader.css';

const Preloader = () => {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
      setTimeout(() => setShow(false), 800);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className={`preloader-overlay ${fade ? 'fade-out' : ''}`}>
      <div className="preloader-content">
        <div className="logo-animation">
          <h1 className="logo-text">TUJI<span>BAMBE</span></h1>
          <div className="logo-underline"></div>
        </div>
        <div className="loader-container">
          <div className="modern-loader">
            <div className="inner-ring"></div>
            <div className="outer-ring"></div>
            <div className="center-dot"></div>
          </div>
          <p className="loading-text">Preparing your adventure...</p>
        </div>
      </div>
      <div className="preloader-bg-elements">
        <div className="bg-circle one"></div>
        <div className="bg-circle two"></div>
      </div>
    </div>
  );
};

export default Preloader;
