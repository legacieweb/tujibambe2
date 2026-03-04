import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import UserSidebar from '../components/user/UserSidebar';
import UserHeader from '../components/user/UserHeader';
import UserOverview from '../components/user/UserOverview';
import UserProfile from '../components/user/UserProfile';
import UserSettings from '../components/user/UserSettings';
import UserCarBookings from '../components/user/UserCarBookings';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const handleSwitchTab = (e) => setActiveTab(e.detail);
    window.addEventListener('switchTab', handleSwitchTab);
    return () => window.removeEventListener('switchTab', handleSwitchTab);
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://tujibambe2.onrender.com/api/bookings/my-bookings', {
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

  if (loading) return (
    <div className="modern-loading-container full-page">
      <div className="loading-pulse"></div>
      <p>Initializing your travel dashboard...</p>
    </div>
  );

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
        <UserHeader 
          user={user} 
          toggleSidebar={toggleSidebar} 
          isSidebarOpen={isSidebarOpen} 
        />

        <div className="dashboard-scrollable-content user-theme">
          {activeTab === 'dashboard' && <UserOverview bookings={bookings} />}
          {activeTab === 'car-bookings' && <UserCarBookings />}
          {activeTab === 'profile' && <UserProfile user={user} bookings={bookings} />}
          {activeTab === 'settings' && <UserSettings />}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
