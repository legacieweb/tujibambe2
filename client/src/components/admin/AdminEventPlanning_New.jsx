import React from 'react';
import { Calendar, CheckCircle, Trash2 } from 'lucide-react';

const AdminEventPlanning = ({ bookings, handleDeleteBooking, handleUpdateBookingStatus }) => {
  return (
    <div className="admin-event-section">
      <div className="admin-table-header" style={{ marginBottom: '25px' }}>
        <h2>Event Planning Bookings</h2>
        <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>
          Total Events: <span style={{ color: 'white', fontWeight: '700' }}>{bookings.length}</span>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Event Title</th>
              <th>Date</th>
              <th><div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Users size={14} /> Guests</div></th>
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={14} color="var(--admin-accent)" />
                    <span style={{ fontWeight: '600' }}>{booking.eventTitle || 'Custom Event'}</span>
                  </div>
                </td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td>{booking.numberOfPeople || 1} Guests</td>
                <td>
                  <span className={`status-pill-modern ${booking.status}`}>
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
                  No event planning bookings yet.
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
