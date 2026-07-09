import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Navigation } from 'lucide-react';
import '../styles/Preloader.css';

const Preloader = () => {
  const [isFound, setIsFound] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFound(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="modern-preloader">
      <div className="preloader-bg-ambient">
        <div className="blob-1"></div>
        <div className="blob-2"></div>
      </div>
      
      <div className="compass-search-container">
        <div className="radar-rings">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="radar-ring"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 2, opacity: [0, 0.2, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.6,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        <div className="compass-body">
          <motion.div 
            className="compass-needle"
            animate={isFound ? { rotate: 180 } : { rotate: 360 * 5 }}
            transition={isFound ? 
              { type: "spring", stiffness: 100, damping: 10 } : 
              { duration: 2.5, ease: "easeInOut" }
            }
          >
            <Navigation size={40} className="needle-icon" />
          </motion.div>
          <div className="compass-center"></div>
        </div>

        <div className="direction-labels">
          <span className="label-n">N</span>
          <span className="label-e">E</span>
          <span className="label-s">S</span>
          <span className="label-w">W</span>
        </div>
      </div>

      <div className="preloader-brand-reveal">
        <AnimatePresence>
          {isFound && (
            <motion.div className="brand-wrapper">
              {"TUJIBAMBE".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: "easeOut" 
                  }}
                  className={`reveal-char ${char === 'B' || char === 'A' || char === 'M' || char === 'B' || char === 'E' && index > 3 ? 'accent' : ''}`}
                  style={{ 
                    color: index > 3 ? '#ff4d00' : '#fff',
                    display: 'inline-block'
                  }}
                >
                  {char}
                </motion.span>
              ))}
              <motion.div 
                className="brand-underline"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1, duration: 1 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isFound ? 0.6 : 0.3 }}
          className="search-status"
        >
          {isFound ? "ADVENTURE AWAITS" : "LOCATING ADVENTURE..."}
        </motion.p>
      </div>

      <div className="coord-overlay">
        <span>1.2921° S, 36.8219° E</span>
      </div>
    </div>
  );
};

export default Preloader;
