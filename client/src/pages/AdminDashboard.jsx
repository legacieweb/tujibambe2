import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import AdminOverview from '../components/admin/AdminOverview';
import AdminTours from '../components/admin/AdminTours';
import AdminCustomers from '../components/admin/AdminCustomers';
import AdminFinancials from '../components/admin/AdminFinancials';
import AdminSystem from '../components/admin/AdminSystem';
import AdminVehicles from '../components/admin/AdminVehicles';
import AdminCarBookings from '../components/admin/AdminCarBookings';
import AdminEpicFunTimes from '../components/admin/AdminEpicFunTimes';
import AdminEventPlanning from '../components/admin/AdminEventPlanning';
import AdminInquiries from '../components/admin/AdminInquiries';
import '../styles/Dashboard.css';

const AdminDashboard = () => {
  const { user, logout, loading: authLoading } = useContext(AuthContext);
  const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://tujibambe2.onrender.com';
  
  const [bookings, setBookings] = useState([]);
  const [tours, setTours] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const [bookingsRes, toursRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/bookings/all`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${API_BASE_URL}/api/tours`)
        ]);
        setBookings(bookingsRes.data);
        setTours(toursRes.data);
        
        // Extract unique customers from bookings
        const uniqueCustomers = [];
        const seenEmails = new Set();
        bookingsRes.data.forEach(b => {
          if (b.user && !seenEmails.has(b.user.email)) {
            seenEmails.add(b.user.email);
            uniqueCustomers.push(b.user);
          }
        });
        setCustomers(uniqueCustomers);
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDeleteTour = async (id) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/api/tours/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTours(tours.filter(t => t._id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete tour');
      }
    }
  };

  const handleDeleteBooking = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/api/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(bookings.filter(b => b._id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete booking');
      }
    }
  };

  const handleUpdateBookingStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${API_BASE_URL}/api/bookings/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(bookings.map(b => b._id === id ? { ...b, status: res.data.status } : b));
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  if (authLoading) return (
    <div className="modern-loading-container full-page">
      <div className="loading-pulse"></div>
      <p>Verifying Credentials...</p>
    </div>
  );

  if (!user || user.role !== 'admin') {
    return (
      <div className="modern-loading-container full-page">
        <div className="loading-pulse"></div>
        <p>Unauthorized Access. Redirecting...</p>
      </div>
    );
  }

  if (loading) return (
    <div className="modern-loading-container full-page">
      <div className="loading-pulse"></div>
      <p>Accessing Secure Admin Panel...</p>
    </div>
  );

  return (
    <div className={`dashboard-wrapper ${isSidebarOpen ? 'sidebar-active' : ''}`}>
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        user={user} 
        handleLogout={handleLogout} 
      />

      <main className="dashboard-main-content">
        <AdminHeader 
          user={user} 
          toggleSidebar={toggleSidebar} 
          isSidebarOpen={isSidebarOpen} 
          handleLogout={handleLogout}
        />

        <div className="dashboard-scrollable-content">
          {activeTab === 'overview' && (
            <AdminOverview 
              bookings={bookings} 
              tours={tours} 
              customers={customers} 
              setActiveTab={setActiveTab} 
              handleDeleteTour={handleDeleteTour}
              handleDeleteBooking={handleDeleteBooking}
              handleUpdateBookingStatus={handleUpdateBookingStatus}
            />
          )}
          {activeTab === 'tours' && <AdminTours tours={tours} handleDeleteTour={handleDeleteTour} />}
          {activeTab === 'epic-fun-times' && <AdminEpicFunTimes bookings={bookings.filter(b => b.eventType === 'EpicFunTime')} handleDeleteBooking={handleDeleteBooking} handleUpdateBookingStatus={handleUpdateBookingStatus} />}
          {activeTab === 'event-planning' && <AdminEventPlanning bookings={bookings.filter(b => b.eventType === 'EventPlanning')} handleDeleteBooking={handleDeleteBooking} handleUpdateBookingStatus={handleUpdateBookingStatus} />}
          {activeTab === 'vehicles' && <AdminVehicles />}
          {activeTab === 'car-bookings' && <AdminCarBookings />}
          {activeTab === 'customers' && <AdminCustomers customers={customers} bookings={bookings} />}
          {activeTab === 'inquiries' && <AdminInquiries />}
          {activeTab === 'financials' && (
            <AdminFinancials 
              bookings={bookings} 
              handleDeleteBooking={handleDeleteBooking}
              handleUpdateBookingStatus={handleUpdateBookingStatus}
            />
          )}
          {activeTab === 'system' && <AdminSystem />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
