import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  LayoutDashboard, Users, Map, Plus, Edit, 
  Trash2, Calendar, DollarSign, Search, 
  Settings, LogOut, Bell, Compass, ChevronRight,
  Shield, CreditCard, BarChart, Database, Filter
} from 'lucide-react';
import '../styles/Dashboard.css';

const AdminDashboard = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [tours, setTours] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [bookingsRes, toursRes] = await Promise.all([
          axios.get('https://tujibambe2.onrender.com/api/bookings/all', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('https://tujibambe2.onrender.com/api/tours')
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
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const activeTrips = bookings.filter(b => b.status === 'confirmed' || b.status === 'active').length;

  const renderOverview = () => (
    <div className="dashboard-grid-layout">
      <div className="stats-strip">
        <div className="mini-stat-card">
          <div className="stat-icon-box blue"><Users size={24} /></div>
          <div className="stat-val">
            <strong>{bookings.length}</strong>
            <span>Reservations</span>
          </div>
        </div>
        <div className="mini-stat-card">
          <div className="stat-icon-box green"><DollarSign size={24} /></div>
          <div className="stat-val">
            <strong>${totalRevenue.toLocaleString()}</strong>
            <span>Total Revenue</span>
          </div>
        </div>
        <div className="mini-stat-card">
          <div className="stat-icon-box orange"><Map size={24} /></div>
          <div className="stat-val">
            <strong>{tours.length}</strong>
            <span>Active Tours</span>
          </div>
        </div>
      </div>

      <div className="admin-content-grid">
        <section className="glass-panel main-panel" style={{padding: '1.5rem'}}>
          <div className="section-head">
            <h2><Calendar size={20} /> Latest Bookings</h2>
          </div>
          <div className="table-responsive">
            <table className="modern-admin-table">
              <thead>
                <tr>
                  <th>Traveler</th>
                  <th>Package</th>
                  <th>Trip Info</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map(b => (
                  <tr key={b._id} onClick={() => navigate(`/dashboard/booking/${b._id}`)} className="clickable-row">
                    <td>
                      <div className="user-cell">
                        <div className="avatar-circle small">{b.user?.name.charAt(0)}</div>
                        <div className="user-info-text">
                          <span>{b.user?.name}</span>
                          <small>{b.user?.email}</small>
                        </div>
                      </div>
                    </td>
                    <td><div style={{fontWeight: 600, fontSize: '0.875rem'}}>{b.tour?.title}</div></td>
                    <td>
                      <div className="date-seats-cell">
                        <span style={{fontSize: '0.8125rem'}}>{new Date(b.bookingDate).toLocaleDateString()}</span>
                        {b.trip && <span className="trip-code-badge" style={{marginLeft: '8px'}}>ID: {b.trip.inviteCode}</span>}
                      </div>
                    </td>
                    <td style={{fontWeight: 700}}>{b.currency === 'KES' ? 'KSh' : '$'}{b.totalPrice?.toLocaleString()}</td>
                    <td><span className={`status-pill ${b.status}`}>{b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="dashboard-widgets">
          <div className="widget-card glass-panel">
            <div className="section-head">
              <h3><Map size={18} /> Quick Manage</h3>
              <button className="text-btn" onClick={() => navigate('/admin/add-tour')}>Add</button>
            </div>
            <div className="tour-list-admin-modern">
              {tours.slice(0, 4).map(t => (
                <div key={t._id} className="tour-item-modern">
                  <div className="tour-info-mini">
                    <h4>{t.title}</h4>
                    <span style={{color: 'var(--primary)', fontWeight: 600, fontSize: '0.75rem'}}>${t.price}</span>
                  </div>
                  <div className="item-actions">
                    <button className="action-btn edit"><Edit size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );

  const renderManageTours = () => (
    <div className="tab-content fade-in">
      <div className="section-head">
        <h2><Map size={24} /> Manage All Tours</h2>
        <button className="btn-modern-sm" onClick={() => navigate('/admin/add-tour')} style={{width: 'auto'}}>
          <Plus size={18} /> Add New Tour
        </button>
      </div>
      <div className="glass-panel" style={{marginTop: '1.5rem'}}>
        <table className="modern-admin-table">
          <thead>
            <tr>
              <th>Tour Details</th>
              <th>Category</th>
              <th>Price</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.map(t => (
              <tr key={t._id}>
                <td>
                  <div className="user-cell">
                    <img src={t.image} alt="" style={{width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover'}} />
                    <div className="user-info-text">
                      <span>{t.title}</span>
                      <small>{t.location}</small>
                    </div>
                  </div>
                </td>
                <td>{t.category}</td>
                <td>${t.price}</td>
                <td><span className="type-tag-mini">{t.type}</span></td>
                <td>
                  <div className="item-actions">
                    <button className="action-btn edit"><Edit size={16} /></button>
                    <button className="action-btn delete"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="tab-content fade-in">
      <div className="section-head">
        <h2><Users size={24} /> Customer Database</h2>
        <div className="search-box-mini">
          <Search size={16} />
          <input type="text" placeholder="Search customers..." />
        </div>
      </div>
      <div className="glass-panel" style={{marginTop: '1.5rem'}}>
        <table className="modern-admin-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Joined</th>
              <th>Total Bookings</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c._id || c.email}>
                <td>
                  <div className="user-cell">
                    <div className="avatar-circle small">{c.name.charAt(0)}</div>
                    <span>{c.name}</span>
                  </div>
                </td>
                <td>{c.email}</td>
                <td>{new Date().toLocaleDateString()}</td>
                <td>{bookings.filter(b => b.user?.email === c.email).length}</td>
                <td><span className="status-pill active">Active</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderFinancials = () => (
    <div className="tab-content fade-in">
      <div className="section-head">
        <h2><DollarSign size={24} /> Financial Insights</h2>
        <div className="date-picker-mock">
          <Calendar size={16} /> Last 30 Days
        </div>
      </div>
      <div className="stats-strip" style={{marginTop: '1.5rem'}}>
        <div className="mini-stat-card">
          <div className="stat-icon-box green"><BarChart size={24} /></div>
          <div className="stat-val">
            <strong>${totalRevenue.toLocaleString()}</strong>
            <span>Total Revenue</span>
          </div>
        </div>
        <div className="mini-stat-card">
          <div className="stat-icon-box blue"><CreditCard size={24} /></div>
          <div className="stat-val">
            <strong>{bookings.filter(b => b.paymentStatus === 'completed').length}</strong>
            <span>Completed Payments</span>
          </div>
        </div>
      </div>
      <div className="glass-panel" style={{marginTop: '1.5rem', padding: '1.5rem'}}>
        <h3>Revenue Streams</h3>
        <p style={{color: 'var(--text-muted)', fontSize: '0.875rem'}}>Detailed breakdown of all financial transactions.</p>
        <div className="table-responsive" style={{marginTop: '1.5rem'}}>
          <table className="modern-admin-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Tour</th>
                <th>Currency</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.filter(b => b.paymentReference).map(b => (
                <tr key={b._id}>
                  <td><code style={{color: 'var(--primary)'}}>{b.paymentReference}</code></td>
                  <td>{b.tour?.title}</td>
                  <td>{b.currency}</td>
                  <td>{b.totalPrice.toLocaleString()}</td>
                  <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSystem = () => (
    <div className="tab-content fade-in">
      <div className="section-head">
        <h2><Settings size={24} /> System Configuration</h2>
      </div>
      <div className="admin-content-grid" style={{marginTop: '1.5rem'}}>
        <div className="glass-panel" style={{padding: '2rem'}}>
          <h3>API Integrations</h3>
          <div className="system-config-list" style={{marginTop: '1.5rem'}}>
            <div className="config-item">
              <div className="config-info">
                <strong>Paystack Payments</strong>
                <p>Public Key: pk_test_...8ed2f2</p>
              </div>
              <span className="status-pill confirmed">Active</span>
            </div>
            <div className="config-item" style={{marginTop: '1.5rem', opacity: 0.5}}>
              <div className="config-info">
                <strong>Google Maps API</strong>
                <p>Not Configured</p>
              </div>
              <span className="status-pill pending">Setup</span>
            </div>
          </div>
        </div>
        <div className="glass-panel" style={{padding: '2rem'}}>
          <h3>Database Status</h3>
          <div className="db-stats" style={{marginTop: '1.5rem'}}>
            <div className="db-stat-row">
              <Database size={18} />
              <span>MongoDB Atlas</span>
              <span className="status-pill confirmed">Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) return (
    <div className="modern-loading-container full-page">
      <div className="loading-pulse"></div>
      <p>Accessing Secure Admin Panel...</p>
    </div>
  );

  return (
    <div className="dashboard-wrapper">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <Compass size={32} />
          <span>Tujibambe</span>
        </div>
        <div className="admin-status-section">
          <div className="admin-welcome">
            <h3>Admin Portal</h3>
            <p>Welcome, {user?.name.split(' ')[0]}</p>
          </div>
        </div>
        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <LayoutDashboard size={20} /> Overview
          </button>
          <button className={`nav-item ${activeTab === 'tours' ? 'active' : ''}`} onClick={() => setActiveTab('tours')}>
            <Map size={20} /> Manage Tours
          </button>
          <button className={`nav-item ${activeTab === 'customers' ? 'active' : ''}`} onClick={() => setActiveTab('customers')}>
            <Users size={20} /> Customers
          </button>
          <button className={`nav-item ${activeTab === 'financials' ? 'active' : ''}`} onClick={() => setActiveTab('financials')}>
            <DollarSign size={20} /> Financials
          </button>
          <button className={`nav-item ${activeTab === 'system' ? 'active' : ''}`} onClick={() => setActiveTab('system')}>
            <Settings size={20} /> System
          </button>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      <main className="dashboard-main-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'tours' && renderManageTours()}
        {activeTab === 'customers' && renderCustomers()}
        {activeTab === 'financials' && renderFinancials()}
        {activeTab === 'system' && renderSystem()}
      </main>
    </div>
  );
};

export default AdminDashboard;