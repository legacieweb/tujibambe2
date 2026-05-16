import React from 'react';
import { Menu, Bell, User as UserIcon, Search } from 'lucide-react';

const AdminHeader = ({ user, toggleSidebar, isSidebarOpen, handleLogout }) => {
  return (
    <header className="admin-header">
      <div className="header-left-modern" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button 
          className="mobile-toggle-btn" 
          onClick={toggleSidebar}
          style={{
            display: window.innerWidth <= 992 ? 'flex' : 'none',
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
          <h1 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0 }}>
            Dashboard <span style={{ color: 'var(--admin-accent)' }}>Overview</span>
          </h1>
        </div>
      </div>
      
      <div className="header-right-modern" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div className="header-search">
          <Search size={18} color="var(--admin-text-muted)" />
          <input type="text" placeholder="Search anything..." />
        </div>
        
        <div className="header-actions">
          <button className="action-btn" style={{ background: 'none', border: 'none', color: 'var(--admin-text-muted)', cursor: 'pointer' }}>
            <Bell size={20} />
          </button>
          
          <div className="admin-user-profile">
            <div className="admin-avatar">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>{user?.name || 'Admin'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
