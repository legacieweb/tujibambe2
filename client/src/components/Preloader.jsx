import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Mountain } from 'lucide-react';
import '../styles/Preloader.css';

const Preloader = () => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => (prev < 100 ? prev + 1 : 100));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="modern-preloader">
      <div className="preloader-bg-accent"></div>
      
      <div className="preloader-content">
        <div className="preloader-icon-wrapper">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="main-icon"
          >
            <Compass size={60} strokeWidth={1.5} />
          </motion.div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="compass-spinner"
          />
        </div>

        <motion.div 
          className="preloader-brand-v2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          TUJI<span>BAMBE</span>
        </motion.div>
        
        <div className="modern-progress-box">
          <div className="progress-track-v2">
            <motion.div 
              className="progress-fill-v2"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
            />
          </div>
          <div className="progress-metrics">
            <span className="percent-text">{percent}%</span>
            <span className="loading-tag">PREPARING YOUR ADVENTURE</span>
          </div>
        </div>
      </div>

      <motion.div 
        className="preloader-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="footer-line"></div>
        <span>DISCOVER KENYA</span>
      </motion.div>
    </div>
  );
};

export default Preloader;
