import React, { useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import '../styles/Toast.css';

const Toast = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="toast-container" onClick={onClose}>
      <div className="toast-icon">
        <Sparkles size={20} />
      </div>
      <div className="toast-message">{message}</div>
    </div>
  );
};

export default Toast;
