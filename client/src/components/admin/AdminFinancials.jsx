import React from 'react';
import { DollarSign, PieChart, ArrowUpRight, ArrowDownRight, CreditCard } from 'lucide-react';

const AdminFinancials = ({ bookings, handleUpdateBookingStatus, handleDeleteBooking }) => {
  const totalRevenue = bookings.reduce((acc, b) => acc + (b.totalPrice || 0), 0);
  const totalPaid = bookings.reduce((acc, b) => acc + (b.amountPaid || 0), 0);
  const pendingBalance = totalRevenue - totalPaid;

  const financialStats = [
    { label: 'Gross Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: <DollarSign size={20} />, color: '#ff4d00' },
    { label: 'Amount Collected', value: `$${totalPaid.toLocaleString()}`, icon: <CreditCard size={20} />, color: '#00ff7f' },
    { label: 'Outstanding Balance', value: `$${pendingBalance.toLocaleString()}`, icon: <PieChart size={20} />, color: '#ffab00' },
  ];

  return (
    <div className="admin-financials-section">
      <div className="admin-table-header" style={{ marginBottom: '25px' }}>
        <h2>Financial Management</h2>
      </div>

      <div className="admin-stats-grid" style={{ marginBottom: '30px' }}>
        {financialStats.map((stat, index) => (
          <div key={index} className="admin-stat-card">
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <h3 className="stat-value">{stat.value}</h3>
            </div>
            <div className="stat-icon-wrapper" style={{ background: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="admin-table-container">
        <div className="admin-table-header">
          <h2>Recent Transactions</h2>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Reference</th>
              <th>Customer</th>
              <th>Total Amount</th>
              <th>Paid</th>
              <th>Balance</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => {
              const balance = (booking.totalPrice || 0) - (booking.amountPaid || 0);
              return (
                <tr key={booking._id || `trans-${index}`}>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
                    {booking._id?.substring(0, 8).toUpperCase() || 'REF-N/A'}
                  </td>
                  <td>
                    <div style={{ fontWeight: '600' }}>{booking.user?.name || 'Guest'}</div>
                  </td>
                  <td style={{ fontWeight: '600' }}>${booking.totalPrice?.toLocaleString()}</td>
                  <td style={{ color: '#00ff7f' }}>${booking.amountPaid?.toLocaleString() || 0}</td>
                  <td style={{ color: balance > 0 ? '#ffab00' : 'var(--admin-text-muted)' }}>
                    ${balance.toLocaleString()}
                  </td>
                  <td>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      background: balance === 0 ? 'rgba(0, 255, 127, 0.1)' : 'rgba(255, 171, 0, 0.1)',
                      color: balance === 0 ? '#00ff7f' : '#ffab00'
                    }}>
                      {balance === 0 ? 'Fully Paid' : 'Partial'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminFinancials;
