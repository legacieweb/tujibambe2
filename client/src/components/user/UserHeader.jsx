import React from 'react';
import { Bell, Menu, X, Compass, Search } from 'lucide-react';

const UserHeader = ({ user, toggleSidebar, isSidebarOpen }) => {
  return (
    <>
      <header className="user-content-header">
        <button className="sidebar-toggle-btn desktop-hide" onClick={toggleSidebar}>
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="header-greeting">
          <span className="greeting-pill">Welcome Back</span>
          <h1>Hello, {user?.name?.split(' ')[0]}!</h1>
          <p>Your next adventure is just a click away.</p>
        </div>
        
        <div className="header-search-container">
          <Search className="search-icon" size={18} />
          <input type="text" placeholder="Search destinations, tours, or cars..." />
          <div className="search-shortcut">/</div>
        </div>

        <div className="header-actions">
          <button className="icon-action-btn pulse-on-hover">
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>
          <div className="header-user-profile" onClick={() => window.dispatchEvent(new CustomEvent('switchTab', { detail: 'profile' }))}>
            <div className="avatar-circle small">{user?.name?.charAt(0)}</div>
            <div className="user-info-mini">
              <span className="user-name">{user?.name?.split(' ')[0]}</span>
              <span className="user-status">Pro Member</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default UserHeader;
