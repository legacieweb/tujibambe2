import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import API_BASE_URL from '../api/config';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import AdminSidebar from '../components/admin/AdminSidebar';
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
  
  const [bookings, setBookings] = useState([]);
  const [tours, setTours] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [vehicles, setVehicles] = useState([]);
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
        const [bookingsRes, toursRes, inquiriesRes, vehiclesRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/bookings/all`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${API_BASE_URL}/api/tours`),
          axios.get(`${API_BASE_URL}/api/inquiries`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${API_BASE_URL}/api/vehicles`)
        ]);
        setBookings(bookingsRes.data);
        setTours(toursRes.data);
        setInquiries(inquiriesRes.data);
        setVehicles(vehiclesRes.data);
        
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

  const handleUpdateInquiryStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch(`${API_BASE_URL}/api/inquiries/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInquiries(inquiries.map(i => i.id === id ? res.data : i));
    } catch (err) {
      console.error(err);
      alert('Failed to update inquiry status');
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/api/inquiries/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setInquiries(inquiries.filter(i => i.id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete inquiry');
      }
    }
  };





  return (
    <div className={`dashboard-wrapper user-theme admin-theme ${isSidebarOpen ? 'sidebar-active' : ''}`}>
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        user={user} 
        handleLogout={handleLogout} 
      />

      <main className="dashboard-main-content">
        <div className="dashboard-welcome-section">
          <div className="welcome-text">
            <h1>Welcome back, <span>{user?.name || 'Admin'}</span></h1>
            <p>Here's what's happening with Tujibambe today.</p>
          </div>
          <div className="quick-actions">
            <button className="mobile-toggle-btn" onClick={toggleSidebar}>
              <Menu size={24} />
            </button>
          </div>
        </div>

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
          {activeTab === 'vehicles' && <AdminVehicles vehicles={vehicles} />}
          {activeTab === 'car-bookings' && <AdminCarBookings bookings={bookings.filter(b => b.eventType === 'CarRental' || b.vehicleId)} handleDeleteBooking={handleDeleteBooking} handleUpdateBookingStatus={handleUpdateBookingStatus} />}
          {activeTab === 'customers' && <AdminCustomers customers={customers} bookings={bookings} />}
          {activeTab === 'inquiries' && (
            <AdminInquiries 
              inquiries={inquiries} 
              handleUpdateInquiryStatus={handleUpdateInquiryStatus} 
              handleDeleteInquiry={handleDeleteInquiry} 
            />
          )}
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
