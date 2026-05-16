import React, { useEffect, useState } from 'react';
import '../styles/Preloader.css';

const Preloader = () => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => (prev < 100 ? prev + 1 : 100));
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="minimal-preloader">
      <div className="progress-frame">
        <div className="frame-line top" style={{ width: `${Math.min(percent * 4, 100)}%` }}></div>
        <div className="frame-line right" style={{ height: `${Math.max(0, Math.min((percent - 25) * 4, 100))}%` }}></div>
        <div className="frame-line bottom" style={{ width: `${Math.max(0, Math.min((percent - 50) * 4, 100))}%` }}></div>
        <div className="frame-line left" style={{ height: `${Math.max(0, Math.min((percent - 75) * 4, 100))}%` }}></div>
      </div>

      <div className="center-content">
        <div className="logo-wrapper">
          <span className="logo-part t">TUJI</span>
          <span className="logo-part b">BAMBE</span>
        </div>
        <div className="status-wrap">
          <span className="percentage">{percent.toString().padStart(2, '0')}</span>
          <div className="divider"></div>
          <span className="label">
            {percent === 100 ? "ENTER" : "LOADING"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
