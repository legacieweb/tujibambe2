import React from 'react';
import { Calendar, CheckCircle, Trash2, MapPin, Users } from 'lucide-react';

const AdminEventPlanning = ({ bookings, handleDeleteBooking, handleUpdateBookingStatus }) => {
  return (
    <div className="admin-events-section">
      <div className="admin-table-header" style={{ marginBottom: '25px' }}>
        <h2>Event Planning Requests</h2>
        <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>
          Active Leads: <span style={{ color: 'white', fontWeight: '700' }}>{bookings.length}</span>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Event Type</th>
              <th>Event Date</th>
              <th>Guests</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? bookings.map((booking, index) => (
              <tr key={booking._id || `event-${index}`}>
                <td>
                  <div style={{ fontWeight: '600' }}>{booking.user?.name || 'Guest'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{booking.user?.email}</div>
                </td>
                <td>
                  <div style={{ fontWeight: '600', color: 'var(--admin-accent)' }}>
                    {booking.eventCategory || 'Corporate Event'}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                    <Calendar size={14} color="var(--admin-text-muted)" />
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                    <Users size={14} color="var(--admin-text-muted)" />
                    {booking.guestCount || '50+'}
                  </div>
                </td>
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
                  No event planning requests yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminEventPlanning;
