import React from 'react';
import { Zap, CheckCircle, Trash2, Clock } from 'lucide-react';

const AdminEpicFunTimes = ({ bookings, handleDeleteBooking, handleUpdateBookingStatus }) => {
  return (
    <div className="admin-epic-section">
      <div className="admin-table-header" style={{ marginBottom: '25px' }}>
        <h2>Epic Fun Times Bookings</h2>
        <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>
          Total Requests: <span style={{ color: 'white', fontWeight: '700' }}>{bookings.length}</span>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Activity</th>
              <th>Date</th>
              <th>Participants</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? bookings.map((booking, index) => (
              <tr key={booking._id || `epic-${index}`}>
                <td>
                  <div style={{ fontWeight: '600' }}>{booking.user?.name || 'Guest'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{booking.user?.email}</div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Zap size={14} color="var(--admin-accent)" />
                    <span style={{ fontWeight: '600' }}>{booking.activityType || 'Extreme Sports'}</span>
                  </div>
                </td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td>{booking.participants || 1} People</td>
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
                        onClick={() => handleUpdateBookingStatus(booking._id, 'confirmed')}
                        style={{ background: 'none', border: 'none', color: '#00ff7f', cursor: 'pointer' }}
                        title="Confirm"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}
                    <button 
                      onClick={() => handleDeleteBooking(booking._id)}
                      style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-muted)' }}>
                  No Epic Fun Times bookings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminEpicFunTimes;
