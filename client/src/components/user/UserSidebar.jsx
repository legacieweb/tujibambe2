import React from 'react';
import { 
  LayoutDashboard, MapPin, User as UserIcon, 
  Settings, LogOut, Compass, X, Shield, Calendar 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserSidebar = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen, user, bookings, handleLogout }) => {
  const navigate = useNavigate();
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, action: () => { setActiveTab('dashboard'); setIsSidebarOpen(false); } },
    { id: 'car-bookings', label: 'My Car Hires', icon: Compass, action: () => { setActiveTab('car-bookings'); setIsSidebarOpen(false); } },
    { id: 'event-planning', label: 'Event Planning', icon: Calendar, action: () => { setActiveTab('event-planning'); setIsSidebarOpen(false); } },
    { id: 'tours', label: 'Browse Tours', icon: MapPin, action: () => { navigate('/tours'); setIsSidebarOpen(false); } },
    { id: 'profile', label: 'Profile', icon: UserIcon, action: () => { setActiveTab('profile'); setIsSidebarOpen(false); } },
    { id: 'settings', label: 'Settings', icon: Settings, action: () => { setActiveTab('settings'); setIsSidebarOpen(false); } },
  ];

  return (
    <>
      <aside className={`user-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon-container">
              <Compass size={28} />
            </div>
            <span>Tujibambe</span>
          </div>
          <button className="close-sidebar-mobile" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="sidebar-profile-card">
          <div className="profile-visual">
            <div className="profile-avatar-glow">
              <div className="avatar-inner">{user?.name?.charAt(0)}</div>
            </div>
            <div className="profile-badge-online"></div>
          </div>
          <div className="profile-content">
            <div className="profile-name-row">
              <h3>{user?.name}</h3>
              <div className="verified-badge">
                <Shield size={10} fill="currentColor" />
              </div>
            </div>
            <p className="profile-email-text">{user?.email}</p>
          </div>
          <div className="profile-stats-mini">
            <div className="stat-item">
              <span className="stat-val">{bookings?.length || 0}</span>
              <span className="stat-lbl">Bookings</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-val">Elite</span>
              <span className="stat-lbl">Tier</span>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Main Menu</div>
          {navItems.map((item) => (
            <button 
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`} 
              onClick={item.action}
            >
              <div className="nav-icon-box">
                <item.icon size={18} />
              </div>
              <span className="nav-label">{item.label}</span>
              {activeTab === item.id && <div className="active-indicator"></div>}
            </button>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}
    </>
  );
};

export default UserSidebar;
