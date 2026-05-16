import React from 'react';
import { LayoutDashboard, Calendar, Car, User, Settings, LogOut, Home, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserSidebar = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen, user, handleLogout }) => {
  const navigate = useNavigate();
  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'tour-bookings', label: 'Tour Bookings', icon: <Calendar size={20} /> },
    { id: 'car-bookings', label: 'Car Rentals', icon: <Car size={20} /> },
    { id: 'profile', label: 'My Profile', icon: <User size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className={`dashboard-sidebar ${isSidebarOpen ? 'active' : ''}`}>
      <div className="sidebar-brand">
        <div className="brand-logo">T</div>
        <div className="brand-info">
          <h3>Tujibambe</h3>
          <p>Traveler Dashboard</p>
        </div>
      </div>

      <div className="sidebar-nav">
        <button 
          className="nav-item back-home-btn" 
          onClick={() => navigate('/')}
        >
          <Home size={18} />
          <span>Back to Website</span>
          <ChevronRight size={14} className="ms-auto" />
        </button>

        <div className="nav-divider">Explore</div>

        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(item.id);
              if (window.innerWidth <= 992) setIsSidebarOpen(false);
            }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {activeTab === item.id && <div className="active-indicator" />}
          </button>
        ))}
        
        <button className="nav-item logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default UserSidebar;
