import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Users, 
  Car, 
  BarChart3, 
  Settings, 
  LogOut, 
  Home,
  MessageSquare,
  Zap,
  Ticket,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen, user, handleLogout }) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'tours', label: 'Tours', icon: <Map size={20} /> },
    { id: 'car-bookings', label: 'Car Rentals', icon: <Car size={20} /> },
    { id: 'epic-fun-times', label: 'Epic Fun Times', icon: <Zap size={20} /> },
    { id: 'event-planning', label: 'Event Planning', icon: <Ticket size={20} /> },
    { id: 'customers', label: 'Customers', icon: <Users size={20} /> },
    { id: 'inquiries', label: 'Inquiries', icon: <MessageSquare size={20} /> },
    { id: 'financials', label: 'Financials', icon: <BarChart3 size={20} /> },
    { id: 'system', label: 'System', icon: <Settings size={20} /> },
  ];

  return (
    <aside className={`dashboard-sidebar ${isSidebarOpen ? 'active' : ''}`}>
      <div className="sidebar-brand">
        <div className="brand-logo">T</div>
        <div className="brand-info">
          <h3>Tujibambe</h3>
          <p>Admin Console</p>
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

        <div className="nav-divider">Menu</div>

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

export default AdminSidebar;
