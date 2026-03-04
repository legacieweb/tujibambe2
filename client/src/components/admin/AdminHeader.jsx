import React from 'react';
import { Search, Bell, Menu, X, Compass } from 'lucide-react';

const AdminHeader = ({ user, toggleSidebar, isSidebarOpen }) => {
  return (
    <>
      <header className="mobile-dashboard-header">
        <div className="mobile-logo">
          <Compass size={24} />
          <span>Tujibambe</span>
        </div>
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
        </div>
      </header>
    </>
  );
};

export default AdminHeader;
