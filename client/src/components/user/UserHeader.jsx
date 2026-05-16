import React from 'react';
import { Menu, Bell, User as UserIcon, Search } from 'lucide-react';

const UserHeader = ({ user, toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="dashboard-header-modern" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '40px',
      background: 'rgba(255, 255, 255, 0.02)',
      padding: '20px 30px',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)'
    }}>
      <div className="header-left-modern" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button 
          className="mobile-menu-btn" 
          onClick={toggleSidebar}
          style={{
            display: 'flex',
            background: 'rgba(255, 77, 0, 0.1)',
            border: 'none',
            color: '#ff4d00',
            padding: '10px',
            borderRadius: '12px',
            cursor: 'pointer'
          }}
        >
          <Menu size={24} />
        </button>
        <div className="welcome-msg">
          <h1 style={{ fontSize: '1.8rem', fontWeight: '900', margin: 0 }}>
            Hello, <span style={{ color: '#ff4d00' }}>{user?.name?.split(' ')[0] || 'Traveler'}</span>!
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>Ready for your next adventure?</p>
        </div>
      </div>
      
      <div className="header-right-modern" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div className="search-bar-modern" style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.03)',
          padding: '10px 15px',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.05)',
          marginRight: '10px'
        }}>
          <Search size={18} color="var(--text-muted)" />
          <input type="text" placeholder="Search..." style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            marginLeft: '10px',
            outline: 'none',
            width: '150px'
          }} />
        </div>
        <button className="action-btn-modern" style={{
          width: '45px',
          height: '45px',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}>
          <Bell size={20} />
        </button>
        <div className="user-pill-modern" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(255,255,255,0.05)',
          padding: '5px 15px 5px 5px',
          borderRadius: '100px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div className="avatar-small" style={{
            width: '35px',
            height: '35px',
            background: 'var(--primary-gradient)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 'bold'
          }}>
            {user?.name?.charAt(0) || 'U'}
          </div>
          <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>{user?.name?.split(' ')[0] || 'User'}</span>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
