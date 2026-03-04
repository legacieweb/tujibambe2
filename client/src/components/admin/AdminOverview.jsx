import React from 'react';
import { Calendar, DollarSign, Users, Map, BarChart, ChevronRight, Plus, Edit, Trash2, Shield, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminOverview = ({ bookings, tours, customers, setActiveTab, handleDeleteTour, handleDeleteBooking, handleUpdateBookingStatus }) => {
  const navigate = useNavigate();
  const totalRevenue = bookings.reduce((sum, b) => {
    const amount = b.totalPrice || 0;
    return sum + (b.currency === 'KES' ? amount / 129 : amount);
  }, 0);

  return (
    <div className="dashboard-grid-layout fade-in">
      {/* Admin Stats Strip */}
      <div className="stats-strip">
        <div className="mini-stat-card">
          <div className="stat-icon-box orange"><Calendar size={24} /></div>
          <div className="stat-val">
            <strong>{bookings.length}</strong>
            <span>Total Reservations</span>
          </div>
          <div className="stat-trend neutral">0%</div>
        </div>
        <div className="mini-stat-card">
          <div className="stat-icon-box green"><DollarSign size={24} /></div>
          <div className="stat-val">
            <strong>${totalRevenue.toLocaleString()}</strong>
            <span>System Revenue</span>
          </div>
          <div className="stat-trend neutral">0%</div>
        </div>
        <div className="mini-stat-card">
          <div className="stat-icon-box blue"><Users size={24} /></div>
          <div className="stat-val">
            <strong>{customers.length}</strong>
            <span>Unique Travelers</span>
          </div>
          <div className="stat-trend neutral">0%</div>
        </div>
        <div className="mini-stat-card">
          <div className="stat-icon-box purple"><Map size={24} /></div>
          <div className="stat-val">
            <strong>{tours.length}</strong>
            <span>Active Packages</span>
          </div>
          <div className="stat-trend positive">+2</div>
        </div>
      </div>

      <div className="admin-content-grid">
        <section className="glass-panel main-panel">
          <div className="section-head">
            <div className="title-with-subtitle">
              <h2><BarChart size={20} /> Operational Overview</h2>
              <p>Real-time booking and revenue metrics</p>
            </div>
            <div className="panel-actions">
               <button className="text-btn" onClick={() => setActiveTab('financials')}>View Detailed Reports</button>
            </div>
          </div>
          
          <div className="table-responsive-modern">
            <table className="modern-admin-table">
              <thead>
                <tr>
                  <th>Traveler</th>
                  <th>Tour Package</th>
                  <th>Vehicle</th>
                  <th>Seats</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 6).map(b => (
                  <tr key={b._id}>
                    <td>
                      <div className="user-cell">
                        <div className="avatar-circle xsmall">{b.user?.name?.charAt(0)}</div>
                        <div className="user-info-text">
                          <span className="name">{b.user?.name}</span>
                          <span className="sub">{b.user?.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="tour-cell-info">
                        <span className="tour-title">{b.tour?.title}</span>
                        <span className="tour-date">{new Date(b.bookingDate).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td>
                      <span className="vehicle-name">{b.trip?.vehicle?.name || b.vehicle?.name || 'Standard'}</span>
                    </td>
                    <td>
                      <span className="seat-pills">{b.selectedSeats?.join(', ') || 'N/A'}</span>
                    </td>
                    <td>
                      <select 
                        className={`status-pill ${b.status}`} 
                        value={b.status}
                        onChange={(e) => handleUpdateBookingStatus(b._id, e.target.value)}
                        style={{border: 'none', cursor: 'pointer', outline: 'none', background: 'transparent'}}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="amount-cell">{b.currency === 'KES' ? 'KSh' : '$'}{b.totalPrice?.toLocaleString()}</td>
                    <td>
                      <div className="item-actions justify-end">
                        <button className="icon-btn-sm" onClick={() => navigate(`/admin/booking/${b._id}`)} title="View Details">
                          <ChevronRight size={16} />
                        </button>
                        <button className="icon-btn-sm delete" onClick={() => handleDeleteBooking(b._id)} title="Delete Booking">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="dashboard-widgets">
          <div className="widget-card glass-panel">
            <div className="section-head">
              <div className="title-with-subtitle">
                <h3><Map size={18} /> Quick Inventory</h3>
              </div>
              <button className="icon-btn-sm plus" onClick={() => navigate('/admin/add-tour')}>
                <Plus size={18} />
              </button>
            </div>
            <div className="tour-list-admin-modern">
              {tours.slice(0, 4).map(t => (
                <div key={t._id} className="tour-item-modern">
                  <div className="tour-thumb">
                    <img src={t.image} alt="" />
                  </div>
                  <div className="tour-info-mini">
                    <h4>{t.title}</h4>
                    <span className="price">${t.price}</span>
                  </div>
                  <div className="item-actions">
                    <button className="icon-btn-sm" onClick={() => navigate(`/admin/edit-tour/${t._id}`)}>
                      <Edit size={14} />
                    </button>
                    <button className="icon-btn-sm delete" onClick={() => handleDeleteTour(t._id)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-view-all" onClick={() => setActiveTab('tours')}>
              Manage All Inventory <ChevronRight size={14} />
            </button>
          </div>

          <div className="widget-card glass-panel system-status-widget">
            <div className="section-head">
              <h3><Shield size={18} /> System Status</h3>
            </div>
            <div className="status-grid">
              <div className="status-item">
                <div className="status-dot online"></div>
                <span>API Gateway</span>
              </div>
              <div className="status-item">
                <div className="status-dot online"></div>
                <span>Database</span>
              </div>
              <div className="status-item">
                <div className="status-dot warning"></div>
                <span>M-Pesa API</span>
              </div>
            </div>
            <div className="last-backup">
              <Database size={14} /> Last backup: 2h 15m ago
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AdminOverview;
