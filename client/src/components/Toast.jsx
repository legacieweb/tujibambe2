import React, { useEffect } from 'react';
import { X, Info } from 'lucide-react';

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed', bottom: '2rem', right: '2rem',
      backgroundColor: '#333', color: '#fff', padding: '1rem 1.5rem',
      borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '1rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.5)', zIndex: 2000,
      borderLeft: '4px solid #e67e22'
    }}>
      <Info size={20} color="#e67e22" />
      <span>{message}</span>
      <button onClick={onClose} style={{
        background: 'none', border: 'none', color: '#888', cursor: 'pointer'
      }}>
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;
