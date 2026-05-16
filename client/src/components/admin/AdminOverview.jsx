import React from 'react';
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const AdminOverview = ({ bookings, tours, customers, handleUpdateBookingStatus, handleDeleteBooking }) => {
  const totalRevenue = bookings.reduce((acc, b) => acc + (b.totalPrice || 0), 0);
  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');

  const stats = [
    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: <DollarSign size={24} />, trend: '+12.5%', trendType: 'up' },
    { label: 'Total Bookings', value: bookings.length, icon: <ShoppingBag size={24} />, trend: '+5.2%', trendType: 'up' },
    { label: 'Total Customers', value: customers.length, icon: <Users size={24} />, trend: '+8.1%', trendType: 'up' },
    { label: 'Success Rate', value: `${((confirmedBookings.length / (bookings.length || 1)) * 100).toFixed(1)}%`, icon: <TrendingUp size={24} />, trend: '+2.4%', trendType: 'up' },
  ];

  return (
    <div className="admin-overview-content">
      <div className="admin-stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="admin-stat-card">
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <h3 className="stat-value">{stat.value}</h3>
              <span className={`stat-trend trend-${stat.trendType}`}>{stat.trend}</span>
            </div>
            <div className="stat-icon-wrapper">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="admin-table-container">
        <div className="admin-table-header">
          <h2>Recent Bookings</h2>
          <button className="view-all-btn" style={{
            background: 'none',
            border: 'none',
            color: 'var(--admin-accent)',
            fontWeight: '600',
            cursor: 'pointer'
          }}>View All</button>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.slice(0, 5).map((booking, index) => (
              <tr key={booking._id || booking.id || `booking-${index}`}>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: '600' }}>{booking.user?.name || 'Guest'}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{booking.user?.email || 'No email'}</span>
                  </div>
                </td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td>${booking.totalPrice?.toLocaleString()}</td>
                <td>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    background: booking.status === 'confirmed' ? 'rgba(0, 255, 127, 0.1)' : 'rgba(255, 171, 0, 0.1)',
                    color: booking.status === 'confirmed' ? '#00ff7f' : '#ffab00'
                  }}>
                    {booking.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {booking.status === 'pending' && (
                      <button 
                        onClick={() => handleUpdateBookingStatus(booking._id || booking.id, 'confirmed')}
                        style={{ background: 'none', border: 'none', color: '#00ff7f', cursor: 'pointer' }}
                        title="Confirm"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}
                    <button 
                      onClick={() => handleDeleteBooking(booking._id || booking.id)}
                      style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}
                      title="Delete"
                    >
                      <AlertCircle size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOverview;
