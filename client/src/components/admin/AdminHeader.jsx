import React from 'react';
import { Search, Bell, Menu, X, Compass, LogOut } from 'lucide-react';

const AdminHeader = ({ user, toggleSidebar, isSidebarOpen, handleLogout }) => {
  return (
    <>
      <header className="mobile-dashboard-header">
        <div className="mobile-logo">
          <Compass size={24} />
          <span>Tujibambe</span>
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button onClick={handleLogout} className="logout-btn-header-mobile" style={{ background: 'transparent', border: 'none', color: '#ef4444' }}>
            <LogOut size={20} />
          </button>
          <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <header className="main-content-header">
        <div className="header-greeting">
          <h1>Admin Control Center</h1>
          <p>Welcome back, {user?.name?.split(' ')[0]}! Here's what's happening today.</p>
        </div>
        
        <div className="header-search-container">
          <Search className="search-icon" size={18} />
          <input type="text" placeholder="Search bookings, tours, or travelers..." />
        </div>

        <div className="header-actions">
          <button className="icon-action-btn">
            <Bell size={20} />
          </button>
          <div className="header-user-mini">
            <div className="avatar-circle small">{user?.name?.charAt(0)}</div>
          </div>
          <button onClick={handleLogout} className="icon-action-btn danger-hover" title="Logout" style={{ marginLeft: '10px' }}>
            <LogOut size={20} />
          </button>
        </div>
      </header>
    </>
  );
};

export default AdminHeader;
