import React from 'react';
import { Calendar, DollarSign, CreditCard, Filter, Trash2 } from 'lucide-react';

const AdminFinancials = ({ bookings, handleDeleteBooking, handleUpdateBookingStatus }) => {
  const totalRevenue = bookings.reduce((sum, b) => {
    const amount = b.totalPrice || 0;
    return sum + (b.currency === 'KES' ? amount / 129 : amount);
  }, 0);

  return (
    <div className="tab-view-container fade-in">
      <div className="section-head-modern">
        <div className="title-group">
          <h2>Financial Analytics</h2>
          <p>Revenue performance and transaction logs.</p>
        </div>
        <div className="date-filter-btn">
          <Calendar size={18} /> <span>Current Quarter</span>
        </div>
      </div>

      <div className="stats-strip mt-6">
        <div className="mini-stat-card">
          <div className="stat-icon-box green"><DollarSign size={24} /></div>
          <div className="stat-val">
            <strong>${totalRevenue.toLocaleString()}</strong>
            <span>Gross Revenue</span>
          </div>
          <div className="stat-trend positive">+15.2%</div>
        </div>
        <div className="mini-stat-card">
          <div className="stat-icon-box blue"><CreditCard size={24} /></div>
          <div className="stat-val">
            <strong>{bookings.filter(b => b.paymentStatus === 'completed').length}</strong>
            <span>Processed Sales</span>
          </div>
          <div className="stat-trend positive">+4</div>
        </div>
      </div>

      <div className="glass-panel mt-6">
        <div className="section-head p-6 border-b border-border">
          <div className="title-with-subtitle">
            <h3>Transaction History</h3>
            <p>Recent payments and booking references</p>
          </div>
          <button className="icon-btn-sm"><Filter size={16} /></button>
        </div>
        <div className="table-responsive-modern">
          <table className="modern-admin-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Tour Package</th>
                <th>Traveler</th>
                <th>Amount</th>
                <th>Date</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.filter(b => b.paymentReference).map(b => (
                <tr key={b._id}>
                  <td><code className="ref-code">{b.paymentReference.slice(0, 10)}...</code></td>
                  <td><span className="tour-title-mini font-semibold">{b.tour?.title}</span></td>
                  <td>{b.user?.name}</td>
                  <td>{b.currency === 'KES' ? 'KSh' : '$'}{b.totalPrice?.toLocaleString()}</td>
                  <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="item-actions justify-end">
                      <button className="icon-btn-sm delete" onClick={() => handleDeleteBooking(b._id)} title="Delete Record">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminFinancials;
