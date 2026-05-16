import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import API_BASE_URL from '../api/config';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import UserSidebar from '../components/user/UserSidebar';
import UserOverview from '../components/user/UserOverview';
import UserTours from '../components/user/UserTours';
import UserProfile from '../components/user/UserProfile';
import UserSettings from '../components/user/UserSettings';
import UserCarBookings from '../components/user/UserCarBookings';
import UserEventPlanning from '../components/user/UserEventPlanning';
import '../styles/UserDashboard.css';
import '../styles/UserDashboardModern.css';

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for tab in query params
    const queryParams = new URLSearchParams(location.search);
    const tabParam = queryParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
    
    const handleSwitchTab = (e) => setActiveTab(e.detail);
    window.addEventListener('switchTab', handleSwitchTab);
    return () => window.removeEventListener('switchTab', handleSwitchTab);
  }, [location.search]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE_URL}/api/bookings/my-bookings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };



  return (
    <div className={`dashboard-wrapper user-theme ${isSidebarOpen ? 'sidebar-active' : ''}`}>
      <UserSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        user={user} 
        bookings={bookings}
        handleLogout={handleLogout} 
      />

      <main className="dashboard-main-content user-theme">
        <div className="dashboard-welcome-section">
          <div className="welcome-text">
            <h1>Jambo, <span>{user?.name?.split(' ')[0] || 'Traveler'}</span>!</h1>
            <p>Ready for your next adventure with Tujibambe?</p>
          </div>
          <div className="quick-actions">
            <button className="mobile-toggle-btn" onClick={toggleSidebar}>
              <Menu size={24} />
            </button>
          </div>
        </div>

        <div className="dashboard-scrollable-content user-theme">
          {activeTab === 'dashboard' && <UserOverview bookings={bookings} />}
          {activeTab === 'tour-bookings' && <UserTours bookings={bookings} />}
          {activeTab === 'car-bookings' && <UserCarBookings />}
          {activeTab === 'event-planning' && <UserEventPlanning />}
          {activeTab === 'profile' && <UserProfile user={user} bookings={bookings} />}
          {activeTab === 'settings' && <UserSettings />}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
