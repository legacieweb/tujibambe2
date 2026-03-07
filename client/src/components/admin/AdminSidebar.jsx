import React from 'react';
import { 
  LayoutDashboard, Users, Map, Settings, 
  DollarSign, LogOut, Compass, X, Shield,
  Car, Calendar, Zap, Sparkles, Mail
} from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen, user, handleLogout }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'tours', label: 'Manage Tours', icon: Map },
    { id: 'epic-fun-times', label: 'Epic Fun Times', icon: Zap },
    { id: 'event-planning', label: 'Event Planning', icon: Sparkles },
    { id: 'vehicles', label: 'Manage Fleet', icon: Car },
    { id: 'car-bookings', label: 'Car Hires', icon: Calendar },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'inquiries', label: 'Inquiries', icon: Mail },
    { id: 'financials', label: 'Financials', icon: DollarSign },
    { id: 'system', label: 'System', icon: Settings },
  ];

  return (
    <>
      <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Compass size={32} />
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
              <div className="verified-check">
                <Shield size={12} fill="currentColor" />
              </div>
            </div>
            <p className="profile-email-text">Administrator Panel</p>
          </div>
          <div className="profile-welcome-msg">
            System Controller
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button 
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`} 
              onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
            >
              <item.icon size={20} /> {item.label}
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

export default AdminSidebar;
